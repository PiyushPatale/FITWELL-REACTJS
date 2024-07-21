import React from "react";
import AdminTopWrapper from "./topWrapper/AdminTopWrapper";
import AdminSideWrapper from "./sideWrapper/AdminSideWrapper";
import {Outlet} from 'react-router-dom';
import Alert from "../Alert";

const AdminDashboard = (props) => {
  const {alert, setmyAlert} = props;
   return (
    <div class="d-flex" id="wrapper">
      <AdminSideWrapper />
      <div id="page-content-wrapper" style={{color:"black" }}>
        <AdminTopWrapper />
        <Alert alert={alert} />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
