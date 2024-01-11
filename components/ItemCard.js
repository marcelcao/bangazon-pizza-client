import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function ItemCard({ itemObj }) {
  return (
    <>
      <Card className="text-center">
        <Card.Header>{itemObj.menu_item?.item_name}</Card.Header>
        <Card.Body>
          <Card.Title>${itemObj.menu_item?.item_price}</Card.Title>
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
};
