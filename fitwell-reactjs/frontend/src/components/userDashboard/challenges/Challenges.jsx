import React, { useEffect, useState } from "react";
import "../User_Dashboard.css";
import { Buffer } from "buffer";
import LoaderComp from "../../Loader";
import { useSelector, useDispatch } from "react-redux";
import { setChallenges as setChallengesInStore } from "../../../store/slices/workoutSlice.jsx"
import Timer from "../timer/Timer.jsx";

const ChallengeService = require("../../../services/ChallengeService");

const Challenges = () => {
  const [challenges, setChallenges] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const storeChallenges = useSelector(state => state.workouts.challenges)

  //Fetching challenges from backend
  const getChallenges = async () => {
    setIsloading(true);
    const res = await ChallengeService.getAllChallenge();
    if (!res.error && res.data.length > 0) {
      dispatch(setChallengesInStore(res.data))
      setChallenges(res.data);
    }
    setIsloading(false);
  };

  useEffect(() => {
    if(storeChallenges ===undefined ||  storeChallenges.length === 0){
      getChallenges();
    }
    else{
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
          CHALLENGE YOURSELF
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
                        onclick={`timerWatch('startBtn${item._id}','stopBtn${item._id}','inputMin${item._id}','inputSec${item._id}','setBtn${item._id}','timer${item._id}')`}
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
                      <div class="modal" id={item._id}>
                        <div class="modal-dialog modal-fullscreen">
                          <div class="modal-content">
                            <div class="modal-header modal-header-userDashboard">
                              <Timer/>
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
                              <div class="challenge-modal-body-border">
                                <img
                                  src={`data:image/${
                                    item.img.contentType
                                  };base64, ${Buffer.from(
                                    item.img.data
                                  ).toString("base64")}`}
                                  id="challenge-img-main"
                                  alt="challenge1"
                                />
                                <div class="challenge-effects">
                                  <div class="challenge-effects-container">
                                    <div class="challenge-effect-1">
                                      <h2 class="challenge-how-it-work">
                                        ADDRESS OF CHALLENGE
                                      </h2>
                                      <h5 class="challenge-address-text">
                                        {item.description}
                                      </h5>
                                    </div>
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

export default Challenges;
