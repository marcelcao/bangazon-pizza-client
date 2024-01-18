import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { closeOrder, getSingleOrder } from '../utils/data/orderData';
import getPaymentTypes from '../utils/data/paymentTypeData';
import { createRevenue } from '../utils/data/orderRevenueData';

const initialState = {
  order: 0,
  orderTip: 0.00,
  paymentType: 0,
};

const CloseOrderForm = ({ obj }) => {
  const [order, setOrder] = useState({});
  const [orderPayments, setOrderPayments] = useState([]);
  const [currentInfo, setCurrentInfo] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setOrder);
    getPaymentTypes().then(setOrderPayments);
  }, [obj, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    closeOrder(id)
      .then(() => {
        const revenue = {
          order: Number(order.id),
          paymentType: Number(currentInfo.paymentType),
          orderTip: currentInfo.orderTip,
        };
        createRevenue(revenue).then(() => router.push('/orders'));
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tip Amount</Form.Label>
          <Form.Control name="orderTip" placeholder="5.00" required value={currentInfo.orderTip} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Payment Type</Form.Label>
          <Form.Select
            name="paymentType"
            required
            value={currentInfo.paymentType}
            onChange={handleChange}
          >
            <option value="">Select payment type</option>
            {orderPayments.map((payment) => (
              <option key={payment.id} value={payment.id}>
                {payment.type}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit"> Enter </Button>
      </Form>
    </>
  );
};

CloseOrderForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    order: PropTypes.number,
    orderTip: PropTypes.number,
    paymentType: PropTypes.number,
  }),
};

CloseOrderForm.defaultProps = {
  obj: initialState,
};

export default CloseOrderForm;
