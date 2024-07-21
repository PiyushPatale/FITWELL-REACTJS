import React, { useEffect, useState } from "react";
import "./AdminTrainerForm.css";
import LoaderComp from "../../Loader";
import TrainerService  from "../../../services/TrainerService"
const AdminActions = require("../../../services/AdminActions");

const AdminTrainers = (props) => {
  const { setmyAlert } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [trainers, setTrainers] = useState(null);
  const initialTrainerData = {
    _id:'',
    name: '',
    email: '',
    gender: '',
    salary: '',
    image: ''
  }
  const [trainerData, setTrainerData] = useState(initialTrainerData);

  let count = 1;
  const getAllTrainerList = async () => {
    setIsLoading(true);
    const res = await AdminActions.getAllAdminTrainerList();
    if (!res.error && res.data.length > 0) {
      setTrainers(res.data);
    }
    setIsLoading(false);
  };

  
  const handleDeleteTrainer = async (trainerid) => {
    setIsLoading(true);
    const res = await AdminActions.deleteTrainer({ trainerid });
    if (!res.error) {
      setmyAlert(res.msg, "success");
      getAllTrainerList();
    } else {
      setmyAlert(res.msg, "error");
    }
    setIsLoading(false);
  };
  const handleChange = async (e) => {
    const { name, value } = e.target;
    
      trainerData[name] = value;
      setTrainerData({ ...trainerData });
      console.log("🚀 ~ handleChange ~ trainerData:", trainerData)
    
  };

  const handleAddTrainer = async () => {
    setIsLoading(true);
    const res = await TrainerService.addTrainer(trainerData);
    if (!res.error) {
      setmyAlert(res.msg, "success");
      setTrainerData({initialTrainerData});
    } else {
      setmyAlert(res.msg, "error");
    }
    setIsLoading(false);
  };

  const handleUpdateTrainer = async (trainer) => {
      setIsLoading(true);
      const res = await TrainerService.updateTrainer(trainerData);
      if (!res.error) {
        setmyAlert(res.msg, "success");
        setTrainerData({initialTrainerData});
        getAllTrainerList();
      } else {
        setmyAlert(res.msg, "error");
      }
      setIsLoading(false);
  };

  useEffect(() => {
    getAllTrainerList();
  }, []);

  return (
    <div>
      <div class="container-fluid px-4 overflow-scroll">
        <button
          class="button adminTrainerButton my-2"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalAddTrainer"
        >
          Add New Trainer
        </button>

        <div class="row my-5">
          <h3 class="fs-4 mb-3">Trainers Information</h3>
          {isLoading ? (
            <LoaderComp />
          ) : (
            <div class="col">
              <table class="table bg-white rounded shadow-sm  table-hover">
                <thead>
                  <tr>
                    <th scope="col" width="50">
                      Sr.
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">DOJ</th>
                    <th scope="col">Salary</th>
                    <th scope="col" class="text-center">
                      Edit Trainer
                    </th>
                    <th scope="col" class="text-center">
                      Remove Trainer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trainers !== null &&
                    trainers.length > 0 &&
                    trainers.map((item) => (
                      <tr>
                        <th scope="row">{count++}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>
                        <td>{item.DateOfJoin}</td>
                        <td>{item.salary}</td>
                        <td style={{ padding: "0%" }}>
                          <button
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                              padding: "auto",
                            }}
                            onClick={() => {
                              setTrainerData(item);
                              
                            }}
                            className=" px-5 button  my-2"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModalEditTrainer"
                          >
                            <i
                              class="fa-solid fa-edit"
                              style={{
                                color: "red",
                                cursor: "pointer",
                                padding: "auto",
                              }}
                            ></i>
                          </button>
                        </td>
                        <td style={{ padding: "0%" }}>
                          <button
                            className=""
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                              padding: "auto",
                            }}
                            onClick={() => {
                              handleDeleteTrainer(item._id);
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

      <div className="modal" id="exampleModalAddTrainer">
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header adminModalHeader align-self-center">
              <h2 style={{ fontWeight: "bold" }}>
                Fill Out Appropriate Details of Trainer
              </h2>
            </div>
            <div
              className="modal-body"
              style={{ backgroundColor: "white", color: "black" }}
            >
              <div className="form-container">
                <div
                  className="adminAddTrainerForm"
                >
                  <fieldset>
                    <input
                      className="addTrainerFormInput"
                      type="text"
                      id="namec"
                      placeholder="Name"
                      name="name"
                      value={trainerData.name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="addTrainerFormInput"
                      type="email"
                      id="emailc"
                      placeholder="Email"
                      name="email"
                      value={trainerData.email}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="addTrainerFormInput"
                      type="text"
                      id="genderc"
                      placeholder="Gender"
                      name="gender"
                      value={trainerData.gender}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="addTrainerFormInput"
                      type="number"
                      id="salary-trainer"
                      placeholder="Enter salary"
                      name="salary"
                      value={trainerData.salary}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="addTrainerFormInput"
                      type="url"
                      id="image"
                      name="image"
                      value={trainerData.image}
                      placeholder="Enter Profile Image Url"
                      onChange={handleChange}
                    />
                  </fieldset>
                  <button
                    class="btnSubmitTrainers"
                    id="signupbtn"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      handleAddTrainer()
                    }}
                  >
                    Add Trainer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="modal" id="exampleModalEditTrainer">
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header adminModalHeader align-self-center">
              <h2 style={{ fontWeight: "bold" }}>
                Fill Out Appropriate Details of Trainer
              </h2>
            </div>
            <div
              className="modal-body"
              style={{ backgroundColor: "white", color: "black" }}
            >
              <div className="form-container">
                <div
                  className="adminAddTrainerForm"
                >
                  <fieldset>
                    <input
                      className="addTrainerFormInput"
                      type="text"
                      id="namec"
                      placeholder="Name"
                      name="name"
                      value={trainerData.name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="addTrainerFormInput"
                      type="email"
                      id="emailc"
                      placeholder="Email"
                      name="email"
                      value={trainerData.email}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="addTrainerFormInput"
                      type="text"
                      id="genderc"
                      placeholder="Gender"
                      name="gender"
                      value={trainerData.gender}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="addTrainerFormInput"
                      type="number"
                      id="salary-trainer"
                      placeholder="Enter salary"
                      name="salary"
                      value={trainerData.salary}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="addTrainerFormInput"
                      type="url"
                      id="image"
                      name="image"
                      value={trainerData.image}
                      placeholder="Enter Profile Image Url"
                      onChange={handleChange}
                    />
                  </fieldset>
                  <button
                    class="btnSubmitTrainers"
                    id="signupbtn"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      handleUpdateTrainer()
                    }}
                  >
                    Update Trainer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default AdminTrainers;
