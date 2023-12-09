import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import axios from "axios";

import { isEmailValid, isPasswordValid } from "../../utils/validate";

import { useAuth } from "../../context/AuthContext";

import { API_END_POINT } from "../../../config";

import dckapPalliLogo from "/images/dckap_palli_logo_lg.svg";
import managerLoginLogo from "/images/manager_login_image.svg";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
      email:"testui@gmail.com",
      password:"Front-end@123"
    }
  });

  //Handle login submit used to validate feild and check creadentials
  const handleLoginSubmit = (formData) => {
    axios
      .post(`${API_END_POINT}/api/accounts/login/`, formData)
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
            <img src={dckapPalliLogo} alt="dckap-logo" />
          </div>
        </div>
        <div className="input__containers">
          <div className="left__side__image__container">
            <img src={managerLoginLogo} alt="manager-logo" />
          </div>
          <div className="right__side-input__container">
            <form
              onSubmit={handleSubmit(handleLoginSubmit)}
              className="login-form"
            >
              <div className={`email__inputs`}>
                <label htmlFor={"email"}>
                  email <span className="required-feild">*</span>
                </label>
                <div className={`email__icon`}>
                  <span className={`material-symbols-outlined email-sybmbol`}>
                    email
                  </span>
                  <div className="input__component">
                    <input
                      type={"text"}
                      placeholder={`Enter the Email Id`}
                      name={"email"}
                      className={`email__feild`}
                      {...register("email", {
                        required: "Email is required",
                        validate: isEmailValid,
                      })}
                    />
                  </div>
                </div>
                <p className="error__message">
                  {errors.email ? errors.email.message : ""}
                </p>
              </div>

              <div className={`password__inputs`}>
                <label htmlFor={"password"}>
                  Password <span className="required-feild">*</span>
                </label>
                <div className={`password__icon`}>
                  <span
                    className={`material-symbols-outlined password-sybmbol`}
                  >
                    Password
                  </span>
                  <div className="input__component">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={`Enter the password`}
                      name={"password"}
                      className={`password__feild`}
                      {...register("password", {
                        required: "Password is required",
                        validate: isPasswordValid,
                      })}
                    />
                  </div>
                </div>
                <p className="error__message">
                  {errors.password ? errors.password.message : ""}
                </p>
              </div>

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
