import React, { useState } from "react";
import forgotPasswordImage from "/images/forgot_password1.svg";
import { isEmailValid } from "../../utils/validate";
import "../forgotPassword/scss/ForgotPassword.css";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({});

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
    }
  };
  return (
    <div className="container">
      <main className="forgot-page-container">
        <div className="logo-container">
        <a className="back" href="/">
          <img
            className="logo"
            src="/images/dckap_palli_logo_sm.svg"
            alt=""
            draggable={false}
          />
          </a>
        </div>
        <div className="forgot-container flex">
          <div className="login-image-container">
            <img src={forgotPasswordImage} alt="ForgotPasswordImage" />
          </div>
          <div className="">
            <div className="forgot-form-container">
             
                <a className="back" href="/">
                  <span>
                    <img src="/icons/backIcon.svg" alt="" />
                  </span>
                  <p className="backtologin">Back to login</p>
                </a>
             
              <div className="form-heading">
                <h1>Forgot Password?</h1>
                <p>No Worries we’ll send you reset instructions</p>
              </div>

              <div className="form-container">
                <form action="" onSubmit={handelSubmit}>
                  {/* Email input field section */}
                  <div className="email-container flex">
                    <label htmlFor="Email">
                      Email Id
                      <span className="required-symbole">*</span>
                    </label>
                    <div className="">
                      {/* <span className="material-symbols-outlined">mail</span> */}
                      <input
                        autoComplete="off"
                        type="text"
                        className={`email-input ${emailError.email ? "error-notify":""}`}
                        placeholder="Type here..."
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
                  <div className="forgot-button-container">
                    <button className="btn primary-medium ">
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
              {/* Back link to go back */}
            </div>
          </div>
        </div>

        {/* Right side container with input fields and instructions */}
      </main>
    </div>
  );
};

export default ForgotPassword;
