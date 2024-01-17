import React, { useEffect, useState } from 'react';
import { getRevenues } from '../../utils/data/orderRevenueData';
import { useAuth } from '../../utils/context/authContext';

export default function RevenueTotals() {
  const [revenues, setRevenues] = useState([]);
  const { user } = useAuth();

  const getAllRevenue = () => {
    getRevenues(user.uid).then((data) => setRevenues(data));
  };

  useEffect(() => {
    getAllRevenue();
  }, []);

  return (
    <>
      <div>
        <h1>Revenue</h1>
        {revenues.length > 0 && (
          <>
            <h2>Total Orders: </h2>
            <h2>Total Tips: ${revenues[0].total_tips}</h2>
          </>
        )}
        <h2>Total Phone Orders:</h2>
        <h2>Total In-Person Orders:</h2>
        <h2>Payments Made with Card:</h2>
        <h2>Payments Made with Cash:</h2>
      </div>
    </>
  );
}
