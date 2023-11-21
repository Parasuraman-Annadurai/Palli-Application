import React, { useState } from "react";
import Logo from "../../assests/images/DckapPalliLogo.png";
import ResetPasswordImage from "../../assests/images/Change_password_image.svg";
import "./ResetPage.css";
import { validateNewpassword } from "../../utils/validate";

const ChangePassword = () => {
  const [passwordError, setPasswordError] = useState({});
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });
    if(passwordError[name]) delete passwordError[name];
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };
  const handleNewpassword =(e)=>{
    handleInputs(e);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let validateField = validateNewpassword(newPassword,setPasswordError)
    if(validateField){
      alert("okay");
    }

  
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
                onChange={handleNewpassword}
              />
              <span
                id="eye--off"
                className="material-symbols-outlined"
                onClick={()=>togglePasswordVisibility("newPassword")}
              >
                {showPassword.newPassword ? "visibility" : "visibility_off"}
              </span>
            </div>
            <p className="error-message">
              {passwordError.newPassword
                ? passwordError.newPassword
                : ""}
            </p>
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
                name="confirmPassword"
                className="material-symbols-outlined"
                onClick={()=>togglePasswordVisibility("confirmPassword")}
              >
                {showPassword.confirmPassword? "visibility": "visibility_off"}
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





