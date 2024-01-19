import React, { useEffect, useState } from 'react';
import OrderCard from '../../components/OrderCard';
import { getOrders } from '../../utils/data/orderData';
import { useAuth } from '../../utils/context/authContext';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const getAllOrders = () => {
    getOrders(user.uid).then((data) => setOrders(data));
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <article className="orders">
      <h1>Your Orders</h1>
      <div className="order-cards">
        {orders.map((order) => (
          <section key={`event--${order.id}`} className="order">
            <OrderCard orderObj={order} />
          </section>
        ))}
      </div>
    </article>
  );
}

export default OrdersPage;
