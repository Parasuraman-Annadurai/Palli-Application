import React, { useState } from "react";
const PasswordRequirements = ({ password }) => {
  // Define your password requirements here
  const lengthCheck = 8;
  const upperCaseCheck = /[A-Z]/.test(password);
  const lowerCaseCheck = /[a-z]/.test(password);
  const numberCheck = /\d/.test(password);
  const specialCharCheck = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

  // Define styles for correct and wrong states
  const correctStyle = { color: "blue" };
  const wrongStyle = { color: "red" };

  return (
    <ul className="password-check-points">
      <li style={password.length >= lengthCheck ? correctStyle : wrongStyle}>
        {password.length >= lengthCheck && (
          <span className="material-symbols-outlined">check_circle</span>
        )}
        {password.length < lengthCheck && (
          <span className="material-symbols-outlined">cancel</span>
        )}
        {`Minimum 8 characters`}
      </li>

      <li style={upperCaseCheck ? correctStyle : wrongStyle}>
        {upperCaseCheck && (
          <span className="material-symbols-outlined">check_circle</span>
        )}
        {!upperCaseCheck && (
          <span className="material-symbols-outlined">cancel</span>
        )}
        {`At least one uppercase letter`}
      </li>

      <li style={lowerCaseCheck ? correctStyle : wrongStyle}>
        {lowerCaseCheck && (
          <span className="material-symbols-outlined">check_circle</span>
        )}
        {!lowerCaseCheck && (
          <span className="material-symbols-outlined">cancel</span>
        )}
        {`At least one lowercase letter`}
      </li>

      <li style={numberCheck ? correctStyle : wrongStyle}>
        {numberCheck && (
          <span className="material-symbols-outlined">check_circle</span>
        )}
        {!numberCheck && (
          <span className="material-symbols-outlined">cancel</span>
        )}
        {`At least one digit`}
      </li>

      <li style={specialCharCheck ? correctStyle : wrongStyle}>
        {specialCharCheck && (
          <span className="material-symbols-outlined">check_circle</span>
        )}
        {!specialCharCheck && (
          <span className="material-symbols-outlined">cancel</span>
        )}
        {`At least one special character`}
      </li>
    </ul>
  );
};

export default PasswordRequirements;
