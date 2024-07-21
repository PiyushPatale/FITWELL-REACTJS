import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import AdminActions from '../../../services/AdminActions';

const OrderStatisticsPage = () => {
  const [dailyOrderData, setDailyOrderData] = useState({});
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await AdminActions.getAllAdminOrder() // Adjust the API endpoint based on your backend route
      const orders = response.data.adminOrders;

      // Calculate daily order statistics
      const dailyOrders = {};
      let totalIncomeCount = 0;
      let totalOrdersCount = 0;

      orders.forEach((order) => {
        const date = new Date(order.Dateoforder).toLocaleDateString();
        dailyOrders[date] = (dailyOrders[date] || 0) + 1;
        totalIncomeCount += order.amount;
        totalOrdersCount++;
      });

      setDailyOrderData(dailyOrders);
      setTotalIncome(totalIncomeCount);
      setTotalOrders(totalOrdersCount);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  return (
    <div className="order-statistics-container">
      <h2>Order Statistics</h2>
      <div>
        <p>Total Income: {totalIncome}</p>
        <p>Total Orders: {totalOrders}</p>
      </div>
      <div className="chart-container">
        <Line
          data={{
            labels: Object.keys(dailyOrderData),
            datasets: [
              {
                label: 'Daily Orders',
                data: Object.values(dailyOrderData),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              },
            ],
          }}
        />
      </div>
    </div>
  )
};

export default OrderStatisticsPage;
