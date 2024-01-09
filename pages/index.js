import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      id="homeContainer"
    >
      <h1>Welcome, {user.fbUser.displayName} </h1>
      <div className="options">
        <Link passHref href="/orders">
          <div className="option-box-1">
            <h2 className="index-h2">View Orders</h2>
          </div>
        </Link>
        <Link href="/orders/new" passHref>
          <div className="option-box-2">
            <h2 className="index-h2">Create New Order</h2>
          </div>
        </Link>
        <Link href="/revenue" passHref>
          <div className="option-box-3">
            <h2 className="index-h2">View Revenue</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
