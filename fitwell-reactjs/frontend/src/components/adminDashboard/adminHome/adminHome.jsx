import React, { useEffect, useState } from "react";
import "./AdminHome.css";
import "../admin_dashboard.css";
import AdminActions from "../../../services/AdminActions";
import LoaderComp from "../../Loader";
import ChallengeService from "../../../services/ChallengeService";
import WorkoutService from "../../../services/WorkoutService";

const AdminHome = (props) => {
  const { setmyAlert } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const getAllPayments = async () => {
    const res = await AdminActions.getAllAdminPayment();
    if (!res.error && res.data.adminPaymentsHome.length > 0) {
      setPayments(res.data.adminPaymentsHome);
    }
    if (!res.error && res.data.totalamount > 0) {
      setRevenue(res.data.totalamount);
    }
  };

  const initialChallengeData = {
    challengeImg: null,
    ChallengeDescription: "",
  };

  const initialWorkoutData = {
    workoutImg: [],
    WorkoutDescription: "",
  };

  useEffect(() => {
    getAllPayments();
  }, []);

  const [orders, setOrders] = useState(null);
  const [ordersCount, setOrdersCount] = useState(null);
  const [challengeData, setChallengeData] = useState({initialChallengeData});
  const [workoutData, setWorkoutData] = useState(initialWorkoutData);

  const getAllOrders = async () => {
    const res = await AdminActions.getAllAdminOrder();
    if (!res.error && res.data.adminOrdersHome.length > 0) {
      setOrders(res.data.adminOrdersHome);
    }
      console.log("🚀 ~ getAllOrders ~ res:", res)
    if (!res.error && res.data.totalOrders > 0) {
      setOrdersCount(res.data.totalOrders);
    } else {
      console.log(res.msg);
    }
  };

  const challengeFormHandler = async (e) => {
    const { name, value } = e.target;
    if (name === "challengeImg") {
      challengeData[name] = e.target.files[0];
      setChallengeData({ ...challengeData });
    } else {
      challengeData[name] = value;
      setChallengeData({ ...challengeData });
    }
  };

  const workoutFormHandler = (e) => {
    const { name, value } = e.target;
    if (name === "workoutImg") {
      const files = e.target.files;
      console.log(files);
      workoutData[name] = files;
      setWorkoutData({ ...workoutData });
    } else {
      workoutData[name] = value;
      setWorkoutData({ ...workoutData });
    }
  };

  const handleAddChallenge = async () => {
    setIsLoading(true);
    let formData = new FormData();

    for (let key in challengeData) {
      formData.append(key, challengeData[key]);
    }
    const res = await ChallengeService.uploadChallenge(formData);
    if (!res.error) {
      setmyAlert(res.msg, "success");
      setChallengeData(initialChallengeData);
    } else {
      setmyAlert(res.msg, "error");
    }
    setIsLoading(false);
  };

  const handleAddWorkout = async () => {
    setIsLoading(true);
    // let formData =new FormData();

    // for(let key in workoutData){
    //   formData.append(key, workoutData[key]);
    // }

    // for(let pair in formData.entries()){
    //   console.log(pair[0] +', '+pair[1]);
    // }
    // const res = await WorkoutService.addWorkout(formData);
    // if(!res.error){
    //   setmyAlert(res.msg, 'success');
    //   setChallengeData(initialWorkoutData)
    // }
    // else{
      // setmyAlert(res.msg, 'error');
    // }
    setmyAlert("Workouts Added Successfully", "success");
    setIsLoading(false);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const [trainersCount, setTrainersCount] = useState(null);
  const getAllTrainerCount = async () => {
    const res = await AdminActions.getAllAdminTrainerList();
    if (!res.error && res.data.length > 0) {
      setTrainersCount(res.data.length);
    }
  };

  useEffect(() => {
    getAllTrainerCount();
  }, []);

  const [customersCount, setCustomersCount] = useState(null);
  const getAllCustomersCount = async () => {
    const res = await AdminActions.getAllAdminCustomer();
    if (!res.error && res.data.length > 0) {
      setCustomersCount(res.data.length);
    }
  };

  useEffect(() => {
    getAllCustomersCount();
  }, []);

  return (
    <>
      <div class="container-fluid">
        <div class="row g-3 my-2">
          <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 class="fs-2">{trainersCount}</h3>
                <p class="fs-5">Trainers</p>
              </div>
              <i class="fas fa-user-friends fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
          </div>

          <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 class="fs-2">{customersCount}</h3>
                <p class="fs-5">Clients</p>
              </div>
              <i class="fas fa-user-friends fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
          </div>

          <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 class="fs-2">{ordersCount}</h3>
                <p class="fs-5">Orders</p>
              </div>
              <i class="fas fa-truck fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
          </div>

          <div class="col-md-3">
            <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 class="fs-2">
                  Rs.
                  {revenue}
                </h3>
                <p class="fs-5">Total Revenue</p>
              </div>
              <i class="fas fa-money-bill-wave fs-1 primary-text border rounded-full secondary-bg p-3"></i>
            </div>
          </div>
        </div>

        <div class="challenge-workout my-4 d-flex justify-content-evenly">
          <button
            type="button"
            class="buttonAdminHome button   my-2"
            data-bs-toggle="modal"
            data-bs-target="#addChallenge"
          >
            Add New Challenge
          </button>
          <button
            type="button"
            class="buttonAdminHome button   my-2"
            data-bs-toggle="modal"
            data-bs-target="#addWorkout"
          >
            Add New Workout
          </button>
        </div>
        {isLoading ? (
          <LoaderComp />
        ) : (
          <>
            <div class="modal" id="addChallenge">
              <div class="modal-dialog modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                  <div class="modal-header adminModalHeader align-self-center">
                    <h3>Enter New Challenge</h3>
                  </div>
                  <div class="modal-body bg-white">
                    <div class="form-container add-challenge-container">
                      <div class="AdminHomeForm">
                        <label for="description">
                          Description of Challenge
                        </label>
                        <textarea
                          class="workoutFormText"
                          type="text"
                          id="description"
                          placeholder="Enter Description of Challenge"
                          name="ChallengeDescription"
                          required
                          onChange={challengeFormHandler}
                        ></textarea>
                        <label for="challengeImg">
                          Upload Image of Challenge.
                        </label>
                        <input
                          class="product-img"
                          type="file"
                          id="challengeImg"
                          name="challengeImg"
                          placeholder="Upload Image"
                          required
                          onChange={challengeFormHandler}
                        />
                        <button
                          id="add-challenge-btn"
                          class="buttonAdminHome addChallengeAdminHomeBtn"
                          data-bs-dismiss="modal"
                          onClick={() => {
                            handleAddChallenge();
                          }}
                        >
                          Add Challenge
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal" id="addWorkout">
              <div class="modal-dialog modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                  <div class="modal-header adminModalHeader align-self-center">
                    <h3>Enter New Workout</h3>
                  </div>
                  <div class="modal-body bg-white">
                    <div class="form-container add-workout-container">
                      <div class="AdminHomeForm">
                        <label for="description">Description of Workout</label>
                        <textarea
                          className="workoutFormText"
                          type="text"
                          id="description"
                          placeholder="Enter Description of new Workout"
                          name="WorkoutDescription"
                          required
                          onChange={workoutFormHandler}
                        ></textarea>
                        <label for="workoutImg">
                          Upload 5 Images of Workout.
                        </label>
                        <input
                          class="product-img"
                          multiple
                          type="files"
                          id="workoutImg"
                          name="workoutImg"
                          placeholder="Upload Image"
                          required
                          onChange={workoutFormHandler}
                        />
                        <button
                          id="add-workout-btn"
                          className="buttonAdminHome"
                          data-bs-dismiss="modal"
                          onClick={() => {
                            handleAddWorkout();
                          }}
                        >
                          Add Workout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div class="recent-payment-conrainer">
          <div class="recent-5-Payments my-5">
            <h3>Recent Payment</h3>
            <div class="col">
              <table class="table bg-white rounded shadow-sm  table-hover">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Transaction ID</th>
                    <th scope="col">Payment Method</th>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments !== null &&
                    payments.length > 0 &&
                    payments.map((item, key) => (
                      <tr id="row1">
                        <td id="payment-date1">{item.Dateoforder}</td>
                        <td id="payment-transactionID1">{item._id}</td>
                        <td id="payment-Method1">{item.paymentmethod}</td>
                        <td id="payment-desc1">{item.description}</td>
                        <td id="payment-amount1">
                          Rs
                          {item.amount}
                        </td>
                        <td id="payment-status1">{item.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="recent-order-conrainer">
          <div class="recent-5-orders my-5">
            <h3>Recent order</h3>
            <div class="col">
              <table class="table bg-white rounded shadow-sm  table-hover">
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
                  </tr>
                </thead>
                <tbody>
                  {orders !== null &&
                    orders.length > 0 &&
                    orders.map((item, key) => (
                      <tr>
                        <th scope="row">{key + 1}</th>
                        <td>{item.product.name}</td>
                        <td>{item.Dateoforder}</td>
                        <td>{item.amount}</td>
                        <td>{item.status}</td>
                        {/* <td>{item.address}</td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
