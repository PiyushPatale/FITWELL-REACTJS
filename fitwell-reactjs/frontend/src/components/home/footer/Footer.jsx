import React, { useState } from 'react'
import './Footer.css'
import logo from "../../../assets/img/Logo/logo.png"
import {Link} from 'react-router-dom'


const Footer = () => {

  const [date,setDate] = useState(new Date().getFullYear());

  return (

    
      <div class="footercontainer">
        <div class="info">
            <div class="infoBox">
                <Link class="icon" to="https://goo.gl/maps/cf9CjEf7qd3BM5sx6">
                    <i class="fa-sharp fa-solid fa-location-dot fa-2xl"></i>
                </Link>
                <div class="iconinfo">
                    <p>IIIT Guwahati, Bongora, Assam, India</p>
                </div>
            </div>

            <div class="infoBox">
                <div class="icon">
                    <i class="fa-solid fa-phone fa-2xl"></i>
                </div>
                <div class="iconinfo">
                    <p>+91 7066******</p>
                </div>
            </div>
            <div class="infoBox">
                <div class="icon">
                    <i class="fa-solid fa-envelope fa-2xl"></i>
                </div>
                <div class="iconinfo">
                    <p>	fitwell@gmail.com</p>
                </div>
            </div>

        </div>


        <div class="footInfo">
            <div class="block block1">
                <div class="head">
                    <img src={logo} alt="" />
                </div>
                <div class="icons">
                    <Link class="icon"  to="https://www.instagram.com/iiitsricity/"><i
                            class="fa-brands fa-instagram"></i></Link>
                    <Link class="icon"  to="https://www.facebook.com/IIIT.SriCity/"><i
                            class="fa-brands fa-facebook"></i></Link>
                    <Link class="icon"  to="https://twitter.com/IIITSC"><i class="fa-brands fa-twitter"></i></Link>
                    <Link class="icon" 
                        to="https://in.linkedin.com/school/indian-institute-of-information-technology-sricity/"><i
                            class="fa-brands fa-linkedin"></i></Link>
                </div>


            </div>
            <div class="block">
                <div class="head">
                    <h2>UseFul Links</h2>
                </div>
                <ul>
                    <li><Link to="/AboutUs">About Us</Link></li>
                    <li><Link to="/ContactUS">Contact Us</Link></li>
                    <li><Link to="/Reviews">Blogs</Link></li>
                </ul>
            </div>
            <div class="block">
                <div class="head">
                    <h2>Member</h2>
                </div>
                <ul>
                    <li><Link to="/UserSignIn">Login</Link></li>
                    <li><Link to="/UserSignIn">Sign Up</Link></li>
                </ul>
            </div>
            <div class="block">
                <div class="head">
                    <h2>Admin</h2>
                </div>
                <ul>
                    <li><Link to="./adminlogin">Login</Link></li>
                    <li><Link to="/AdminDashboard">Admin Dashboard</Link></li>
                </ul>
            </div>
            <div class="block">
                <div class="head">
                    <h2>Company</h2>
                </div>
                <ul>
                    <li><Link to="./adminlogin">Login</Link></li>
                    <li><Link to="/CompanyDashboard">Company Dashboard</Link></li>
                </ul>
            </div>
        </div>
        <div class="footer">
            <footer>&copy; Copyrights @ <span id="date">{date}</span> All rights reserved.</footer>
        </div>
    </div>

    
  )
}

export default Footer