import React, { useState } from "react";
import "../User_Dashboard.css";
import UserActionService from "../../../services/UserActionService";
import { useSelector } from "react-redux";
import LoaderComp from "../../Loader";

const UserReviews = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState({
    name: userDetails.name,
    image: userDetails.image,
    _id: userDetails._id,
    comment: "",
  });

  const formHandler = (e) => {
    const { name, value } = e.target;
    data[name] = value;
    setData({ ...data });
  };

  const handleClickSubmit = async (e) => {
    setIsloading(true);
    e.preventDefault();
    const res = await UserActionService.putReview(data);
    if (!res.error) {
      alert(res.msg);
    } else {
      data.comment = "";
      setData({ ...data });
    }
    setIsloading(false);
  };
  return (
    <div class="dashboard-content" id="dashboard-review-page">
      {isLoading ? (
        <LoaderComp />
      ) : (
        <div class="container">
          <div class="container-review">
            <h1>Leave a Review</h1>
            <form id="review-form" onSubmit={handleClickSubmit}>
              <label for="comment">Comment:</label>
              <textarea
                id="comment"
                name="comment"
                rows="5"
                required
                onChange={formHandler}
                value={data.comment}
              ></textarea>

              <label for="rating">Rating:</label>
              <select id="rating" name="rating" required>
                <option id="rating" value="">
                  Select
                </option>
                <option id="star" value="5">
                  * * * * *
                </option>
                <option id="star" value="4">
                  * * * *
                </option>
                <option id="star" value="3">
                  * * *
                </option>
                <option id="star" value="2">
                  * *
                </option>
                <option id="star" value="1">
                  *
                </option>
              </select>
              <div class="review-submit">
                <input class="submit-review" type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReviews;
