/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { removeOrderItem } from '../utils/data/orderData';

export default function ItemCard({ itemObj, onUpdate }) {
  const deleteThisItem = () => {
    if (window.confirm('Delete this product?')) {
      removeOrderItem(itemObj.id).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card className="item-card">
        <Card.Header className="item-card-header">
          {itemObj.menu_item?.item_name}
          <Button onClick={deleteThisItem} className="item-btns">
            X
          </Button>
        </Card.Header>
        <Card.Body className="item-card-body">
          <Card.Title className="item-card-title">${itemObj.menu_item?.item_price}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order: PropTypes.shape({
      id: PropTypes.number,
    }),
    menu_item: PropTypes.shape({
      id: PropTypes.number,
      item_name: PropTypes.string,
      item_price: PropTypes.number,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
