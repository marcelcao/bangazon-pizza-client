import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import getOrderCategories from '../utils/data/orderCategoryData';
import { createOrder, updateOrder } from '../utils/data/orderData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  orderName: '',
  customerPhone: '',
  customerEmail: '',
  orderType: 0,
  adminUser: '',
};

const OrderForm = ({ orderObj }) => {
  const [orderTypes, setOrderTypes] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getOrderCategories().then(setOrderTypes);

    if (orderObj.id) {
      setCurrentOrder({
        id: orderObj.id,
        orderName: orderObj.order_name,
        customerPhone: orderObj.customer_phone,
        customerEmail: orderObj.customer_email,
        orderType: orderObj.order_type?.id,
        adminUser: user.uid,
      });
    }
  }, [orderObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    if (orderObj.id) {
      const update = {
        id: orderObj.id,
        orderName: currentOrder.orderName,
        customerPhone: currentOrder.customerPhone,
        customerEmail: currentOrder.customerEmail,
        orderType: Number(currentOrder.orderType),
        adminUser: user.uid,
      };
      updateOrder(update, user.uid).then(() => router.push(`/orders/${orderObj.id}`));
    } else {
      const order = {
        orderName: currentOrder.orderName,
        customerPhone: currentOrder.customerPhone,
        customerEmail: currentOrder.customerEmail,
        orderType: Number(currentOrder.orderType),
        adminUser: user.uid,
      };
      createOrder(order, user.uid).then(() => router.push('/orders'));
    }
  };

  return (
    <div className="order-form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="order-form">Order Name</Form.Label>
          <Form.Control name="orderName" placeholder="Enter Order Name Here" required value={currentOrder.orderName} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Customer Phone</Form.Label>
          <Form.Control name="customerPhone" placeholder="ex. 615-777-7777" required value={currentOrder.customerPhone} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Customer e-mail</Form.Label>
          <Form.Control name="customerEmail" placeholder="ex. pizza@pizza.com" required value={currentOrder.customerEmail} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Order Type</Form.Label>
          <Form.Select
            name="orderType"
            required
            value={currentOrder.orderType}
            onChange={handleChange}
          >
            <option value="">Select order type</option>
            {orderTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="order-enter-btn"> {orderObj.id ? 'Update' : 'Create'} Order </Button>
      </Form>
    </div>
  );
};

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    order_name: PropTypes.string,
    customer_phone: PropTypes.string,
    customer_email: PropTypes.string,
    order_type: PropTypes.number,
  }),
};

OrderForm.defaultProps = {
  orderObj: initialState,
};

export default OrderForm;
