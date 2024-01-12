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
      <Card className="text-center">
        <Card.Header>{itemObj.menu_item?.item_name}</Card.Header>
        <Card.Body>
          <Card.Title>${itemObj.menu_item?.item_price}</Card.Title>
        </Card.Body>
        <Button onClick={deleteThisItem} className="prod-btns">
          X
        </Button>
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
