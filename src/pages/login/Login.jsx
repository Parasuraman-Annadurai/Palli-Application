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
//paste custom hook here
import useForm from "../../hooks/useForm";
//API endpoint paste here
import { API_END_POINT } from "../../../config";
//images paste here
import dckapPalliLogon from "/images/dckap_palli_logo_lg.svg";
import managerLoginLogo from "/images/manager_login_image.svg";
//css paste here
import "./Login.css"

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const loginUserData = {
    email: "testui@gmail.com",
    password: "Front-end@123",
  }
  const { formData, errors, setErrors, handleChange} = useForm(loginUserData);

  //Handle login submit used to validate feild and check creadentials
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const isVaild = validate(formData, setErrors);
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
                value={formData.email}
                onChange={handleChange}
                error={errors.email ? errors.email : ""}
              />
              <Input
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
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
