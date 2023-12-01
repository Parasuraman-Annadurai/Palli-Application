/* change the jsx and css to ChangePassword */

import React, { useState } from "react";
import Logo from "/images/dckap_palli_logo_lg.svg";
import ResetPasswordImage from "/images/change_password.svg";
import "./ResetPage.css";
import { validateNewpassword } from "../../utils/validate";
import { checkPasswordCriteria } from "../../components/PasswordRequirement";
import { Input, Popover } from "antd";



const ResetPasswordPage = () => {
  const [passwordError, setPasswordError] = useState({});
  const [passwordCriteria,setpasswordCriteria] = useState(null);
  const [popoverShow,setPopovershow] = useState(false);
  /* keep two states for the below  */
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
    /* keep two states for the below  */

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  /* change this functin to handleCHange*/
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });
    if(passwordError[name]) delete passwordError[name];
  };


  /* remove this and keep seperate state */
  /* dont write seperate handler for this just set state in onclick itself*/
  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleNewpassword =(e)=>{
    handleInputs(e);
    const {value} = e.target;
    checkPasswordCriteria(value,setpasswordCriteria)
  }

  /*Remove this focus functin */

  const handleFocus =()=>{
    setPopovershow(true); 
    /* check this on change fucntion */
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
    <div className="reset-password-wrapper">
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
                  {/* This Code works with using state for focus change like this */}
                  <Popover
                    content={passwordCriteria}
                    title="Title"
                    trigger="focus"
                  >
                    <Input />
                  </Popover>
                  {/*     
              <Popover content={passwordCriteria} trigger={"click"} placement="right" open={popoverShow}>
              <Input
                type={showPassword.newPassword ? "text" : "password"}
                id="Password"
                name="newPassword"
                placeholder="Input password"
                className="input-field"
                value={newPassword.newPassword}
                onChange={handleNewpassword}
                onBlur={()=>setPopovershow(false)}
                // onFocus={handleFocus}
              />
              </Popover> */}
                  <span
                    id="eye--off"
                    className="material-symbols-outlined"
                    onClick={() => togglePasswordVisibility("newPassword")}
                  >
                    {showPassword.newPassword ? "visibility" : "visibility_off"}
                  </span>
                </div>
                <p className="error-message">
                  {passwordError.newPassword ? passwordError.newPassword : ""}
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
    </div>
  );
};

export default ResetPasswordPage;





