
/*always import css files in last line of import */
import React, { useState } from "react";
import forgotPasswordImage from "/images/forgot_password.svg";
import "./ForgotPage.css";
import { isEmailValid } from "../../utils/validate";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  /*dont use object for state, just use "" as we're going to handle only one error*/
  const [emailError, setEmailError] = useState({});

  const handleEmail = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    /* dont use the below syntax if and delete in same line, use curly braces or ternary operator*/
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
                  {/* either using Input tag from antd or html tag dont mix and match discuss with parasu . go with one */}
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
                {/*} remove this and keep just emailError not need for object*/}

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
            {/* this span is nt doing anything */}
            <span className="material-symbols-outlined">
              keyboard_backspace
            </span>
            {/*change it to login page*/}
            <a href="/">Go back</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
