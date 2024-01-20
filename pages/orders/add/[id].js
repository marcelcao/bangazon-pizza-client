/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { addItemsToOrder, getSingleOrder } from '../../../utils/data/orderData';
import getMenuItems from '../../../utils/data/menuItemData';

function AddOrderItems() {
  const [orderDetails, setOrderDetails] = useState({});
  const [items, setItems] = useState([]);
  const [itemIdArray, setItemIdArray] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  const getOrderDetails = () => {
    getSingleOrder(id).then(setOrderDetails);
  };

  const menuItems = () => {
    getMenuItems().then(setItems);
  };

  useEffect(() => {
    menuItems();
    getOrderDetails();
    setOrderId(id);
  }, [id]);

  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      if (!itemIdArray.includes(value)) {
        setItemIdArray([...itemIdArray, value]);
      }
    } else {
      const itemIndex = itemIdArray.findIndex((itemId) => itemId === value);
      const newArray = [...itemIdArray];
      newArray.splice(itemIndex, 1);
      setItemIdArray(newArray);
    }
  };

  const handleSubmit = () => {
    const promises = itemIdArray.map((itemId) => {
      const payload = {
        order: orderId,
        menu_item: itemId,
      };
      return addItemsToOrder(payload);
    });
    Promise.all(promises).then(() => {
      router.push(`/orders/${id}`);
    });
  };

  return (
    <>
      <div className="add-item-container">
        <div>
          <h1 className="order-category">
            Add Items to {orderDetails.order_name}
          </h1>
          <div className="menu-items">
            {items.map((item) => (
              <Form key={item.id}>
                <Form.Group>
                  <div className="checkform">
                    <Form.Check type="checkbox" label={item.item_name} value={item.id} onChange={handleChange} />
                  </div>
                </Form.Group>
              </Form>
            ))}
          </div>
          <Button onClick={handleSubmit} className="add-order-items-btn">Add Items</Button>
        </div>
      </div>
    </>
  );
}
export default AddOrderItems;
