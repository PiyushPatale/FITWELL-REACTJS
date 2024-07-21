import React, { useEffect, useState } from "react";
import "../User_Dashboard.css";
import "./UserCart.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserActionService from "../../../services/UserActionService";
import LoaderComp from "../../Loader";
import { Buffer } from "buffer";
import axios from "axios";
import { PUBLIC_SERVER_URL } from "../../../api";

const UserCart = (props) => {
  const { setmyAlert } = props;
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const userDetails = useSelector((state) => state.user.userDetails);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

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

  const calculateAmount = () => {
    let sum = 0;
    data.forEach((item) => {
      sum += parseInt(item.product.price);
    });
    setTotalAmount(sum);
  };

  const getCartProducts = async () => {
    setIsloading(true);
    const userid = userDetails._id;
    const res = await UserActionService.getUserCartProducts({ userid: userid });
    console.log(res);
    if (!res.error) {
      setData(res.data);
    }
    setIsloading(false);
  };

  const checkOutCart = async () => {
    if (data != null && data !== undefined) {
      const productIDs = data.map((item) => item.product._id);
      const res = await UserActionService.checkOutCart({
        userid: userDetails._id,
        finalamount: totalAmount,
        address: "",
        data: productIDs,
      });
      if (!res.error) {
        setTotalAmount(0);
        setData([]);
      }
      setmyAlert(res.msg, res.error ? "error" : "success");
    }
  };

  const handleCheckOutCart = async () => {
    try {
      const amountInPaise =
        (totalAmount - Math.floor((totalAmount * 5) / 100) + 80)*100 ; // Total amount including discount and delivery charges converted to paise
      const response = await axios.post(
        `${PUBLIC_SERVER_URL}/api/payments/create-order`,
        {
          amount: amountInPaise,
          currency: "INR",
        }
      );
      const { order_id } = response.data;
      const options = {
        key: "rzp_test_m7AmqAwlafnIao",
        amount: amountInPaise,
        currency: "INR",
        order_id,
        handler: async function (response) {
          // If payment is successful, proceed with checkout
          await checkOutCart();
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Error initiating Razorpay payment");
    }
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ UserCart ~ data:", data);
    calculateAmount();
  }, [data]);

  const checkUserLoggedIn = () => {
    if (!isLoggedIn || !userDetails) {
      navigate("../UserSignIn");
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const handleDeleteCartItem = async (productId) => {
    try {
      const res = await UserActionService.deleteCartItem({
        userid: userDetails._id,
        productid: productId,
      });
      if (!res.error) {
        const updatedData = data.filter(
          (item) => item.product._id !== productId
        );
        setData(updatedData);
        calculateAmount();
        setmyAlert("Item removed from cart", "success");
      } else {
        setmyAlert("Failed to remove item from cart", "error");
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
      setmyAlert("Error deleting item from cart", "error");
    }
  };

  return (
    <div
      className="dashboard-content"
      id="dashboard-review-page"
      style={{ backgroundColor: "white" }}
    >
      {isLoading ? (
        <LoaderComp />
      ) : (
        <div className="parent-container">
          <div className="cart-container">
            <table>
              <tr>
                <th className="userCartTH" style={{ width: "100%" }}>
                  Product
                </th>
                <th className="userCartTH" style={{ width: "100%" }}>
                  Category
                </th>
                <th className="userCartTH" style={{ width: "100%" }}>
                  Subtotal
                </th>
                <th className="userCartTH" style={{ width: "100%" }}>
                  Action
                </th>
              </tr>
              {data &&
                data !== null &&
                data.map((item) => (
                  <tr key={item.product._id}>
                    <td>
                      <div className="cart-info">
                        <div>
                          <img
                            className="userCartImg"
                            src={`data:image/${
                              item.product.img.contentType
                            };base64,${Buffer.from(
                              item.product.img.data
                            ).toString("base64")}`}
                            alt=""
                          />
                          <h4>{item.product.name}</h4>
                          <h5>
                            price :Rs
                            <span className="cart-product-price">
                              {item.product.price}
                            </span>
                          </h5>
                          <br />
                        </div>
                      </div>
                    </td>
                    <td>{item.product.category}</td>
                    <td>
                      Rs
                      {item.product.price}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleDeleteCartItem(item.product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </table>
          </div>

          <div className="total-price">
            <table className="UserCartTotalPrice">
              <tr>
                <th
                  className="userCartTH"
                  style={{ width: "100%" }}
                  colSpan="2"
                >
                  Price Details
                </th>
              </tr>
              <tr>
                <td style={{ marginLeft: "10px" }}>Sub total</td>
                <td>
                  Rs
                  {totalAmount}
                </td>
              </tr>
              <tr>
                <td style={{ marginLeft: "10px" }}>Discount 5%</td>
                <td>
                  - Rs
                  {Math.floor((totalAmount * 5) / 100)}
                  .00
                </td>
              </tr>
              <tr>
                <td style={{ marginLeft: "10px" }}>Delivery charges</td>
                <td>+ Rs80.00</td>
              </tr>
              <tr>
                <td style={{ marginLeft: "10px" }}>Total Amount</td>
                <td>
                  = Rs
                  {totalAmount - Math.floor((totalAmount * 5) / 100) + 80}
                </td>
                <br />
                <br />
              </tr>
              <td>
                <button
                  type="button"
                  id="checkbut"
                  className="btn btn-primary"
                  onClick={() => {
                    handleCheckOutCart();
                  }}
                >
                  Check Out
                </button>
              </td>
            </table>
          </div>
        </div>
      )}

      <Link id="back" to="/Products">
        <h4>Continue Shopping</h4>
      </Link>
    </div>
  );
};

export default UserCart;
