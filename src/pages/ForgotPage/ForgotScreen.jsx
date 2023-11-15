import React, { useState } from "react";
import ForgotPasswordImage from "../../assets/images/ForgotPasswordImage.png";
import "../ForgotPage/ForgotPage.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Reset the email error when the user starts typing
    setEmailError("");
  };

  const validateEmail = () => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    }
  };

  const handleResetPassword = () => {
    validateEmail();

    // If there's an email error, prevent further actions
    if (emailError) {
      return;
    }

    // Add logic for handling password reset here
    // This is where you would typically send a request to your server
    // to initiate the password reset process.
  };

  return (
    <div className="forgot-container">
      {/* Left side container with an image */}
      <div className="left-side">
        <img src={ForgotPasswordImage} alt="ForgotPasswordImage" />
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
          <div className="header">
            <h3>Forgot Password?</h3>
            <p>No Worries we’ll send you reset instructions</p>
          </div>

          {/* Email input field section */}
          <div className="email-input">
            <label htmlFor="Email">
              Email
              <span className="required-symbole">*</span>
            </label>
            <div className="emailAndicon">
              <span className="material-symbols-outlined">mail</span>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={validateEmail}
              />
             
            </div>
            
            <p className="error-message">{emailError ? emailError : ""}</p>
          </div>

          {/* Reset password button */}
          <div className="resetpassword">
            <button onClick={handleResetPassword}>Reset Password</button>
          </div>

          {/* Back link to go back */}
          <div className="back">
            <span className="material-symbols-outlined">
              keyboard_backspace
            </span>
            <p>Go back</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
