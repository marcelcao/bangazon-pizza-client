import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { getSingleOrder, getItemsOnSingleOrder, deleteOrder } from '../../utils/data/orderData';
import ItemCard from '../../components/ItemCard';
import ItemCardClosed from '../../components/ItemCardClosed';

function SingleOrder() {
  const [singleOrder, setSingleOrder] = useState({});
  const [items, setItems] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  const getAllItems = () => {
    getItemsOnSingleOrder(id).then((data) => setItems(data));
  };

  const deleteThisOrder = () => {
    if (window.confirm('Delete Order?')) {
      deleteOrder(id).then(() => {
        router.push('/orders');
      });
    }
  };

  useEffect(() => {
    getSingleOrder(id)
      .then((data) => setSingleOrder(data))
      .then(getAllItems);
  }, [id]);

  return (
    <article className="single-event">
      <div className="order-header">
        <h1>{singleOrder.order_name}</h1>
        {!singleOrder.is_closed && (
          <Button
            className="close-order-btn"
            onClick={() => {
              router.push(`/orderrevenues/${singleOrder.id}`);
            }}
          >
            Close Order
          </Button>
        )}
      </div>
      <div className="order-body">
        <div className="order-details-container">
          <h2 className="order-info-title">Order Information</h2>
          <p>Customer e-mail: {singleOrder.customer_email}</p>
          <p>Customer phone: {singleOrder.customer_phone}</p>
          <p>Order Type: {singleOrder.order_type?.category}</p>
          <p>Order Status: {singleOrder.is_closed ? 'Closed' : 'Open'}</p>
          <div className="order-info-btns">
            {!singleOrder.is_closed && (
              <Button
                className="order-update-btn"
                onClick={() => {
                  router.push(`/orders/edit/${singleOrder.id}`);
                }}
              >Update Info
              </Button>
            )}
            {!singleOrder.is_closed && (
            <Link href={`/orders/add/${id}`} passHref>
              <Button className="add-items-btn">Add Items</Button>
            </Link>
            )}
            {!singleOrder.is_closed && (
              <Button
                className="delete-order-btn"
                onClick={deleteThisOrder}
              >Delete Order
              </Button>
            )}
          </div>
        </div>
        <div className="order-items-container">
          <h2>Order Items:</h2>
          {items.map((item) => (
            <section key={`item--${item.id}`} className="item">
              {/* Conditionally render ItemCard or ItemCardClosed */}
              {singleOrder.is_closed ? (
                <ItemCardClosed itemObj={item} />
              ) : (
                <ItemCard itemObj={item} onUpdate={getAllItems} />
              )}
            </section>
          ))}
          <h2 className="total">Order Total: ${singleOrder.total_order}</h2>
        </div>
      </div>
    </article>
  );
}

export default SingleOrder;
