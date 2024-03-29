import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../utils/data/orderData';
import CloseOrderForm from '../../components/CloseOrderForm';

export default function CloseOrder() {
  const [singleOrder, setSingleOrder] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id)
      .then((data) => setSingleOrder(data));
  }, [id]);

  return (
    <>
      <h1 className="close-out">Close Out {singleOrder.order_name}</h1>
      <CloseOrderForm />
    </>
  );
}
