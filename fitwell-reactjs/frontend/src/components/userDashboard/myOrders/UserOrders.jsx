import React, { useState, useEffect } from "react";
import "../User_Dashboard.css";
import { useSelector } from "react-redux";
import LoaderComp from "../../Loader";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import OrderService from "../../../services/OrderService";

const UserOrders = (props) => {
  const { setmyAlert } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user.userDetails);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const getOrders = async () => {
    setIsLoading(true);
    const userid = userDetails._id;
    const res = await OrderService.getUserOrders({ userid });
    if (!res.error) {
      setOrders(res.data);
    }
    setIsLoading(false);
  };

  const handleDeleteOrder = async (productId) => {
    const res = await OrderService.deleteOrder({ orderid: productId });
    if (!res.error) {
      getOrders();
    }
    setmyAlert(res.msg, res.error ? "error" : "success");
  };

  //Checking User LoggedIn or Session Expired;
  const checkUserLoggedIn = () => {
    if (isLoggedIn === false || userDetails === null) {
      navigate("../UserSignIn");
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
    getOrders();
  }, []);
  return (
    <div class="dashboard-content" id="dashboard-order-page">
      <h1 class="past-order-heading">YOUR ORDERS</h1>
      <div class="container">
        <div class="container-orders">
          {isLoading ? (
            <LoaderComp />
          ) : (
            orders &&
            orders.length > 0 &&
            orders.map((item) => (
              <div id="card-user-order" class="card text-center">
                <div class="card-body">
                  <div class="past-order-img" style={{ width: "30%" }}>
                    <img
                      src={`data:image/${
                        item.product.img.contentType
                      };base64,${Buffer.from(item.product.img.data).toString(
                        "base64"
                      )}`}
                      alt=""
                      style={{ height: "100%", borderRadius : '5px' }}
                    />
                  </div>
                  <div class="past-order-info-content mx-auto">
                    <h3 class="past-order-product-name">{item.product.name}</h3>
                    <h5 class="past-order-price">
                      Total: Rs{" "}
                      <span id="order-price">{item.product.price}</span>
                    </h5>
                    <h5 class="past-order-date">
                      Ordered On :{" "}
                      <span id="order-date">{item.Dateoforder}</span>
                    </h5>
                    <h5 class="past-order-date">
                      Ordered ID :{" "}
                      <span id="order-date">
                        {item._id.toString().substring(0, 14)}
                      </span>
                    </h5>
                    <p class="past-order-delivery">
                      Delivery Address :{" "}
                      <span id="order-address">{item.address}</span>
                    </p>
                    {/* <td> */}
                      {/* {" "} */}
                      <button
                        onClick={() => {
                          handleDeleteOrder(item._id);
                        }}
                        style={{
                          border: "none",
                          backgroundColor: "white",
                          width: "50px",
                          alignSelf: "center",
                        }}
                      >
                        <i
                          class="fa-solid fa-trash"
                          style={{ color: "red", cursor: "pointer" }}
                        ></i>
                      </button>
                    {/* </td> */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
