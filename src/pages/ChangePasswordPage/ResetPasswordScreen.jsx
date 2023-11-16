import React, { useState } from "react";
import Logo from "/src/assets/images/logo.png";
import ResetPasswordImage from "/src/assets/images/RestPageImage.png";
import "../ChangePasswordPage/ResetPage.css";

const ChangePassword = () => {
  const [passwordError, setPasswordError] = useState({});

  const [newPassword, setnewPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setnewPassword({ ...newPassword, [name]: value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePassword(newPassword)) {
      alert("okay");
    }
  };

  const validatePassword = (newPassword) => {
    let isValid = true;
    let error = {};

    if (newPassword.newPassword !== newPassword.confirmPassword) {
      error["confirmPassword"] =
        "New password and confirm password do not match";
      isValid = false;
    }
    setPasswordError(error);
    return isValid;
  };

  return (
    <div className="reset-container">
      <div className="left-side-container">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="heding">
          <div className="headings">
            <h3>
              Change Your <br /> Password.?
            </h3>
            <p>
              Your password must be at least 8 characters long <br /> Avoid
              common words or patterns.
            </p>
          </div>
          <div className="input-container">
            <div className="rest-password-input">
              <label htmlFor="Password">
                New Password
                <span className="required-symbole">*</span>
              </label>
              <div className="input--eye--icon">
                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  id="Password"
                  name="newPassword"
                  placeholder="Input password"
                  className="input-field"
                  value={newPassword.newPassword}
                  onChange={handleInputs}
                />
                <span
                  id="eye--off"
                  className="material-symbols-outlined"
                  onClick={() => togglePasswordVisibility("newPassword")}
                >
                  {showPassword.newPassword ? "visibility" : "visibility_off"}
                </span>
              </div>

              <div className="input--eye--icon">
                <label htmlFor="Password">
                  Confirm New Password
                  <span className="required-symbole">*</span>
                </label>
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  id="ConfirmPassword"
                  name="confirmPassword"
                  className="input-field"
                  placeholder="Input password"
                  value={newPassword.confirmPassword}
                  onChange={handleInputs}
                />
                <span
                  id="eye--on"
                  className="material-symbols-outlined"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showPassword.confirmPassword
                    ? "visibility"
                    : "visibility_off"}
                </span>
              </div>
            </div>
            <div className="reset-password">
              <p className="error-message">
                {passwordError.confirmPassword
                  ? passwordError.confirmPassword
                  : ""}
              </p>

              <button type="submit" onClick={handleSubmit}>
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="resetImage">
          <img src={ResetPasswordImage} alt="ResetPasswordImage" />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

