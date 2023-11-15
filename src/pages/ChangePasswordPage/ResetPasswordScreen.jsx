import React, { useState } from "react";
import Logo from "/src/assets/images/logo.png";
import ResetPasswordImage from "/src/assets/images/RestPageImage.png";
import "../ChangePasswordPage/ResetPage.css";

const ChangePassword = () => {
 
  const [passwordError, setPasswordError] = useState({});

  const [newPassword,setnewPassword] = useState({
    newPassword:"",
    confirmPassword:""
  })

  const handleInputs = (e)=>{
    const {name,value} = e.target;
    setnewPassword({...newPassword,[name]:value})
  }

  const validatePassword = (newPassword) =>{
    let isVaild = true;
    let error = {};

 
    if(newPassword.newPassword != newPassword.confirmPassword){
      error["confirmPassword"] = "New password and confirm password not match";
      isVaild =false;
    }
    setPasswordError(error)
    return isVaild;

  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if(validatePassword(newPassword)){
      alert("okay")
    }
   
  };

  return (
    <div className="reset-container">
      <div className="left-side-container">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="heding">
          <div className="headings">
            <h3>
              Change Your <br /> Password.?
            </h3>
            <p>
              Your password must be at least 8 characters long <br /> Avoid
              common words or patterns.
            </p>
          </div>
          <div className="input-container">
            <div className="rest-password-input">
              <label htmlFor="Password">
                New Password
                <span className="required-symbole">*</span>
              </label>
              <input
                type="password"
                id="Password"
                name="newPassword"
                placeholder="Input password"
                className="input-field"
                value={newPassword.newPassword}
                onChange={handleInputs}
              />

              <label htmlFor="ConfirmPassword">
                Confirm New Password
                <span className="required-symbole">*</span>
              </label>
              <input
                type="password"
                id="ConfirmPassword"
                name="confirmPassword"
                className="input-field"
                placeholder="Input password"
                value={newPassword.confirmPassword}
                onChange={handleInputs}
              />
            </div>
            <div className="reset-password">
              <p className="error-message">
                {passwordError.confirmPassword ? passwordError.confirmPassword: ""}
              </p>

              <button type="submit" onClick={handleSubmit}>
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="resetImage">
          <img src={ResetPasswordImage} alt="ResetPasswordImage" />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

// import React, { useState } from "react";
// // import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// // import { Input, Space } from "antd";
// import Logo from "/src/assets/images/logo.png";
// import ResetPasswordImage from "/src/assets/images/RestPageImage.png";
// import "../ChangePasswordPage/ResetPage.css"

// const ChangePassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPassword(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Password validation logic
//     if (password !== confirmPassword) {
//       setPasswordError("Passwords do not match");
//     } else {
//       setPasswordError("");
//       // Perform other actions, e.g., submit the form
//     }
//   };

//   return (
//     <div className="reset-container">
//       <div className="left-side-container">
//         <div className="logo">
//           <img src={Logo} alt="Logo" />
//         </div>
//         <div className="heding">
//           <div className="headings">
//             <h3>
//               Change Your <br /> Password.?
//             </h3>
//             <p>
//               Your password must be at least 8 characters long <br /> Avoid
//               common words or patterns.
//             </p>
//           </div>
//           <div className="input-container">
//             <div className="rest-password-input">
//               {/* <Space direction="vertical">
//                 <label htmlFor="Password">
//                   New Password
//                   <span className="required-symbole">*</span>
//                 </label>
//                 <Input.Password
//                   placeholder="Input password"
//                   value={password}
//                   onChange={handlePasswordChange}
//                 />
//                 <label htmlFor="ConfirmPassword">
//                   Confirm New Password
//                   <span className="required-symbole">*</span>
//                 </label>
//                 <Input.Password
//                   placeholder="Input password"
//                   iconRender={(visible) =>
//                     visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//                   }
//                   value={confirmPassword}
//                   onChange={handleConfirmPasswordChange}
//                 />
//               </Space> */}

//                 <label htmlFor="Password">
//                   New Password
//                   <span className="required-symbole">*</span>
//                 </label>
//                 <input
//                   type="password"
//                   id="Password"
//                   placeholder="Input password"
//                   className="input-field"
//                   value={password}
//                   onChange={handlePasswordChange}

//                 />

//                 <label htmlFor="ConfirmPassword">
//                   Confirm New Password
//                   <span className="required-symbole">*</span>
//                 </label>
//                 <input
//                   type="password"
//                   id="ConfirmPassword"
//                   className="input-field"
//                   placeholder="Input password"
//                   value={confirmPassword}
//                   onChange={handleConfirmPasswordChange}
//                 />

//             </div>
//             <div className="reset-password">
//             <p className="error-message">{passwordError ? passwordError : ""}</p>

//               <button type="submit" onClick={handleSubmit}>
//                 Reset Password
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>
//         <div className="resetImage">
//           <img src={ResetPasswordImage} alt="ResetPasswordImage" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;
