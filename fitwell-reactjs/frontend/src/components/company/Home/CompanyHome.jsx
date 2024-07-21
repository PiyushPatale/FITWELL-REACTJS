import React, { useState, useEffect } from "react";
import { Doughnut, Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  registerables,
} from "chart.js";
import ProductService from "../../../services/ProductService";
import AdminActions from "../../../services/AdminActions";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, ...registerables);

const CompanyHome = () => {
  const [categoryStatistics, setCategoryStatistics] = useState({});

  useEffect(() => {
    fetchData();
    console.log("🚀 ~ CompanyHome ~ categoryStatistics:", categoryStatistics);
  }, []);

  const fetchData = async () => {
    try {
      const response = await ProductService.getProductsList(); // Adjust the API endpoint based on your backend route
      const products = response.data;

      // Calculate category statistics
      const categoryCounts = {};
      products.ourProducts.forEach((product) => {
        categoryCounts[product.category] =
          (categoryCounts[product.category] || 0) + 1;
      });

      const totalProducts = products.totalProducts;
      const categoryPercentages = {};
      Object.keys(categoryCounts).forEach((category) => {
        const count = categoryCounts[category];
        const percentage = (count / totalProducts) * 100;
        categoryPercentages[category] = { count, percentage };
      });

      setCategoryStatistics(categoryPercentages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [dailyOrderData, setDailyOrderData] = useState({});
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await AdminActions.getAllAdminOrder(); // Adjust the API endpoint based on your backend route
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
      console.error("Error fetching order data:", error);
    }
  };

  return (
    <div>
      <div class="row g-3 my-2" style={{display : 'flex', justifyContent : 'space-evenly'}}>
        
        <div class="col-md-3">
          <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <div>
              <h3 class="fs-2">
                {totalOrders}
                </h3>
              <p class="fs-5">Total Orders</p>
            </div>
            <i class="fas fa-truck fs-1 primary-text border rounded-full secondary-bg p-3"></i>
          </div>
        </div>

        <div class="col-md-3">
          <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
            <div>
              <h3 class="fs-2">
                ₹{totalIncome}
              </h3>
              <p class="fs-5">Total Revenue</p>
            </div>
            <i class="fas fa-money-bill-wave fs-1 primary-text border rounded-full secondary-bg p-3"></i>
          </div>
        </div>
      </div>
      <div
        className="statistics-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5vh",
        }}
      >
        <div className="chart-container" style={{ width: "80%" }}>
          <h4 style={{ textAlign: "center" }}>Daily Orders</h4>
          <Line
            style={{ margin: "2vw", alignSelf: "center" }}
            data={{
              labels: Object.keys(dailyOrderData),
              datasets: [
                {
                  label: "Daily Orders",
                  data: Object.values(dailyOrderData),
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>
        <div className="pie-chart-container " style={{ width: "40%" }}>
          <h4 style={{ textAlign: "center" }}>Category & Stock</h4>
          <Doughnut
            data={{
              labels: Object.keys(categoryStatistics),
              datasets: [
                {
                  data: Object.values(categoryStatistics).map(
                    (stats) => stats.count
                  ),
                  backgroundColor: [
                    "rgba(255, 99, 132)",
                    "rgba(54, 162, 235)",
                    "rgba(255, 206, 86)",
                    "rgba(75, 192, 192)",
                    "rgba(153, 102, 255)",
                  ],
                },
              ],
            }}
            options={{
              legend: {
                display: true,
                position: "right",
                labels: {
                  fontColor: "black",
                },
              },
              // responsive: true,
              // maintainAspectRatio: true,
              // height  : 100,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyHome;
