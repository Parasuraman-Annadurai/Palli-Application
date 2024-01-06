import React from "react";

import "./scss/PasswordRequirement.css";
export const passwordRequirements = (password) => {
  const lengthCheck = /.{8,}/.test(password);
  const upperCaseCheck = /[A-Z]/.test(password);
  const lowerCaseCheck = /[a-z]/.test(password);
  const numberCheck = /\d/.test(password);
  const specialCharCheck = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

  return {
    lengthCheck,
    upperCaseCheck,
    lowerCaseCheck,
    numberCheck,
    specialCharCheck,
  };
};

export const checkPasswordCriteria = (password, setpasswordCriteria) => {
  let criteria = passwordRequirements(password);
  const content = (
    <ul>
      <li className="criteria">
        {criteria.lengthCheck ? (
          <span>
            {" "}
            <img className="close-btn" src="/icons/tick.svg" alt="cancel" />
          </span>
        ) : (
          <span>
            {" "}
            <img className="close-btn" src="/icons/remove.svg" alt="cancel" />
          </span>
        )}{" "}
        Minimum 8 characters
      </li>

      <li className="criteria">
        {criteria.upperCaseCheck ? (
          <span>
            {" "}
            <img className="close-btn" src="/icons/tick.svg" alt="cancel" />
          </span>
        ) : (
          <span>
            {" "}
            <img className="close-btn" src="/icons/remove.svg" alt="cancel" />
          </span>
        )}{" "}
        At least one uppercase letter
      </li>
      <li className="criteria">
        {criteria.lowerCaseCheck ? (
          <span>
            {" "}
            <img className="close-btn" src="/icons/tick.svg" alt="cancel" />
          </span>
        ) : (
          <span>
            {" "}
            <img className="close-btn" src="/icons/remove.svg" alt="cancel" />
          </span>
        )}{" "}
        At least one lowercase letter
      </li>
      <li className="criteria">
        {criteria.numberCheck ? (
          <span>
            {" "}
            <img className="close-btn" src="/icons/tick.svg" alt="cancel" />
          </span>
        ) : (
          <span>
            {" "}
            <img className="close-btn" src="/icons/remove.svg" alt="cancel" />
          </span>
        )}{" "}
        At least one digit
      </li>
      <li className="criteria">
        {criteria.specialCharCheck ? (
          <span>
            {" "}
            <img className="close-btn" src="/icons/tick.svg" alt="cancel" />
          </span>
        ) : (
          <span>
            {" "}
            <img className="close-btn" src="/icons/remove.svg" alt="cancel" />
          </span>
        )}{" "}
        At least one special character
      </li>
    </ul>
  );
  setpasswordCriteria(content);
};
