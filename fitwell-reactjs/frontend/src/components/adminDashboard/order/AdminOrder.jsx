import React, { useEffect, useState } from "react";
import "./Order.css";
import AdminActions from "../../../services/AdminActions";
import LoaderComp from "../../Loader";

const Order = (props) => {
  const [orders, setOrders] = useState(null);
  const { setmyAlert } = props;
  const [isLoading, setIsLoading] = useState(false);

  const getAllOrders = async () => {
    setIsLoading(true);
    const res = await AdminActions.getAllAdminOrder();
    if (!res.error && res.data.adminOrders.length > 0) {
      setOrders(res.data.adminOrders);
    }
    else{
      setmyAlert(res.msg, 'error')
    }
    setIsLoading(false);
  };

  const handleDeleteOrder = async(id) => {
    setIsLoading(true);
    const res = await AdminActions.deleteOrder({ orderid: id });
    if (!res.error) {
      setmyAlert(res.msg, "success");
      getAllOrders();
    } else {
      setmyAlert(res.msg, "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  let count = 1;
  return (
    <div className="container-fluid px-4">
      <div className="dashboard-content" id="dashboard-order-page">
        <h1 className="past-order-heading"> ORDERS</h1>
        <div className="container">
          <div className="container-fluid px-4 overflow-scroll">
            <div className="row my-5">
              <h3 className="fs-4 mb-3">Total Active Orders:</h3>
              {isLoading ? (
                <LoaderComp />
              ) : (
                <div className="col">
                  <table className="table bg-white rounded shadow-sm  table-hover">
                    <thead>
                      <tr>
                        <th scope="col" width="50">
                          Sr.
                        </th>
                        <th scope="col">Name</th>
                        <th scope="col">DateOfOrder</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                        {/* <th scope="col">Address</th> */}
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders !== null &&
                        orders.length > 0 &&
                        orders.map((item) => (
                          <tr>
                            <th scope="row">{count++}</th>
                            <td>{item.product !== null ? item.product.name : item._id}</td>
                            <td>{item.Dateoforder}</td>
                            <td>{item.amount}</td>
                            <td>{item.status}</td>
                            {/* <td>{item.address}</td> */}
                            <td style={{ padding: "0%" }}>
                              <button
                                type="submit"
                                style={{
                                  border: "none",
                                  backgroundColor: "transparent",
                                  padding: "auto",
                                }}
                                onClick={()=> handleDeleteOrder(item._id)}
                              >
                                <i
                                  className="fa-solid fa-trash"
                                  style={{
                                    color: "red",
                                    backgroundColor: "transparent",
                                    cursor: "pointer",
                                    padding: "0%",
                                  }}
                                ></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
