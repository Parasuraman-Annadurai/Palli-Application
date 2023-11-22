import React, { useState } from "react";
import "./LoginScreen.css";
import { Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { validate } from "../../utils/validate";
import { Button } from "../../components/Button";
import {
  checkPasswordCriteria,
  passwordRequirements,
} from "../../components/PasswordRequirement";
import UserService from "../../services/UserService";
import DckapPalliLogo from "/images/dckap_palli_logo_lg.png";
import ManagerLoginLogo from "/images/manager_login_logo.png";
import Input from "../../components/Input";


import { useAuth } from "../../context/AuthContext";

const LoginScreen = () => {
  const navigate = useNavigate();

  const {setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [passwordCriteria, setpasswordCriteria] = useState(null);

  const [loginUserData, setloginUserData] = useState({
    email: "testui@gmail.com",
    password: "admin@123",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginUserData({ ...loginUserData, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  //handle the password changes
  const handlePasswordChange = (e) => {
    handleChange(e);
    const {value:password} = e.target
    //call checkPasswordCriteria the function beacuse show password checklist
    checkPasswordCriteria(password, setpasswordCriteria);
  };
  
  const handleFocus = () => {
    setPopoverVisible(true);
    //onfocus call checkPasswordCriteria the function beacuse show password checklist
    checkPasswordCriteria(loginUserData.password, setpasswordCriteria);
  };
  const handleBlur = () => setPopoverVisible(false);
  //Handle login submit used to validate feild and check creadentials
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // const isValid = validate(loginUserData, setErrors);

    // if (isValid) {
      try {
        const response = await UserService.authedicateUser(loginUserData);
        if (Object.keys(response.data).length > 0) {
          setUser(response)
          navigate(`/batch/${1}/applications`);
        }
      } catch (error) {
        console.error("Authentication Failed", error);
        navigate("/login");
      }
    }
  // };

  return (
    <div className="login__container">
      <div className="top__header">
        <div className="left__side__header">
          <h2>Manager Login</h2>
          <p>Make Sure Your Account is Secure</p>
        </div>
        <div className="right__side--header">
          <img src={DckapPalliLogo} alt="" />
        </div>
      </div>
      <div className="input__containers">
        <div className="left__side__image__container">
          <img src={ManagerLoginLogo} alt="" />
        </div>
        <div className="right__side-input__container">
          <form onSubmit={handleLoginSubmit} className="login-form">
            <Input
              label="Email Id"
              name="email"
              type="text"
              value={loginUserData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email || ""}
            />
            <Popover
              content={passwordCriteria}
              placement="left"
              open={popoverVisible}
            >
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={loginUserData.password}
                onChange={handlePasswordChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                error={errors.password || ""}
              />
            </Popover>
            <span
                onClick={() => setShowPassword(!showPassword)}
                className="material-symbols-outlined eye__icon"
              >
                {showPassword ? "visibility" : "visibility_off"}
              </span>

            <a href="/forgot/password">Forgot password ?</a>
            <div className="login__btn__container">
              <Button buttonText={"login"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
