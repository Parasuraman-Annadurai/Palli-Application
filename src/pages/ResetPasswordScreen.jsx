import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space } from "antd";
import Logo from "/home/dckap/Palli-Application/Palli-Application/src/assets/images/logo.png";
import ResetPasswordImage from "/home/dckap/Palli-Application/Palli-Application/src/assets/images/RestPageImage.png";
import "/home/dckap/Palli-Application/Palli-Application/src/assets/css/resetPage.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation logic
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
      // Perform other actions, e.g., submit the form
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
              <Space direction="vertical">
                <label htmlFor="Password">
                  New Password
                  <span className="required-symbole">*</span>
                </label>
                <Input.Password
                  placeholder="Input password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <label htmlFor="ConfirmPassword">
                  Confirm New Password
                  <span className="required-symbole">*</span>
                </label>
                <Input.Password
                  placeholder="Input password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </Space>
            </div>
            <div className="reset-password">
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
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

export default ResetPassword;
