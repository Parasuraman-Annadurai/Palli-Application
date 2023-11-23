import React, { useState } from "react";
import Logo from "../../../public/images/dckap_palli_logo_lg.png";
import ResetPasswordImage from "/images/change_password.svg";
import "./ResetPage.css";
import { validateNewpassword } from "../../utils/validate";
import { checkPasswordCriteria } from "../../components/PasswordRequirement";
import { Popover } from "antd";



const ResetPasswordPage = () => {
  const [passwordError, setPasswordError] = useState({});
  const [passwordCriteria,setpasswordCriteria] = useState(null);
  const [popoverShow,setPopovershow] = useState(false);
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
    const {value} = e.target;
    checkPasswordCriteria(value,setpasswordCriteria)
  }
  const handleFocus =()=>{
    setPopovershow(true);
    checkPasswordCriteria(newPassword.newPassword,setpasswordCriteria)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let validateField = validateNewpassword(newPassword,setPasswordError)
    if(validateField){
      //make api call
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
    
              <Popover content={passwordCriteria} trigger={"focus"} placement="right" open={popoverShow}>
              <input
                type={showPassword.newPassword ? "text" : "password"}
                id="Password"
                name="newPassword"
                placeholder="Input password"
                className="input-field"
                value={newPassword.newPassword}
                onChange={handleNewpassword}
                onBlur={()=>setPopovershow(false)}
                onFocus={handleFocus}
              />
              </Popover>
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

export default ResetPasswordPage;





