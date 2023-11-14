//Remove this file
import { useState } from "react";
import "../../../src/assests/CSS/loginPage.css"
import useAuth from "../../context/AuthContext";
import { SampleNavBar } from "../../layouts/SampleNavBar";
import axios from "axios";
import UserService from "../../services/UserService";
import palliLogo from "../../../src/assests/images/dckap-palli-tamil-logo-1 1.png"
import loginLogo from "../../../src/assests/images/Student stress-cuate 1.png";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { isEmailValid, isPasswordValid } from "../../utils/loginPageValidation";
import { Input } from "antd";
import PasswordRequirements from "./PasswordRequirement";

const LoginScreen = () => {
  //while typing the password show password check list to user
  const [showPasswordCheckList,setshowPasswordCheckList] = useState(false);

  //this state collect the user details 
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  //user give wrong value then show error message 
  const [error, setError] = useState({});

  
  //handlechange used to set user email and password in logindata state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    if (error[name]) delete error[name];
  };

  //this validate function used to user give the email and password vaild or not
  const validate = (loginData) => {
    let errors = {};
    let isVaild = true;

    if (isEmailValid(loginData.email)) {
      errors.email = isEmailValid(loginData.email);
      isVaild = false;
    }
    if (isPasswordValid(loginData.password)) {
      errors.password = isPasswordValid(loginData.password);
      isVaild = false;
    }

    setError(errors);
    return isVaild;
  };

  //after validate the user email and password and check user already exits or not
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validate(loginData)) {
      //after post user data the backend show the cross error
      axios.post("http://127.0.0.1:8000/api/accounts/login/",loginData).then(res=>{
        console.log(res);
      })
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="top-header">
          <div className="left-side-header">
            <h2>Manager Login</h2>
            <p>Make Sure Your Account is Secure</p>
          </div>
          <div className="right-side-header">
            <img src={palliLogo} alt="" />
          </div>
        </div>
        <div className="input-containers">
          <div className="left-side-image-container">
            <img src={loginLogo} alt="" />
          </div>
          <div className="right-side-input-container">
            <form action="" onSubmit={handleLoginSubmit} className="login-form">
              <div className="email-inputs">
                <label htmlFor="">Email Id</label>
                <div className="email-icon">
                  <span class="material-symbols-outlined email-sybmbol">
                    mail
                  </span>
                  <Input
                    placeholder="Basic usage"
                    value={loginData.email}
                    name="email"
                    onChange={handleChange}
                    className="email-feild"
                  />
                </div>
                <p className="error-message">
                  {error.email ? error.email : ""}
                </p>
              </div>

              <div className="password-inputs">
                <label htmlFor="">Password</label>
                <div className="password-icon">
                  <span class="material-symbols-outlined password-sybmbol">
                    lock
                  </span>
                  <Input.Password
                    placeholder="input password"
                    className="password-feild"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    onFocus={()=>setshowPasswordCheckList(true)}
                    onBlur={()=>setshowPasswordCheckList(false)}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </div>
                <p className="error-message">
                  {error.password ? error.password : ""}
                </p>
              </div>
              <div className="requirements-list" style={{display : showPasswordCheckList ? "block" :"none" }}>
                {/* this is the password check list component */}
                <PasswordRequirements  password={loginData.password}/>
              </div>
              <a href="">Forgot password ?</a>
              <div className="login-btn-container">
                <button className="login-btn">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
