import React from 'react';
import Navbar from './navbar/Navbar'
import {Outlet} from 'react-router-dom';
import Footer from './footer/Footer';
import Alert from '../Alert';

const LandingPage = (props) => {
  const {alert} = props;
  return (
    <div>
      <Navbar/>  
      <Alert alert={alert}/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default LandingPage