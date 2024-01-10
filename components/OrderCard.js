import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function OrderCard({ orderObj }) {
  return (
    <>
      <Card className="text-center">
        <Card.Header>{orderObj.order_name}</Card.Header>
        <Card.Body>
          <Card.Title>Customer Phone: {orderObj.customer_phone}</Card.Title>
          <Card.Title>Customer Email: {orderObj.customer_email}</Card.Title>
          <Card.Text>Order Type: {orderObj.order_type.category}</Card.Text>
          <Card.Text>Order Status: {orderObj.is_closed}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order_name: PropTypes.string.isRequired,
    customer_phone: PropTypes.string.isRequired,
    customer_email: PropTypes.string.isRequired,
    order_type: PropTypes.shape({
      id: PropTypes.number,
      category: PropTypes.string,
    }),
    is_closed: PropTypes.bool.isRequired,
  }).isRequired,
};
