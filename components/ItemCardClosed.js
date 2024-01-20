/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function ItemCardClosed({ itemObj }) {
  return (
    <>
      <Card className="item-card">
        <Card.Header className="item-card-header">
          {itemObj.menu_item?.item_name}
        </Card.Header>
        <Card.Body className="item-card-body">
          <Card.Title className="item-card-title">${itemObj.menu_item?.item_price}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}

ItemCardClosed.propTypes = {
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
