import React, { useState } from "react";
import forgotPasswordImage from "/images/forgot_password.svg";
import { isEmailValid } from "../../utils/validate";
import axios from "axios";
import { API_END_POINT } from "../../../config";
import { useAuth } from "../../context/AuthContext";
import { notification } from "antd";

const ForgotPassword = () => {
  const {token} = useAuth()
  const [email, setEmail] = useState("testui@gmail.com");
  const [emailError, setEmailError] = useState({});
  const headers = {
    Authorization : `Bearer ${token.access}`,
    "Content-type" : "application/json"
  }
  const handleEmail = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    if (emailError[name]) delete emailError[name];
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    const isvalidEmail = isEmailValid(email);
    if (isvalidEmail) {
      setEmailError({ ...emailError, email: isvalidEmail });
    } else {
      //doing api call
      axios.post(`${API_END_POINT}/api/accounts/forgot_password/`,{email}).then((res)=>{
        notification.success({
          message: "Success",
          description: `${res.data.message}`,
          duration: 2,
        });
      }).catch((error)=>{
        if (error.response && error.response.status === 400) {
            notification.error({
              message: "InvalidUser",
              description: `Email Not Found`,
              duration: 2,
            });
          // Handle the error or take necessary actions
        } else {
         
        }

      })
    }
  };
  return (
    <div className="forgot-password-wrapper">
       <div className="forgot-container">
      {/* Left side container with an image */}
      <div className="left-side">
        <img src={forgotPasswordImage} alt="ForgotPasswordImage" />
      </div>

      {/* Right side container with input fields and instructions */}
      <div className="right-side">
        {/* Circular icon container */}
        <div className="circle">
          <span className="material-symbols-outlined">vpn_key</span>
        </div>

        {/* Container for the main input fields */}
        <div className="input-container">
          {/* Header section with title and description */}
          <div className="forgot-heading">
            <h3>Forgot Password?</h3>
            <p>No Worries we’ll send you reset instructions</p>
          </div>

          <div className="form-container">
            <form action="" onSubmit={handelSubmit}>
              {/* Email input field section */}
              <div className="email-input">
                <label htmlFor="Email">
                  Email
                  <span className="required-symbole">*</span>
                </label>
                <div className="emailAndicon">
                  <span className="material-symbols-outlined">mail</span>
                  <input
                    autoComplete="off"
                    type="text"
                    className="forgot-password-input"
                    placeholder="Input Email"
                    value={email}
                    onChange={handleEmail}
                    name="email"
                  />
                </div>

                <p className="error-message">
                  {emailError.email ? emailError.email : ""}
                </p>
              </div>

              {/* Reset password button */}
              <div className="resetpassword">
                <button>Reset Password</button>
              </div>
            </form>
          </div>
          {/* Back link to go back */}
          <div className="back">
            <span className="material-symbols-outlined">
              keyboard_backspace
            </span>
            <a href="/">Go back</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
