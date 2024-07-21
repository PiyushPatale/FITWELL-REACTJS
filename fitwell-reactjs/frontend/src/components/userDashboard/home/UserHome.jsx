import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../User_Dashboard.css";
import { useSelector } from 'react-redux';
import UserService from "../../../services/UserService"
import { PUBLIC_SERVER_URL } from "../../../api";

const host=`${PUBLIC_SERVER_URL}/api/getProfileImage`

const UserHome = (props) => {
  const {setmyAlert} = props;
  const userDetails= useSelector(state => state.user.userDetails);
  const isLoggedIn=useSelector(state => state.user.isLoggedIn)
  // const [imageName, setImageName]=useState(userDetails.image ? userDetails.image.split('/')[2] : '')

  const [bmi, setBmi]=useState(
    (userDetails.weight / Math.pow((parseFloat(userDetails.height)/100),2)).toFixed(2)
  )
  const navigate=useNavigate();
  
  //Checking User LoggedIn or Session Expired;
  const checkUserLoggedIn=()=>{
    if(isLoggedIn === false || userDetails ===null){
      setmyAlert("Session Expired, Log in again", "error")
      navigate('../UserSignIn')
    }
  }

  useEffect(()=>{
    checkUserLoggedIn();
  },[])


  return (
    <div class="dashboard-content active" id="dashboard-home-page">
      <div class="container">

        <div class="container-profile-bmi">
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"
            integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk="
            crossorigin="anonymous"
          />

          <div class="col-md-10 ">
            <div class="row ">
              <div class="col-xl-3 col-lg-6">
                <div class="card udcard l-bg-cherry">
                  <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large">
                      <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="mb-4">
                      <h5 class="card-title mb-0">My Orders</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                      <div class="col-8">
                        <h2 class="d-flex align-items-center mb-0">
                          {3}
                        </h2>
                      </div>
                      <div class="col-4 text-right"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-6">
                <div class="card l-bg-blue-dark">
                  <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large">
                      <i class="fas fa-users"></i>
                    </div>
                    <div class="mb-4">
                      <h5 class="card-title mb-0">Premium Expiring</h5>
                    </div>
                    <div class="row">
                      <div class="w-100 m-0 p-0">
                        <h4>{new Date(userDetails.expirydate).toDateString()}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-6">
                <div class="card l-bg-green-dark">
                  <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large">
                      <i class="fas fa-ticket-alt"></i>
                    </div>
                    <div class="mb-4">
                      <h5 class="card-title mb-0">My Reviews</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                      <div class="col-8">
                        <h2 class="d-flex align-items-center mb-0">
                          {0}
                        </h2>
                      </div>
                      <div class="col-4 text-right"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-lg-6">
                <div class="card l-bg-orange-dark">
                  <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large">
                      <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="mb-4">
                      <h5 class="card-title mb-0">Total Payments</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                      <div class="col-8">
                        <h3 class="d-flex align-items-center mb-0">
                          Rs.
                          {1452}
                        </h3>
                      </div>
                      <div class="col-4 text-right"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="topinfo" >
            <div class="userdetails no-gutters">
              <div class="userimg card-body w-100 d-flex justify-content-center" style={{backgroundColor : "white"}}>
                <img
                  // src={`${host}/${imageName}`}
                  src={userDetails.image}
                  alt=""
                />
              </div>
              <div class="userinfo" style={{color : "black"}}>
                <h3 className="userHomeInfo">
                  Hey,
                  {userDetails.name}
                </h3>
                <h5 className="userHomeInfo">Email :{userDetails.email}</h5>
                <h4 className="userHomeInfo">
                  Weight:
                  <span id="bmiweight" style={{fontSize : "25px"}}>{userDetails.weight}</span>kg
                </h4>
                <h4 className="userHomeInfo">
                  Height:
                  <span id="bmiweight" style={{fontSize : "25px"}}>{userDetails.height}</span>cm
                </h4>
                {/* {userDetails.expiry=userDetails.DateOfJoin} */}
              </div>
            </div>
            <div class="bmi" style={{backgroundColor : "white"}}>
              <div
                class="card bmicard bg-white"
                onclick=""
                style={{maxWidth: '540px'}}
              >
                <div class="row cardrow no-gutters h-100 bg-white"  style={{border : "solid", borderRadius : "5px"}}>
                  <div class="col-md-4 w-100 d-flex justify-content-center bg-white" >
                    <img
                      src="https://thumbs.dreamstime.com/b/bmi-body-mass-index-dial-chart-clipart-image-isolated-white-background-bmi-body-mass-index-dial-chart-136770137.jpg"
                      class="card-img"
                      alt="bmi"
                    />
                  </div>

                  <div
                    class="card-body justify-content-center p-0 bg-white h-50"
                    id="bmi-value"

                  >
                    <h4 className="userHomeInfo" style={{textAlign: 'center', fontFamily: 'Bebas Neue cursive', fontWeight: 'bolder'}}>
                      BMI: {bmi}
                     
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="class-timetable-section class-details-timetable spad">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="class-details-timetable_title">
                  <h5>Classes timetable</h5>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="class-timetable details-timetable">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="class-time">6.00am - 8.00am</td>
                        <td
                          class="dark-bg hover-dp ts-meta"
                          data-tsmeta="workout"
                        >
                          <h5>WEIGHT LOOSE</h5>
                          <span>RLefew D. Loee</span>
                        </td>
                        <td class="hover-dp ts-meta" data-tsmeta="fitness">
                          <h5>Cardio</h5>
                          <span>RLefew D. Loee</span>
                        </td>
                        <td
                          class="dark-bg hover-dp ts-meta"
                          data-tsmeta="workout"
                        >
                          <h5>Yoga</h5>
                          <span>Keaf Shen</span>
                        </td>
                        <td class="hover-dp ts-meta" data-tsmeta="fitness">
                          <h5>Fitness</h5>
                          <span>Kimberly Stone</span>
                        </td>
                        <td class="dark-bg blank-td"></td>
                        <td class="hover-dp ts-meta" data-tsmeta="motivation">
                          <h5>Boxing</h5>
                          <span>Rachel Adam</span>
                        </td>
                        <td
                          class="dark-bg hover-dp ts-meta"
                          data-tsmeta="workout"
                        >
                          <h5>Body Building</h5>
                          <span>Robert Cage</span>
                        </td>
                      </tr>
                      <tr>
                        <td class="class-time">10.00am - 12.00am</td>
                        <td class="blank-td"></td>
                        <td
                          class="dark-bg hover-dp ts-meta"
                          data-tsmeta="fitness"
                        >
                          <h5>Fitness</h5>
                          <span>Kimberly Stone</span>
                        </td>
                        <td class="hover-dp ts-meta" data-tsmeta="workout">
                          <h5>WEIGHT LOOSE</h5>
                          <span>RLefew D. Loee</span>
                        </td>
                        <td
                          class="dark-bg hover-dp ts-meta"
                          data-tsmeta="motivation"
                        >
                          <h5>Cardio</h5>
                          <span>RLefew D. Loee</span>
                        </td>
                        <td class="hover-dp ts-meta" data-tsmeta="workout">
                          <h5>Body Building</h5>
                          <span>Robert Cage</span>
                        </td>
                        <td
                          class="dark-bg hover-dp ts-meta"
                          data-tsmeta="motivation"
                        >
                          <h5>Karate</h5>
                          <span>Donald Grey</span>
                        </td>
                        <td class="blank-td"></td>
                      </tr>
                      <tr>
                        <td class="class-time">5.00pm - 7.00pm</td>
                        <td
                          class="dark-bg hover-dp ts-meta"
                          data-tsmeta="fitness"
                        >
                          <h5>Boxing</h5>
                          <span>Rachel Adam</span>
                        </td>
                        <td class="hover-dp ts-meta" data-tsmeta="motivation">
                          <h5>Karate</h5>
                          <span>Donald Grey</span>
                        </td>
                        <td
                          class="dark-bg hover-dp ts-meta"
                          data-tsmeta="workout"
                        >
                          <h5>Body Building</h5>
                          <span>Robert Cage</span>
                        </td>
                        <td class="blank-td"></td>
                        <td
                          class="dark-bg hover-dp ts-meta"
                          data-tsmeta="workout"
                        >
                          <h5>Yoga</h5>
                          <span>Keaf Shen</span>
                        </td>
                        <td class="hover-dp ts-meta" data-tsmeta="motivation">
                          <h5>Cardio</h5>
                          <span>RLefew D. Loee</span>
                        </td>
                        <td
                          class="dark-bg hover-dp ts-meta"
                          data-tsmeta="fitness"
                        >
                          <h5>Fitness</h5>
                          <span>Kimberly Stone</span>
                        </td>
                      </tr>
                      <tr>
                        <td class="class-time">7.00pm - 9.00pm</td>
                        <td class="hover-dp ts-meta" data-tsmeta="motivation">
                          <h5>Cardio</h5>
                          <span>RLefew D. Loee</span>
                        </td>
                        <td class="dark-bg blank-td"></td>
                        <td class="hover-dp ts-meta" data-tsmeta="fitness">
                          <h5>Boxing</h5>
                          <span>Rachel Adam</span> 
                        </td>
                        <td
                          class="dark-bg hover-dp ts-meta"
                          data-tsmeta="workout"
                        >
                          <h5>Yoga</h5>
                          <span>Keaf Shen</span>
                        </td>
                        <td class="hover-dp ts-meta" data-tsmeta="motivation">
                          <h5>Karate</h5>
                          <span>Donald Grey</span>
                        </td>
                        <td
                          class="dark-bg hover-dp ts-meta"
                          data-tsmeta="fitness"
                        >
                          <h5>Boxing</h5>
                          <span>Rachel Adam</span>
                        </td>
                        <td class="hover-dp ts-meta" data-tsmeta="workout">
                          <h5>WEIGHT LOOSE</h5>
                          <span>RLefew D. Loee</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserHome;
