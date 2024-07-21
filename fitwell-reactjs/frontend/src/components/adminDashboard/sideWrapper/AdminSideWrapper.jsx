import React from "react";
import "../admin_dashboard.css";
import logo from "../../../assets/img/Logo/logo.png";
import { Link } from "react-router-dom";
const AdminSideWrapper = () => {
  return (
    <div class="white" id="sidebar-wrapper">
      <div class="sidebar-heading">
        <Link to="./" class="brand-logo">
          <img src={logo} alt="logo" class="logo-img" />
        </Link>
      </div>
      <div class="list-group list-group-flush my-3">
        <Link
          to="/AdminHome"
          class="list-group-item list-group-item-action bg-transparent text-light active"
        >
          <i class="fas fa-table-columns bg-transparent"></i> Dashboard
        </Link>

        <Link
          to="/AdminTrainers"
          class="list-group-item list-group-item-action bg-transparent text-light  active"
        >
          <i class="fas fa-user-md me-2"></i>Trainers
        </Link>

        <Link
          to="/AdminCustomers"
          class="list-group-item list-group-item-action bg-transparent text-light  active"
        >
          <i class="fas fa-users me-2"></i>Customers
        </Link>

        <Link
          to="/AdminPayment"
          class="list-group-item list-group-item-action bg-transparent text-light fw-bold"
        >
          <i class="fas fa-chart-line me-2"></i>Payments
        </Link>

        <Link
          to="/AdminOrder"
          class="list-group-item list-group-item-action bg-transparent text-light fw-bold"
        >
          <i class="fas fa-shopping-cart me-2"></i>Orders
        </Link>

        {/* <Link to="/AdminAddProduct"
                        class="list-group-item list-group-item-action bg-transparent text-light fw-bold"><i
                                class="fas fa-plus me-2"></i>Add New Product</Link> */}

        <Link
          to="/AdminFeedback"
          class="list-group-item list-group-item-action bg-transparent  text-light fw-bold"
        >
          <i class="fas fa-comment-dots me-2"></i>Feedbacks
        </Link>
        <Link
          to="/AdminChallenges"
          class="list-group-item list-group-item-action bg-transparent  text-light fw-bold"
        >
          <i class="fas fa-comment-dots me-2"></i>Challenges
        </Link>
        <Link
          to="/AdminWorkouts"
          class="list-group-item list-group-item-action bg-transparent  text-light fw-bold"
        >
          <i class="fas fa-comment-dots me-2"></i>Workouts
        </Link>

        <Link
          to="/"
          style={{
            marginTop: "60px",
            borderTop: "2px solid rgba(0, 0, 0, 0.247)",
          }}
          class="list-group-item list-group-item-action bg-transparent text-light active"
        >
          <i class="fas fa-home me-2"></i>Home
        </Link>
        <Link
          to="/Products"
          class="list-group-item list-group-item-action bg-transparent text-light active"
        >
          <i class="fas fa-shopping-cart me-2 bg-transparent"></i>Products
        </Link>

        <Link
          to="/"
          class="list-group-item list-group-item-action bg-transparent text-light  fw-bold"
        >
          <i class="fas fa-power-off me-2"></i> Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminSideWrapper;
