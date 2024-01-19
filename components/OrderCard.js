import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';

export default function OrderCard({ orderObj }) {
  return (
    <>
      <Card className="order-card">
        <Card.Header className="card-top">{orderObj.order_name}</Card.Header>
        <Card.Body className="card-body">
          <Card.Text>Customer Phone: {orderObj.customer_phone}</Card.Text>
          <Card.Text>Customer Email: {orderObj.customer_email}</Card.Text>
          <Card.Text>Order Type: {orderObj.order_type.category}</Card.Text>
          <Card.Text>Order Status: {orderObj.is_closed ? 'Closed' : 'Open'}</Card.Text>
          <Card.Text>Total: ${orderObj.total_order}</Card.Text>
          <Link href={`/orders/${orderObj.id}`} passHref>
            <Button variant="primary" className="m-2">
              View
            </Button>
          </Link>
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
    total_order: PropTypes.number.isRequired,
  }).isRequired,
};
