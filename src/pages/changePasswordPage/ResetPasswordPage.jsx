import React, { useState } from "react";
//External packages here

import { Popover } from "antd";
import { notification } from "antd";
//Supporting utilities files here
import { validateNewpassword } from "../../utils/validate";
import { checkPasswordCriteria } from "../../components/PasswordRequirement";

//Images here
import Logo from "/images/dckap_palli_logo_lg.svg";
import ResetPasswordImage from "/images/change_password.svg";
import axios from "axios";
import { API_END_POINT } from "../../../config";

const ResetPasswordPage = () => {
  const [passwordError, setPasswordError] = useState({});
  const [passwordCriteria,setpasswordCriteria] = useState(null);
  const [popoverShow,setPopovershow] = useState(false);
  const [newPassword, setNewPassword] = useState({
    newPassword: "Parasuapt@2002",
    confirmPassword: "Parasuapt@2002",
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const token_verification = `token=gAAAAABlZhkJh-dZrmxq__iyn2KxSoUmRz0CNzu2XrpI7gLwX4yL8ew7_fv4qtjTrVXSGUXrMQNlBNeUVDWKWFYGocPePLZ3tPQrW5JghvOQB_F9Y7DkMhnfGnQ_DIr9Ir-N5C6beJ-NJsXtZ7JYZJL9Z5gQq3M6hN54YvdygS4GINLutIWabf9llRWWa2Vvk1KPHOWBB3mj`;


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
      const headers = {
        "Content-type" : "application/json"
      }
      axios.post(`${API_END_POINT}/api/accounts/change/password?token=gAAAAABlZhkJh-dZrmxq__iyn2KxSoUmRz0CNzu2XrpI7gLwX4yL8ew7_fv4qtjTrVXSGUXrMQNlBNeUVDWKWFYGocPePLZ3tPQrW5JghvOQB_F9Y7DkMhnfGnQ_DIr9Ir-N5C6beJ-NJsXtZ7JYZJL9Z5gQq3M6hN54YvdygS4GINLutIWabf9llRWWa2Vvk1KPHOWBB3mj`,{password:newPassword.confirmPassword},{headers}).then((res)=>{
        // console.log(res);
      }).catch((error)=>{
        if (error.response && error.response.status === 400) {
          notification.error({
            message: "Link Used",
            description: `The link has used. Please request a new one.`,
            duration: 2,
          });
        // Handle the error or take necessary actions
      } else {
       
      }
      })
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
    </div>
  );
};

export default ResetPasswordPage;





