import React, { useEffect, useState } from "react";
import "../admin_dashboard.css";
import AdminActions from "../../../services/AdminActions";
import LoaderComp from "../../Loader";

const AdminFeedback = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setmyAlert } = props;
  const [feedbacks, setFeedbacks] = useState(null);
  const getAllFeedbacks = async () => {
    setIsLoading(true);
    const res = await AdminActions.getAllAdminFeedback();
    if (!res.error && res.data.length > 0) {
      setFeedbacks(res.data);
      // setmyAlert(res.msg, "success");
    } else {
      setmyAlert(res.msg, "error");
    }
    setIsLoading(false);
  };

  const handleDeleteFeedback = async (id) => {
    setIsLoading(true);
    const res = await AdminActions.deleteFeedback({ feedbackid: id });
    if (!res.error) {
      setmyAlert(res.msg, "success");
      getAllFeedbacks();
    } else {
      setmyAlert(res.msg, "error");
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getAllFeedbacks();
  }, []);
  let count = 1;

  return (
    <div class="container-fluid px-5 ">
      <div class="tableheader row my-4">
        <h3
          class="fs-4 mb-3 text-light py-3"
          style={{ backgroundColor: "#de5923" }}
        >
          Users Feedbacks
        </h3>
        {isLoading ? (
          <LoaderComp />
        ) : (
          <div class="tableparent px-5 py-4">
            <table class="table bg-white rounded shadow-sm  table-hover">
              <thead>
                <tr>
                  <th scope="col" width="50">
                    SrNo.
                  </th>
                  {/* <!-- <th scope="col">UID</th> --> */}
                  <th scope="col">UserName</th>
                  <th scope="col">E-Mail</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Message</th>
                  <th scope="col">Contact</th>
                  <th scope="col" class="text-center">
                    Delete Feedback
                  </th>
                </tr>
              </thead>
              <tbody>
                {feedbacks !== null &&
                  feedbacks.length > 0 &&
                  feedbacks.map((item) => (
                    <tr>
                      <th scope="row">{count++}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.subject}</td>
                      <td>{item.message}</td>
                      <td>{item.phone}</td>
                      <td style={{ padding: "0%" }}>
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            padding: "auto",
                          }}
                          onClick={() => {
                            handleDeleteFeedback(item._id);
                          }}
                        >
                          <i
                            class="fa-solid fa-trash"
                            style={{
                              color: "red",
                              cursor: "pointer",
                              padding: "auto",
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
  );
};

export default AdminFeedback;
