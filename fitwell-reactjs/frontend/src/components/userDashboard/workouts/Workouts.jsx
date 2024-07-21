import React, { useEffect, useState } from "react";
import "../User_Dashboard.css";
import { Buffer } from "buffer";
import LoaderComp from "../../Loader";
import { useSelector, useDispatch } from "react-redux";
import { setWorkout } from "../../../store/slices/workoutSlice.jsx"
import Timer from "../timer/Timer.jsx";

const WorkoutService = require("../../../services/WorkoutService");

const Workouts = () => {
  const [workouts, setWorkouts] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const homeWorkout = useSelector(state => state.workouts.homeWorkout)
  const dispatch = useDispatch()


  //Fetching workouts from backend
  const getWorkouts = async () => {
    setIsloading(true)
    const res = await WorkoutService.getAllWorkout();
    if (!res.error && res.data.length > 0) {
      dispatch(setWorkout(res.data))
      setWorkouts(res.data)
    }
    setIsloading(false)
  };



  useEffect(() => {
    if(homeWorkout ===undefined ||  homeWorkout.length === 0){
      getWorkouts();
    }
    else{
      setWorkouts(homeWorkout);
    }
  }, []);

  return (
    <div>
      <div class="dashboard-content" id="dashboard-workout-page">
        <h1
          class="Workout-heading"
          style={{ color: "black", fontWeight: "bold" }}
        >
          MUST TRY THESE HOME WORKOUTS...
        </h1>
        <div class="container">
          {isLoading ? (
            <LoaderComp />
          ) : (
            <div class="row row-cols-2 row-cols-md-3 container-fluid">
              {workouts !== null &&
                workouts.length > 0 &&
                workouts.map((item) => (
                  <div class="col-workout">
                    <div class="card-workout h-auto bg-dark">
                      <button
                        type="button"
                        class="btn challenge-img"
                        onclick={`timerWatch('startBtn${item._id}','stopBtn${item._id}','inputMin${item._id}','inputSec${item._id}','setBtn${item._id}','timer${item._id}')`}
                        data-bs-toggle="modal"
                        data-bs-target={`#${item._id}`}
                      >
                        <img
                          src={`data:image/${
                            item.img.img0.contentType
                          };base64, ${Buffer.from(item.img.img0.data).toString(
                            "base64"
                          )}`}
                          class="card-img-top"
                          alt="p5"
                          id="p5"
                        />
                      </button>
                      <div class="modal" style={{padding :'0%',overflowY: 'auto'}} id={item._id}>
                        <div class="modal-dialog modal-fullscreen">
                          <div class="modal-content">
                            <div class="modal-header modal-header-userDashboard">
                              {/* <div
                                class="timer"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "55%",
                                }}
                              >
                                <div
                                  class="timerCustomizer"
                                  style={{ display: "flex" }}
                                >
                                  <button
                                    class="timerBtnClass startBtn"
                                    style={{
                                      backgroundColor: "rgb(0, 248, 0)",
                                    }}
                                    id={`startBtn${item._id}`}
                                  >
                                    Start
                                  </button>
                                  <button
                                    class="timerBtnClass stopBtn"
                                    style={{
                                      backgroundColor: "rgb(255, 0, 0)",
                                    }}
                                    id={`stopBtn${item._id}`}
                                  >
                                    Stop
                                  </button>
                                  <button
                                    class="timerBtnClass"
                                    style={{
                                      backgroundColor: "orange",
                                      fontSize: "larger",
                                      border: "none",
                                      margin: "0px 5px",
                                    }}
                                    id={`setBtn${item._id}`}
                                  >
                                    Set Time
                                  </button>
                                  <input
                                    class="timerInputClass"
                                    name="min"
                                    style={{
                                      borderRadius: " 5px",
                                      fontSize: "larger",
                                      width: "50px",
                                      textAlign: "center",
                                      padding: "0%",
                                      border: "none",
                                    }}
                                    id={`inputMin${item._id}`}
                                    type="number"
                                    min="0"
                                    max="59"
                                    onChange={(e) => handleClock(e)}
                                  />
                                  <h3>:</h3>
                                  <input
                                    class="timerInputClass"
                                    name="sec"
                                    style={{
                                      borderRadius: " 5px",
                                      fontSize: "larger",
                                      width: "50px",
                                      textAlign: "center",
                                      padding: "0%",
                                      border: "none",
                                    }}
                                    id={`inputSec${item._id}`}
                                    type="number"
                                    min="0"
                                    max="59"
                                    onChange={(e) => handleClock(e)}

                                  />
                                </div>

                                <h3
                                  id="timerValue"
                                  style={{ color: "orangered" }}
                                >
                                  Time Left -{" "}
                                  <span id={`timer${item._id}`}>0:00</span>
                                </h3>
                              </div> */}
                              <Timer />
                              <button
                                type="button"
                                class="button-close"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                            <div
                              class="modal-body"
                              style={{ overflow: "visible" }}
                            >
                              <div class="workout-modal-body-border">
                                <img
                                  src={`data:image/${
                                    item.img.img0.contentType
                                  };base64, ${Buffer.from(
                                    item.img.img0.data
                                  ).toString("base64")}`}
                                  id="workout-img-main"
                                  alt="workout1"
                                />
                                <div class="workout-effects">
                                  <div class="workout-effects-container">
                                    <div class="workout-effect-1">
                                      <h2 class="workout-how-it-work">
                                        HOW IT WORKS
                                      </h2>
                                      <img
                                        src={`data:image/${
                                          item.img.img1.contentType
                                        };base64, ${Buffer.from(
                                          item.img.img1.data
                                        ).toString("base64")}`}
                                        id="workout-effects-1"
                                        alt="workout1.1"
                                        // id="workout-effects-1.1"
                                      />
                                    </div>
                                    <div class="workout-effect-234">
                                      <img
                                        src={`data:image/${
                                          item.img.img2.contentType
                                        };base64, ${Buffer.from(
                                          item.img.img2.data
                                        ).toString("base64")}`}
                                        alt="workout1.2"
                                        id="workout-effects-2"
                                      />
                                      <img
                                        src={`data:image/${
                                          item.img.img3.contentType
                                        };base64, ${Buffer.from(
                                          item.img.img3.data
                                        ).toString("base64")}`}
                                        alt="workout1.3"
                                        id="workout-effects-3"
                                      />
                                      <img
                                        src={`data:image/${
                                          item.img.img4.contentType
                                        };base64, ${Buffer.from(
                                          item.img.img4.data
                                        ).toString("base64")}`}
                                        alt="workout1.4"
                                        id="workout-effects-4"
                                      />
                                    </div>
                                  </div>
                                  <div class="workout-effect-explain">
                                    <h5>{item.description}</h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
