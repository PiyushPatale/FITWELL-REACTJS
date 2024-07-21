import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { useSelector, useDispatch } from "react-redux";
import { userLogin, addAuthtoken } from "../../store/slices/userSlice";
import LoaderComp from "../Loader";

function SignInForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {setmyAlert} = props;
  const [isLoading, setIsloading] = useState(false);
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    setIsloading(true);
    evt.preventDefault();
    if(state.email  === 'admin123@gmail.com' && state.password ==='admin'){
      setmyAlert('Admin Logged In Successfully', 'success')
      navigate('/AdminHome')
    }
    else if(state.email === 'aarogyasupplients@gmail.com' && state.password === '@User123'){
      setmyAlert('Company Logged In Successfully', 'success')
      navigate('/CompanyHome')
    }
    else{
      const res = await UserService.userLogin(state);
      if (!res.error) {
        for (const key in state) {
          setState({
            ...state,
            [key]: "",
          });
        }
        //Setting values to redux Store
        dispatch(userLogin(res.data));
        dispatch(addAuthtoken(res.authtoken));
        //Navigating to User Dashboard
        navigate("../UserHome");
      }
      // setIsloading(false);
      setmyAlert(res.msg, res.error ? 'error' : 'success')
      } 
     setIsloading(false)
  };

  return (
    <>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <div className="form-container1 sign-in-container">
          <form onSubmit={handleOnSubmit} className="auth-form">
            <h1>Sign In</h1>
            <span className="auth-span">or use your account</span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={state.email}
              onChange={handleChange}
              className="auth-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
              className="auth-input"
            />
            <button className="auth-button">Sign In</button>
          </form>
        </div>
      )}
    </>
  );
}

export default SignInForm;
