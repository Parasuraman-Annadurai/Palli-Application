//Remove this file
import { useState } from "react";
import "../../../src/assests/CSS/loginPage.css"
import useAuth from "../../context/AuthContext";
import { SampleNavBar } from "../../layouts/SampleNavBar";
import axios from "axios";
import UserService from "../../services/UserService";
import palliLogo from "../../../src/assests/images/dckap-palli-tamil-logo-1 1.png"
import loginLogo from "../../../src/assests/images/Seminar-bro 1.png";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { isEmailValid, isPasswordValid } from "../../utils/loginPageValidation";
import { Input } from "antd";
import PasswordRequirements from "../../components/PasswordRequirement";
import { SampleButton } from "../../components/SampleButton";
const LoginScreen = () => {
  //while typing the password show password check list to user
  const [showPasswordCheckList,setshowPasswordCheckList] = useState(false);

  //this state collect the user details 
  const [loginUserData, setloginUserData] = useState({
    email: "",
    password: "",
  });

  //user give wrong value then show error message 
  const [error, setError] = useState({});

  
  //handlechange used to set user email and password in logindata state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginUserData({ ...loginUserData, [name]: value });
    if (error[name]) delete error[name];
  };

  //this validate function used to user give the email and password vaild or not
  const validate = (loginUserData) => {
    let errors = {};
    let isVaild = true;

    if (isEmailValid(loginUserData.email)) {
      errors.email = isEmailValid(loginUserData.email);
      isVaild = false;
    }
    if (isPasswordValid(loginUserData.password)) {
      errors.password = isPasswordValid(loginUserData.password);
      isVaild = false;
    }

    setError(errors);
    return isVaild;
  };

  //after validate the user email and password and check user already exits or not
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validate(loginUserData)) {
      //after post user data the backend show the cross error
      axios.post("http://127.0.0.1:8000/api/accounts/login/",loginUserData).then(res=>{
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
                  <span className="material-symbols-outlined email-sybmbol">
                    mail
                  </span>
                  <Input
                    placeholder="Enter the Email Id"
                    value={loginUserData.email}
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
                  <span className="material-symbols-outlined password-sybmbol">
                    lock
                  </span>
                  <Input.Password
                    placeholder="Enter password"
                    className="password-feild"
                    name="password"
                    value={loginUserData.password}
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
                <PasswordRequirements  password={loginUserData.password}/>
              </div>
              <a href="">Forgot password ?</a>
              <div className="login-btn-container ">

                {/* separate sample button components */}
                <SampleButton  buttonText={"login"}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
