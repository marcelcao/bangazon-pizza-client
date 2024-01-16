import OrderForm from '../../components/OrderForm';
import { useAuth } from '../../utils/context/authContext';

const NewOrder = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Create New Order</h2>
      <OrderForm user={user} />
    </div>
  );
};

export default NewOrder;
