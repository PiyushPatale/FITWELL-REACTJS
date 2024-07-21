import React from 'react'
// import '../company.css'
import logo from '../../../assets/img/Logo/logo.png'
import {Link} from 'react-router-dom'
const CompanySideWrapper = () => {
  return (
    <div class="white" id="sidebar-wrapper" >
        <div class="sidebar-heading">
                <Link to="./" class="brand-logo">
                        <img src={logo} alt="logo" class="logo-img"/>
                </Link>
        </div>
        <div class="list-group list-group-flush my-3">
                <Link to="/CompanyHome"
                        class="list-group-item list-group-item-action bg-transparent text-light active"><i
                                class="fas fa-table-columns bg-transparent"></i>  Dashboard</Link>


                <Link to="/CompanyAddProduct"
                        class="list-group-item list-group-item-action bg-transparent text-light fw-bold"><i
                                class="fas fa-plus me-2"></i>Add New Product</Link>
                <Link to="/CompanyOrders"
                        class="list-group-item list-group-item-action bg-transparent text-light fw-bold"><i
                                class="fas fa-check me-2"></i>Check Orders</Link>
                <Link to="/CompanyOurProducts"
                        class="list-group-item list-group-item-action bg-transparent text-light fw-bold"><i
                                class="fas fa-list me-2"></i>Our Products</Link>


                <Link to="/" style={{marginTop: '60px', borderTop: '2px solid rgba(0, 0, 0, 0.247)'}} class="list-group-item list-group-item-action bg-transparent text-light active"><i
                                class="fas fa-home me-2"></i>Home</Link>
                <Link to="/Products" class="list-group-item list-group-item-action bg-transparent text-light active"><i
                                class="fas fa-shopping-cart me-2 bg-transparent"></i>Products</Link>
                                
                <Link to="/" class="list-group-item list-group-item-action bg-transparent text-light  fw-bold"><i
                         class="fas fa-power-off me-2"></i> Logout</Link>
                             
                
        </div>
</div>
  )
}

export default CompanySideWrapper