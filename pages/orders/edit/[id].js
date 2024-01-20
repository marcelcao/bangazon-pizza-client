import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../utils/data/orderData';
import OrderForm from '../../../components/OrderForm';

export default function EditOrder() {
  const [editOrder, setEditOrder] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setEditOrder);
  }, [id]);

  return (
    <>
      <h1 className="create-title">Update Order</h1>
      <OrderForm orderObj={editOrder} />
    </>
  );
}
