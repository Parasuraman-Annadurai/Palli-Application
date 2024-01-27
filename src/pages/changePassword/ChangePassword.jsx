import React, { useState, useEffect } from "react";

//External packages here
import { useLocation, useNavigate } from "react-router-dom";
import { Popover,notification } from "antd";
import axios from "axios";

//Supporting utilities files here
import { validateNewpassword } from "../../utils/validate";
import { API_END_POINT } from "../../../config";
import GetPasswordPopover from "../../components/PasswordRequirement/PasswordRequirement";

//CSS here
import "./scss/ChangePassword.css";

const ChangePassword = () => {

  const location = useLocation();
  const navigate = useNavigate()

  const [verificationToken,setVerificationToken] = useState("")
  const [popoverShow, setPopovershow] = useState(false);

  // State for newPassword and confirmPassword separately
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)

  const [passwordError, setPasswordError] = useState({});


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

   if(token){
    axios.get(`${API_END_POINT}/api/accounts/password/token_verification/?token=${token}`).then((res)=>{
      if(res.data.data.is_valid){
        setVerificationToken(token);
      }
    }).catch((error)=>{
      if(error.response && error.response.data.status === 400){
        notification.error({
          message: "Error",
          description: `${error.response.data.message}`,
        })
        navigate("/login")
      }
      
    })
   }
  }, [location.search]);



  const handleInputs = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
    if (passwordError[name]){
      delete passwordError[name];
    }
  };

  const handleNewPassword = (e) => {
    handleInputs(e);
    setPopovershow(true);
  };
  const handleFocus = () => {
    setPopovershow(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validateField = validateNewpassword(
      { newPassword, confirmPassword },
      setPasswordError
    );

    if (validateField) {

      const headers = {
        "Content-type": "application/json",
      };
      if(verificationToken){
        axios.post(`${API_END_POINT}/api/accounts/change/password?token=${verificationToken}`,{password:confirmPassword},{headers}).then((res)=>{
          notification.success({
            message : "Success",
            description : `${res.data.message}`,
            duration:2
          });
          navigate("/login")
        }).catch((error)=>{
          if (error.response && error.response.status === 400) {
            notification.error({
              message: "Link Used",
              description: `The link has expired Please request a new one`,
              duration: 2,
            });
          
          } 
        })
      }
    }

  };

  const handlePasswordVisiblity = (name,toggleValue) => {
    if (name === "newPassword") {
      setShowNewPassword(toggleValue);
    } else {
      setShowConfirmPassword(toggleValue);
    }
  };
  
  return (
    <div className="reset-password-container">
      <div className="reset-container">
        <a href="/">
          <div className="logo">
            <img src="/images/dckap_palli_logo_sm.svg" alt="Logo" />
          </div>
        </a>
        <div className="content-wrapper flex">
          <div className="input-container">
            <div className="headings">
              <a className="back" href="/">
                <span>
                  <img src="/icons/backIcon.svg" alt="" />
                </span>
                <span className="backtologin">Back to login</span>
              </a>
              <h3>
                Change Your <br /> Password.?
              </h3>
              <p>
                Your password must be at least 8 characters long. Avoid common
                words or patterns.
              </p>
            </div>
            <div className="inputs">
              <div className="rest-password-input">
                <div className="input-eye-icon">
                  <label htmlFor="Password" className="password">
                    New Password
                    <span className="required-symbole">*</span>
                  </label>
                  <Popover
                    className="popover"
                    // content={passwordCriteria.error ? passwordCriteria.content : null}
                    // trigger={"focus"}

                    placement="right"
                    trigger={["click"]}
                    open={popoverShow}
                    content={<GetPasswordPopover password={newPassword} />}
                  >
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="Password"
                      name="newPassword"
                      placeholder="Input Password"
                      className={`input-field ${
                        passwordError.newPassword ? "error-notify " : ""
                      }`}
                      value={newPassword.newPassword}
                      onChange={handleNewPassword}
                      onFocus={handleFocus}
                      onBlur={() => setPopovershow(false)}
                    />
                  </Popover>
                  <span
                    id="eye--off"
                    className="material-symbols-outlined eye-icon"
                    onMouseDown={() => handlePasswordVisiblity("newPassword",true)}
                    onMouseUp={() => handlePasswordVisiblity("newPassword",false)}
                    onMouseLeave={() => handlePasswordVisiblity("newPassword",false)}
                  >
                    {showNewPassword.newPassword
                      ? "visibility"
                      : "visibility_off"}
                  </span>
                  <p className="error-message">
                    {passwordError.newPassword ? passwordError.newPassword : ""}
                  </p>
                </div>

                <div className="input-eye-icon">
                  <label htmlFor="Password" className="password confirm">
                    Confirm New Password
                    <span className="required-symbole">*</span>
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="ConfirmPassword"
                    name="confirmPassword"
                    className={`input-field ${
                      passwordError.confirmPassword ? "error-notify " : ""
                    }`}
                    placeholder="Input Password"
                    value={newPassword.confirmPassword}
                    onChange={handleInputs}
                  />
                  <span
                    id="eye--on"
                    name="confirmPassword"
                    className="material-symbols-outlined eye-icon"
                    onMouseDown={() =>
                      handlePasswordVisiblity("confirmPassword",true)
                    }
                    onMouseUp={() => handlePasswordVisiblity("confirmPassword",false)}
                    onMouseLeave={() =>
                      handlePasswordVisiblity("confirmPassword",false)
                    }
                  >
                    {showNewPassword.confirmPassword
                      ? "visibility"
                      : "visibility_off"}
                  </span>
                  <p className="error-message">
                    {passwordError.confirmPassword
                      ? passwordError.confirmPassword
                      : ""}
                  </p>
                </div>
              </div>
              <div className="reset-password">
                <button
                  type="submit"
                  className="reset-sbmt-btn"
                  onClick={handleSubmit}
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
          <div className="resetImage">
            <img src="/images/change_password1.svg" alt="ResetPasswordImage" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
