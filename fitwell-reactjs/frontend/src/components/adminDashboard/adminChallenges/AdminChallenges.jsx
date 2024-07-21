/* The above code is a React component called AdminChallenges. It is responsible for displaying a list
of challenges fetched from the backend. Here is a summary of what the code is doing: */
import React, { useEffect, useState } from "react";
// import "../User_Dashboard.css";
import { Buffer } from "buffer";
import LoaderComp from "../../Loader.js";
import { useSelector, useDispatch } from "react-redux";
import { setChallenges as setChallengesInStore, deleteChallenge } from "../../../store/slices/workoutSlice.jsx";
// import Timer from "../timer/Timer.jsx";

const ChallengeService = require("../../../services/ChallengeService.js");

const AdminChallenges = (props) => {
  const [challenges, setChallenges] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const { setmyAlert } = props;

  const dispatch = useDispatch();
  const storeChallenges = useSelector((state) => state.workouts.challenges);

  //Fetching challenges from backend
  const getChallenges = async () => {
    setIsloading(true);
    const res = await ChallengeService.getAllChallenge();
    if (!res.error && res.data.length > 0) {
      dispatch(setChallengesInStore(res.data));
      setChallenges(res.data);
    }
    setIsloading(false);
  };

  const handleDeleteChallenge = async(id) => {
    setIsloading(true);
    const res = await ChallengeService.deleteChallenge({ challengeid: id });
    if (!res.error) {
      dispatch(deleteChallenge({ challengeid: id }));
      setChallenges(res.data);
      setmyAlert(res.msg, "success");
    } else {
      setmyAlert(res.msg, "error");
    }
    setIsloading(false);
  };

  useEffect(() => {
    if (storeChallenges === undefined || storeChallenges.length === 0) {
      getChallenges();
    } else {
      setChallenges(storeChallenges);
    }
  }, []);

  return (
    <div>
      <div class="dashboard-content" id="dashboard-challenge-page">
        <h1
          class="challenge-heading"
          style={{ color: "black", fontWeight: "bold" }}
        >
          CHALLENGES
        </h1>
        <div class="container">
          {isLoading ? (
            <LoaderComp />
          ) : (
            <div class="row row-cols-2 row-cols-md-3 container-fluid">
              {challenges !== null &&
                challenges.length > 0 &&
                challenges.map((item) => (
                  <div class="col-challenge">
                    <div class="card-challenge h-auto bg-dark">
                      <button
                        type="button"
                        class="btn challenge-img"
                        data-bs-toggle="modal"
                        data-bs-target={`#${item._id}`}
                      >
                        <img
                          src={`data:image/${
                            item.img.contentType
                          };base64, ${Buffer.from(item.img.data).toString(
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
                                Delete this Challenge?
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
                                  item.img.contentType
                                };base64, ${Buffer.from(item.img.data).toString(
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
                                Click <b>Delete</b> to remove challenge
                                permanently.
                              </h5>
                              <p
                                style={{ textAlign: "center", color: "black" }}
                              >
                                <b>Cancel</b> to keep the challenge.
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
                                onClick={() => handleDeleteChallenge(item._id)}
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

export default AdminChallenges;
