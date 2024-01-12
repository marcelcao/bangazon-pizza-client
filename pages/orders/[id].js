import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { getSingleOrder, getItemsOnSingleOrder } from '../../utils/data/orderData';
import ItemCard from '../../components/ItemCard';

function SingleOrder() {
  const [singleOrder, setSingleOrder] = useState({});
  const [items, setItems] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  const getAllItems = () => {
    getItemsOnSingleOrder(id).then((data) => setItems(data));
  };

  useEffect(() => {
    getSingleOrder(id)
      .then((data) => setSingleOrder(data))
      .then(getAllItems);
  }, [id]);

  return (
    <article className="single-event">
      <div>
        <h1>{singleOrder.order_name}</h1>
        <p>Order Information</p>
        <p>Customer e-mail: {singleOrder.customer_email}</p>
        <p>Customer phone: {singleOrder.customer_phone}</p>
        <p>Order Type: {singleOrder.order_type?.category}</p>
        <p>Order Status: {singleOrder.is_closed}</p>
      </div>
      <div>
        <h2>Order Items:</h2>
        {items.map((item) => (
          <section key={`item--${item.id}`} className="item">
            <ItemCard
              itemObj={item}
              onUpdate={getAllItems}
            />
          </section>
        ))}
        <Link href={`/orders/add/${id}`} passHref>
          <Button variant="primary" className="add-prods-btn">ADD ITEMS</Button>
        </Link>
      </div>
    </article>
  );
}

export default SingleOrder;
