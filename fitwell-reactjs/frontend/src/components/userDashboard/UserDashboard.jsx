import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "./navbar/UserNavbar";
import "./User_Dashboard.css";
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {userLogout} from "../../store/slices/userSlice";
import Alert from "../Alert";

const UserDashboard = (props) => {
  const dispatch=useDispatch();
  const {alert, setmyAlert} = props;
  const handleUserLogOut=()=>{
    dispatch(userLogout())
  }
  return (
    <div className="dashboard" style={{backgroundColor : "white"}}>
      <UserNavbar /> 
      <div class="dashboard-app">
        <header class="dashboard-toolbar">
          <Link to="/" class="menu-toggle">
            <i class="fas fa-bars"></i>
          </Link>
            <Link to="/Home" class="menu-toggle" onClick={handleUserLogOut}>
              <i class="fas fa-right-from-bracket"></i>
              Logout
            </Link>
        </header>
        <Alert alert={alert}/>
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
