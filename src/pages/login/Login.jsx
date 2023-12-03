import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//external packages paste here
import axios from "axios";
//our component paste here
import Input from "../../components/Input";
//suporting utilits 
import { validate } from "../../utils/validate";
// context paste here
import { useAuth } from "../../context/AuthContext";
//API endpoint paste here
import { API_END_POINT } from "../../../config";
//images paste here
import dckapPalliLogon from "/images/dckap_palli_logo_lg.svg";
import managerLoginLogo from "/images/manager_login_image.svg";
//css paste here
import "./Login.css"

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUser, user, token } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginUserData, setloginUserData] = useState({
    email: "testui@gmail.com",
    password: "Front-end@123",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginUserData({ ...loginUserData, [name]: value });
    if (errors[name]) {
      delete errors[name];
    }
  };

  //Handle login submit used to validate feild and check creadentials
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const isVaild = validate(loginUserData, setErrors);
    if (isVaild) {
      axios
        .post(`${API_END_POINT}/api/accounts/login/`, loginUserData)
        .then((res) => {
          axios({
            url: `${API_END_POINT}/api/accounts/get/user_info/`,
            method: "GET",
            headers: {
              Authorization: `Bearer ${res.data.data.access}`,
            },
          })
            .then((userData) => {
              localStorage.setItem("token", JSON.stringify(res.data.data));
              localStorage.setItem("user", JSON.stringify(userData.data.data));
              setToken(res.data.data);
              setUser(userData.data.data);
              navigate("/dashboard");
            })
            .catch((err) => {
              console.error("userData fetch Failed", err);
            });
        })
        .catch((err) => {
          console.error("Authentication Failed", err);
          navigate("/login");
        });
    }
  };

  return (
    <div className="login__container_wrapper">
      <div className="login__container">
        <div className="top__header">
          <div className="left__side__header">
            <h2>Manager Login</h2>
            <p>Make Sure Your Account is Secure</p>
          </div>
          <div className="right__side--header">
            <img src={dckapPalliLogon} alt="dckap-logo" />
          </div>
        </div>
        <div className="input__containers">
          <div className="left__side__image__container">
            <img src={managerLoginLogo} alt="manager-logo" />
          </div>
          <div className="right__side-input__container">
            <form onSubmit={handleLoginSubmit} className="login-form">
              <Input
                label="Email Id"
                name="email"
                type="text"
                value={loginUserData.email}
                onChange={handleChange}
                error={errors.email ? email.email : ""}
              />
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={loginUserData.password}
                onChange={handleChange}
                error={errors.password ? errors.password : ""}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="material-symbols-outlined eye__icon"
              >
                {showPassword ? "visibility" : "visibility_off"}
              </span>

              <a href="/forgot/password">Forgot password ?</a>
              <div className="login__btn__container">
                <button className="login-btn">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
