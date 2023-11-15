import React, { useState } from "react";
const PasswordRequirements = ({ password }) => {
  // Define your password requirements here
  const minLength = 8;
  const UpperCase = /[A-Z]/.test(password);
  const LowerCase = /[a-z]/.test(password);
  const atLeastOneNumber = /\d/.test(password);
  const SpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

  // Define styles for correct and wrong states
  const correctStyle = { color: "blue" };
  const wrongStyle = { color: "red" };

  return (
    <ul className="password-check-points">
      <li style={password.length >= minLength ? correctStyle : wrongStyle}>
        {password.length >= minLength && (
          <span className="material-symbols-outlined">check_circle</span>
        )}
        {password.length < minLength && (
          <span className="material-symbols-outlined">cancel</span>
        )}
        {`Minimum 8 characters`}
      </li>

      <li style={UpperCase ? correctStyle : wrongStyle}>
        {UpperCase && (
          <span className="material-symbols-outlined">check_circle</span>
        )}
        {!UpperCase && (
          <span className="material-symbols-outlined">cancel</span>
        )}
        {`At least one uppercase letter`}
      </li>

      <li style={LowerCase ? correctStyle : wrongStyle}>
        {LowerCase && (
          <span className="material-symbols-outlined">check_circle</span>
        )}
        {!LowerCase && (
          <span className="material-symbols-outlined">cancel</span>
        )}
        {`At least one lowercase letter`}
      </li>

      <li style={atLeastOneNumber ? correctStyle : wrongStyle}>
        {atLeastOneNumber && (
          <span className="material-symbols-outlined">check_circle</span>
        )}
        {!atLeastOneNumber && (
          <span className="material-symbols-outlined">cancel</span>
        )}
        {`At least one digit`}
      </li>

      <li style={SpecialChar ? correctStyle : wrongStyle}>
        {SpecialChar && (
          <span className="material-symbols-outlined">check_circle</span>
        )}
        {!SpecialChar && (
          <span className="material-symbols-outlined">cancel</span>
        )}
        {`At least one special character`}
      </li>
    </ul>
  );
};

export default PasswordRequirements;
