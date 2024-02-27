import React from "react";

import { trackPwdRequirement } from "../../utils/validate";

import "./scss/PasswordRequirement.css";
const GetPasswordPopover = ({ password }) => {
 
  const requirementsList = trackPwdRequirement(password);
  return (
    <ul>
      {requirementsList.map((item) => (
        <li key={item.key}>
          {item.error ? (
            <span>
              <img className="close-btn" src="/icons/remove.svg" alt="cancel" />
              <span>{item.content}</span>
            </span>
          ) : (
            <span>
              <img className="close-btn" src="/icons/tick.svg" alt="tick" />
              <span>{item.content}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default GetPasswordPopover;
