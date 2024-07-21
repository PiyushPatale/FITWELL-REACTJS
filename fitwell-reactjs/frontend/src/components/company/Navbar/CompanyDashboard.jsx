import React from "react";
import CompanyTopWrapper from "./CompanyTopWrapper";
import CompanySideWrapper from "./CompanySideWrapper";
import {Outlet} from 'react-router-dom';
import Alert from "../../Alert";

const CompanyDashboard = (props) => {
  const {alert, setmyAlert} = props;
   return (
    <div class="d-flex" id="wrapper">
      <CompanySideWrapper />
      <div id="page-content-wrapper" style={{color:"black" }}>
        <CompanyTopWrapper />
        <Alert alert={alert} />
        <Outlet />
      </div>
    </div>
  );
};

export default CompanyDashboard;
