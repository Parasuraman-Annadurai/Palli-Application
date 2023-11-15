//Remove this file
import { useState } from "react";
import "./LoginScreen.css";
import useAuth from "../../context/AuthContext";
import UserService from "../../services/UserService";
import DckapPalliLogo from "../../../src/assests/images/DckapPalliLogo.png";
import ManagerLoginLogo from "../../../src/assests/images/ManagerLoginLogo.png";
import { isEmailValid, isPasswordValid } from "../../utils/loginPageValidation";
import PasswordRequirements from "../../components/PasswordRequirement";
import { SampleButton } from "../../components/SampleButton";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
const LoginScreen = () => {
  const navigate = useNavigate()
  //while typing the password show password check list to user
  const [showPasswordCheckList, setshowPasswordCheckList] = useState(false);
  //hide and show password
  const [showPassword, setShowPassword] = useState(false);

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
      //this user service used to user login and go to home page
      UserService.postUser(loginUserData)
      .then((res) => {
        //user give correct credentail go to home page
        if (res.status === 200 && res.message === 'Success') {
          notification.success({
            message: 'Login Successful',
            duration: 2
          });
       
          
          //store token in localStorage
          localStorage.setItem("tokens",JSON.stringify(res.data))
          navigate("/home/page");
        }
      })
      .catch((error) => {
        //user give the wrong credentail stay with login page
        notification.error({
          message: error.response.data.message,
          duration:2
        });
        navigate("/");
      });
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
            <img src={DckapPalliLogo} alt="" />
          </div>
        </div>
        <div className="input-containers">
          <div className="left-side-image-container">
            <img src={ManagerLoginLogo} alt="" />
          </div>
          <div className="right-side-input-container">
            <form action="" onSubmit={handleLoginSubmit} className="login-form">
              <div className="email-inputs">
                <label htmlFor="">
                  Email Id <span className="required-feild">*</span>
                </label>
                <div className="email-icon">
                  <span className="material-symbols-outlined email-sybmbol">
                    mail
                  </span>
                  <div className="input-component">
                    <input
                      placeholder="Enter the Email Id"
                      value={loginUserData.email}
                      name="email"
                      onChange={handleChange}
                      className="email-feild"
                    />
                  </div>
                </div>
                <p className="error-message">
                  {error.email ? error.email : ""}
                </p>
              </div>

              <div className="password-inputs">
                <label htmlFor="">
                  Password <span className="required-feild">*</span>
                </label>
                <div className="password-icon">
                  <span className="material-symbols-outlined password-sybmbol">
                    lock
                  </span>

                  <div className="input-component">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="password-feild"
                      name="password"
                      value={loginUserData.password}
                      onChange={handleChange}
                      onFocus={() => setshowPasswordCheckList(true)}
                      onBlur={() => setshowPasswordCheckList(false)}
                    />
                    {
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="material-symbols-outlined eye-icon"
                      >
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    }
                  </div>
                </div>
                <p className="error-message">
                  {error.password ? error.password : ""}
                </p>
              </div>
              <div
                className={`${
                  showPasswordCheckList
                    ? "requirements-list show"
                    : "requirements-list"
                }`}
              >
                {/* this is the password check list component */}
                <PasswordRequirements password={loginUserData.password} />
              </div>
              <a href="/forgot/password">Forgot password ?</a>
              <div className="login-btn-container ">
                {/* separate sample button components */}
                <SampleButton buttonText={"login"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
