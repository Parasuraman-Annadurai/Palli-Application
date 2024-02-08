import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useForm } from "react-hook-form";

import { LoadingOutlined } from "@ant-design/icons";

import { notification } from "antd";

import { useAuth } from "../../context/AuthContext";

import { isEmailValid, isPasswordValid } from "../../utils/validate";

import { API_END_POINT } from "../../../config";

import "./scss/Login.css";
const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "parasu@gmail.com",
      password: "Dckap@123",
    },
  });
  const handleLogin = (loginData) => {
    axios
      .post(`${API_END_POINT}/api/accounts/login/`, loginData)
      .then((res) => {
        setLoading(true);
        axios({
          url: `${API_END_POINT}/api/accounts/get/user_info/`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${res.data.data.access}`,
          },
        })
          .then((userData) => {
            localStorage.setItem("token", JSON.stringify(res.data.data));
            setToken(res.data.data);

           

            const formattedPermissions = {};
            // Iterate through the permissions data and populate the object dynamically
            userData.data.data.permissions.forEach(permission => {
              const { module_name, access_level } = permission;
              if (!formattedPermissions[module_name]) {
                // If the key doesn't exist yet, initialize it with an array containing the access level
                formattedPermissions[module_name] = [access_level];
              } else {
                // If the key already exists, push the access level to the existing array
                formattedPermissions[module_name].push(access_level);
              }
            });

            const formattedUserData ={
              ...userData.data.data,
              permissions : formattedPermissions
            }
            localStorage.setItem("user", JSON.stringify(formattedUserData));

            setUser(formattedUserData);

            setLoading(false);

            if (formattedUserData.role === "Student") {
              navigate("/batch/253/task");
            } else {
              navigate("/batch/253/applications");
            }

            console.log(formattedUserData);

          })
          .catch((err) => {
            console.error("userData fetch Failed", err);
          });
      })
      .catch((err) => {
        notification.error({
          message: "Unauthorized",
          description: `Credentials not found `,
          duration: 3,
        });
        navigate("/login");
      });
  };
  const handleEyeIconLongPress = (field) => {
    setShowPassword((prevState) => ({ ...prevState, [field]: true }));
  };

  const handleEyeIconEndPress = (field) => {
    setShowPassword((prevState) => ({ ...prevState, [field]: false }));
  };
  return (
    <>
      <div className="container">
        <main className="login-page-container">
          <div className="logo-container">
            <img
              className="logo"
              src="/images/dckap_palli_logo_sm.svg"
              alt=""
              draggable={false}
            />
          </div>
          <div className="login-container flex">
            <div className="login-image-container">
              <img src="/icons/Login Image.svg" alt="" draggable={false} />
            </div>
            <div className="login-form-container">
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="form-heading">
                  <h1>Welcome Back 👋</h1>
                  <p>Please Login to your account</p>
                </div>
                <div className="email-container flex">
                  <label htmlFor="">Email id</label>
                  <input
                    type="text"
                    className={`email-input ${
                      errors.email ? "error-notify" : ""
                    }`}
                    name="email"
                    placeholder="Type here..."
                    {...register("email", {
                      required: "Required field cannot be empty",
                      validate: isEmailValid,
                    })}
                  />
                  <p className="error-message">
                    {errors.email ? errors.email.message : ""}
                  </p>
                </div>
                <div className="password-container">
                  <label htmlFor="">Password</label>
                  <div className="password-field">
                    <input
                      type={`${showPassword.password ? "text" : "password"}`}
                      className={`password-input ${
                        errors.password ? "error-notify" : ""
                      }`}
                      name="password"
                      placeholder="Type here..."
                      {...register("password", {
                        required: "Required field cannot be empty",
                        validate: isPasswordValid,
                      })}
                    />
                    <span
                      id="eye--on"
                      className="material-symbols-outlined eye-icon"
                      onTouchStart={() => handleEyeIconLongPress("password")}
                      onTouchEnd={() => handleEyeIconEndPress("password")}
                      onMouseDown={() => handleEyeIconLongPress("password")}
                      onMouseUp={() => handleEyeIconEndPress("password")}
                      onMouseLeave={() => handleEyeIconEndPress("password")}
                    >
                      {showPassword.password ? "visibility" : "visibility_off"}
                    </span>
                  </div>
                  <p className="error-message">
                    {errors.password ? errors.password.message : ""}
                  </p>
                </div>
                <div className="remember-container flex">
                  <div className="remember-content flex">
                    {/* its used to in future */}
                    {/* <input type="checkbox" className="remember-input" />
                    <p>Remember me</p> */}
                  </div>
                  <div className="forgot-container">
                    <a href="/forgot/password">Forgot Password</a>
                  </div>
                </div>
                <div className="login-button-container ">
                  <button className="btn primary-medium " disabled={loading}>
                    {loading ? (
                      <span>
                        Logging in...
                        <LoadingOutlined className="loader" />
                      </span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
