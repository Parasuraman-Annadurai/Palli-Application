//Remove this file
import { useState } from "react";
import "./LoginScreen.css";
import useAuth from "../../context/AuthContext";
import UserService from "../../services/UserService";
import DckapPalliLogo from "../../../src/assests/images/DckapPalliLogo.png";
import ManagerLoginLogo from "../../../src/assests/images/ManagerLoginLogo.png";
import { isEmailValid, isPasswordValid,validate } from "../../utils/loginPageValidation";
import PasswordRequirements from "../../components/PasswordRequirement";
import { SampleButton } from "../../components/Button";
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

  //user give wrong value then show erros message
  const [erros, seterros] = useState({});

  //handlechange used to set user email and password in logindata state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginUserData({ ...loginUserData, [name]: value });
    if (erros[name]) delete erros[name];
  };

  //this validate function used to user give the email and password vaild or not
  // const validate = (loginUserData) => {
  //   let erross = {};
  //   let isVaild = true;

  //   if (isEmailValid(loginUserData.email)) {
  //     erross.email = isEmailValid(loginUserData.email);
  //     isVaild = false;
  //   }
  //   if (isPasswordValid(loginUserData.password)) {
  //     erross.password = isPasswordValid(loginUserData.password);
  //     isVaild = false;
  //   }

  //   seterros(erross);
  //   return isVaild;
  // };

  //after validate the user email and password and check user already exits or not
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    let isVaild = validate(loginUserData,seterros);
    if(isVaild){
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
      .catch((erros) => {
        //user give the wrong credentail stay with login page
        notification.error({
          message: erros.response.data.message,
          duration:2
        });
        navigate("/");
      });
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
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="password__feild"
                      name="password"
                      value={loginUserData.password}
                      onChange={handleChange}
                      onFocus={() => setshowPasswordCheckList(true)}
                      onBlur={() => setshowPasswordCheckList(false)}
                    />
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
              <div
                className={`${
                  showPasswordCheckList
                    ? "requirements__list show"
                    : "requirements__list"
                }`}
              >
                {/* this is the password check list component */}
                <PasswordRequirements password={loginUserData.password} />
              </div>
              <a href="/forgot/password">Forgot password ?</a>
              <div className="login__btn__container">
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
