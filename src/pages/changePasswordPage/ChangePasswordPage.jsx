import React, { useState } from "react";
//External packages here
import { Popover } from "antd";
//Supporting utilities files here
import { validateNewpassword } from "../../utils/validate";
import { checkPasswordCriteria } from "../../components/PasswordRequirement";

//CSS here
import "./scss/ChangePasswordPage.css";
const ResetPasswordPage = () => {
  const [passwordError, setPasswordError] = useState({});
  const [passwordCriteria, setpasswordCriteria] = useState(null);
  const [popoverShow, setPopovershow] = useState(false);
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
    if (passwordError[name]) delete passwordError[name];
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };
  const handleNewpassword = (e) => {
    handleInputs(e);
    const { value } = e.target;
    checkPasswordCriteria(value, setpasswordCriteria);
  };
  const handleFocus = () => {
    setPopovershow(true);
    checkPasswordCriteria(newPassword.newPassword, setpasswordCriteria);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let validateField = validateNewpassword(newPassword, setPasswordError);
    if (validateField) {
      //make api call
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
              <h3>
                Change Your <br /> Password.?
              </h3>
              <p>
                Your password must be at least 8 characters long <br /> Avoid
                common words or patterns.
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
                    content={passwordCriteria}
                    trigger={"focus"}
                    placement="right"
                    open={popoverShow}
                  >
                    <input
                      type={showPassword.newPassword ? "text" : "password"}
                      id="Password"
                      name="newPassword"
                      placeholder="Input Password"
                      className="input-field"
                      value={newPassword.newPassword}
                      onChange={handleNewpassword}
                      onBlur={() => setPopovershow(false)}
                      onFocus={handleFocus}
                    />
                  </Popover>
                  <span
                    id="eye--off"
                    className="material-symbols-outlined eye-icon"
                    onClick={() => togglePasswordVisibility("newPassword")}
                  >
                    {showPassword.newPassword ? "visibility" : "visibility_off"}
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
                    type={showPassword.confirmPassword ? "text" : "password"}
                    id="ConfirmPassword"
                    name="confirmPassword"
                    className="input-field"
                    placeholder="Input Password"
                    value={newPassword.confirmPassword}
                    onChange={handleInputs}
                  />
                  <span
                    id="eye--on"
                    name="confirmPassword"
                    className="material-symbols-outlined eye-icon"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    {showPassword.confirmPassword
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

export default ResetPasswordPage;
