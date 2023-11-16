//Remove this file
import { useState } from "react";
import React from "react";
import "./LoginScreen.css";
import useAuth from "../../context/AuthContext";
import DckapPalliLogo from "../../../src/assests/images/DckapPalliLogo.png";
import ManagerLoginLogo from "../../../src/assests/images/ManagerLoginLogo.png";
import { validate } from "../../utils/validate";
import { Button } from "../../components/Button";
import { notification, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import {checkPasswordCriteria} from "../../components/PasswordRequirement";
import { makeNetworkRequest } from "../../utils/makeNetworkRequest";
import { API_END_POINT } from "../../../config";
const LoginScreen = () => {
  const navigate = useNavigate();

  //hide and show password
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCriteria, setpasswordCriteria] = useState(null);
  //this state collect the user details
  const [loginUserData, setloginUserData] = useState({
    email: "testui@gmail.com",
    password: "admin@123",
  });

  //user give wrong value then show erros message
  const [erros, seterros] = useState({});

  //handlechange used to set user email and password in logindata state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginUserData({ ...loginUserData, [name]: value });
    if (erros[name]) delete erros[name];
    if(name === "password"){checkPasswordCriteria(value,setpasswordCriteria)}
  };

  //after validate the user email and password and check user already exits or not
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    let isVaild = validate(loginUserData, seterros);
    if (isVaild) {
      let endPoint = `${API_END_POINT}/api/accounts/login/`
      makeNetworkRequest(endPoint,"POST",loginUserData);
    }
   
  };

  return (
    <div>
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
            <form action="" onSubmit={handleLoginSubmit} className="login-form">
              <div className="email__inputs">
                <label htmlFor="">
                  Email Id <span className="required-feild">*</span>
                </label>
                <div className="email__icon">
                  <span className="material-symbols-outlined email-sybmbol">
                    mail
                  </span>
                  <div className="input__component">
                    <input
                      placeholder="Enter the Email Id"
                      value={loginUserData.email}
                      name="email"
                      onChange={handleChange}
                      className="email__feild"
                    />
                  </div>
                </div>
                <p className="error__message">
                  {erros.email ? erros.email : ""}
                </p>
              </div>

              <div className="password__inputs">
                <label htmlFor="">
                  Password <span className="required__feild">*</span>
                </label>
                <div className="password__icon">
                  <span className="material-symbols-outlined password-sybmbol">
                    lock
                  </span>

                  <div className="input__component">
                    <Popover
                      content={passwordCriteria}
                      placement="leftBottom"
                      trigger={"focus"} 
                    >
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="password__feild"
                        name="password"
                        value={loginUserData.password}
                        onChange={handleChange}
                      />
                    </Popover>

                    {
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="material-symbols-outlined eye__icon"
                      >
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    }
                  </div>
                </div>
                <p className="error__message">
                  {erros.password ? erros.password : ""}
                </p>
              </div>
              <a href="/forgot/password">Forgot password ?</a>
              <div className="login__btn__container">
                {/* separate sample button components */}
                <Button buttonText={"login"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
