import React, { useEffect, useState } from "react";
// import "../User_Dashboard.css";
import { Buffer } from "buffer";
import LoaderComp from "../../Loader.js";
import { useSelector, useDispatch } from "react-redux";
import { setWorkout, deleteWorkout } from "../../../store/slices/workoutSlice.jsx"
// import Timer from "../timer/Timer.jsx";

const WorkoutService = require("../../../services/WorkoutService.js");

const AdminWorkouts = (props) => {
  const [workouts, setWorkouts] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const homeWorkout = useSelector(state => state.workouts.homeWorkout)
  const dispatch = useDispatch();
  const { setmyAlert } = props;



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

  const handleDeleteWorkout = async(id) => {
    setIsloading(true);
    const res = await WorkoutService.deleteWorkout({ workoutid: id });
    if (!res.error) {
      dispatch(deleteWorkout({ workoutId: id }));
      setmyAlert(res.msg, "success");
      
    } else {
      setmyAlert(res.msg, "error");
    }
    setIsloading(false);
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
          HOME WORKOUTS
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
                      <div class="modal" tabindex="-1" id={item._id}>
                        <div class="modal-dialog  modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title">
                                Delete this Workout?
                              </h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body bg-white d-flex">
                              <img
                                src={`data:image/${
                                  item.img.img0.contentType
                                };base64, ${Buffer.from(item.img.img0.data).toString(
                                  "base64"
                                )}`}
                                alt={`Challenge Image ${item._id}`}
                                style={{
                                  height: "60vh",
                                  width: "25vw",
                                  alignSelf: "center",
                                }}
                              />
                              <h5
                                style={{
                                  textAlign: "center",
                                  color: "black",
                                  marginTop: "3vh",
                                }}
                              >
                                Click <b>Delete</b> to remove Workout
                                permanently.
                              </h5>
                              <p
                                style={{ textAlign: "center", color: "black" }}
                              >
                                <b>Cancel</b> to keep the workout.
                              </p>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={() => handleDeleteWorkout(item._id)}
                              >
                                Delete
                              </button>
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

export default AdminWorkouts;
