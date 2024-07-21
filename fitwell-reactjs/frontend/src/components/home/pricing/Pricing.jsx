import React, { useEffect } from "react";
import "./Pricing.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {updateUserField} from "../../../store/slices/userSlice";
import { PUBLIC_SERVER_URL } from "../../../api";

const Pricing = (props) => {
  const isLoggedIn=useSelector(state => state.user.isLoggedIn)
  let userDetails= useSelector(state => state.user.userDetails);
  const dispatch = useDispatch();
  const {setmyAlert} = props;

  useEffect(() => {
    // Load Razorpay library script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async (amount) => {
    if(isLoggedIn === false){
      setmyAlert("Please Login First to make subscription payment.", "error");
      return ;
    }
    const amountInPaise = amount * 100;
    try {
      // Send a request to your backend to create a Razorpay order
      const response = await axios.post(
        `${PUBLIC_SERVER_URL}/api/payments/create-order`,
        {
          amount: amountInPaise,
          currency: "INR",
        }
      );
      const { order_id } = await response.data;
      const options = {
        key: "rzp_test_m7AmqAwlafnIao",
        amount: amountInPaise,
        currency: "INR",
        order_id,
      };
      console.log('yha');
      const updatedDate = addMonths(userDetails.expirydate,6);
      dispatch(updateUserField({name:'expirydate', value:updatedDate}))
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Error initiating payment:", error);
      setmyAlert("Error initiating Razorpay", 'error')
    }
  };

  function addMonths(date, months) {
    var d = new Date(date);
    d.setMonth(d.getMonth() + months);
    
    // Check for overflow
    if (d.getMonth() !== (new Date(date).getMonth() + months) % 12) {
        d.setFullYear(d.getFullYear() + 1);
    }

    return d;
}

  return (
    <div>
      <div className="container1Pricing my-0">
        <div className="titlePricing container my-0">
          <h3 id="title-0" className="my-3 pricingH2H3">
            OUR PLAN
          </h3>
          <h2 id="title-1" className="my-2 pricingH2H3">
            {" "}
            CHOOSE YOUR PRICING PLAN
          </h2>
        </div>
        <div className="price-row">
          <div className="price-col">
            <p>SINGLE CLASS</p>
            <h2 id="title">
              Class <br />
              Drop-in
            </h2>
            <h3 id="pri"> ₹ 4200 </h3>
            <ul>
              <li>Free riding</li>
              <li>Unlimited equipment</li>
              <li>Personal trainer</li>
              <li>Weight losing classes</li>
              <li>No time restriction</li>
            </ul>
            <button
              onClick={() => handlePayment(4200)}
              className="enrollNowButton"
              id="enroll1"
            >
              ENROLL NOW
            </button>
          </div>
          <div className="price-col">
            <p> ADVANCED </p>
            <h2 id="title">6 Month unlimited</h2>
            <h3 id="pri">₹ 5770 </h3>
            <ul>
              <li>Free riding</li>
              <li>Unlimited equipment</li>
              <li>Personal trainer</li>
              <li>Weight losing classes</li>
              <li>No time restriction</li>
            </ul>
            <button
              onClick={() => handlePayment(5770)}
              className="enrollNowButton"
              id="enroll"
            >
              ENROLL NOW
            </button>
          </div>
          <div className="price-col">
            <p>PREMIUM</p>
            <h2 id="title">12 Month unlimited</h2>
            <h3 id="pri">₹ 8400</h3>
            <ul>
              <li>Free riding</li>
              <li>Unlimited equipment</li>
              <li>Personal trainer</li>
              <li>Weight losing classes</li>
              <li>No time restriction</li>
            </ul>
            <button
              onClick={() => handlePayment(8400)}
              className="enrollNowButton"
              id="enroll"
            >
              ENROLL NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
