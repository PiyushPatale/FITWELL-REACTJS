import React from "react";
import logo from "../../../assets/img/Logo/logo.png";
import "../User_Dashboard.css";
// import Profile from "../profile/Profile";
import {Link} from 'react-router-dom'

const UserNavbar = () => {


  return (
    <div class="dashboard-nav">
      <div class="top" style={{ height: "100%" }}>
        <div class="d-flex flex-column justify-content-between">
          <header>
            <Link to="#" class="menu-toggle">
              <i class="fas fa-bars"></i>
            </Link>
            <div class="brand-logo-img">
              <Link to="./" class="brand-logo">
                <img src={logo} alt="logo" class="logo-img" />
              </Link>
            </div>
          </header>
          <nav class="dashboard-nav-list my-4">
            <Link to="/UserHome" class="dashboard-nav-item">
              <i class="fas fa-dashboard bg-transparent"></i>
              Dashboard
            </Link>

            <Link to="/UserProfile" class="dashboard-nav-item">
              <i class="fas fa-user bg-transparent"></i>
              Profile
            </Link>
            <Link to="/UserWorkout" class="dashboard-nav-item">
              <i class="fas fa-dumbbell bg-transparent"></i>
              Home WorkOut
            </Link>
            <Link to="/UserChallenges" class="dashboard-nav-item">
              <i class="fas fa-running bg-transparent"></i>
              Challenges
            </Link>
            <Link to="/UserReviews" class="dashboard-nav-item">
              <i class="fas fa-comment bg-transparent"></i>
              Put a Review
            </Link>
            <Link to="/UserCart" class="dashboard-nav-item">
              <i class="fas fa-shopping-cart bg-transparent"></i>
              Cart
            </Link>
            <Link to="/UserOrders" class="dashboard-nav-item">
              <i class="fas fa-bag-shopping bg-transparent"></i>
              Your Orders
            </Link>
            <Link to="/UserPayment" class="dashboard-nav-item">
              <i class="fas fa-money-check-alt bg-transparent"></i>
              Payment
            </Link>
          </nav>
        </div>

        <nav
          style={{
            position: "absolute",
            bottom: "0",
            borderTop: "2px solid rgba(161, 51, 0, 0.959)",
            width: "100%",
          }}
        >
          <Link to="/" class="dashboard-nav-item">
            <i class="fas fa-home bg-transparent"></i>
            Home
          </Link>
          <Link to="/Products" class="dashboard-nav-item">
            <i class="fas fa-shopping-cart bg-transparent"></i>
            Products
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default UserNavbar;
