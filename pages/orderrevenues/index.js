import React, { useEffect, useState } from 'react';
import { getRevenues } from '../../utils/data/orderRevenueData';
import { useAuth } from '../../utils/context/authContext';

export default function RevenueTotals() {
  const [revenues, setRevenues] = useState([]);
  const { user } = useAuth();

  const getAllRevenue = () => {
    getRevenues(user.uid).then((data) => setRevenues(data));
  };

  const getCheckRevenues = () => {
    const foundRevenue = revenues.find((revenue) => revenue.payment_type.id === 2);
    if (foundRevenue) {
      return foundRevenue.payment;
    } return 0;
  };

  const getCashRevenues = () => {
    const foundRevenue = revenues.find((revenue) => revenue.payment_type.id === 1);
    if (foundRevenue) {
      return foundRevenue.payment;
    } return 0;
  };

  const getDebitRevenues = () => {
    const foundRevenue = revenues.find((revenue) => revenue.payment_type.id === 3);
    if (foundRevenue) {
      return foundRevenue.payment;
    } return 0;
  };

  const getCreditRevenues = () => {
    const foundRevenue = revenues.find((revenue) => revenue.payment_type.id === 4);
    if (foundRevenue) {
      return foundRevenue.payment;
    } return 0;
  };

  const getMobileRevenues = () => {
    const foundRevenue = revenues.find((revenue) => revenue.payment_type.id === 5);
    if (foundRevenue) {
      return foundRevenue.payment;
    } return 0;
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
        <h2>Payments Made with Check: {getCheckRevenues()}</h2>
        <h2>Payments Made with Cash: {getCashRevenues()}</h2>
        <h2>Payments Made with Debit: {getDebitRevenues()}</h2>
        <h2>Payments Made with Credit: {getCreditRevenues()}</h2>
        <h2>Payments Made with Mobile: {getMobileRevenues()}</h2>
      </div>
    </>
  );
}
