import React, { useState } from 'react';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

 const PasswordRequirements = ({ password }) => {
  // Define your password requirements here
  const minLength = 8;
  const UpperCase = /[A-Z]/.test(password);
  const LowerCase = /[a-z]/.test(password);
  const atLeastOneNumber = /\d/.test(password);
  const SpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

  // Define styles for correct and wrong states
  const correctStyle = { color: 'blue' };
  const wrongStyle = { color: 'red' };

  return (
    <ul className='password-check-points'>
        <li style={password.length >= minLength ? correctStyle : wrongStyle}>
          
          {password.length >= minLength && (
            <FontAwesomeIcon icon={faCheckCircle}  />
          )}
          {password.length < minLength && (
            <FontAwesomeIcon icon={faTimesCircle}  />
          )}
          {`Minimum 8 characters`}
        </li>

        <li style={UpperCase ? correctStyle : wrongStyle}>
          {UpperCase && (
            <FontAwesomeIcon icon={faCheckCircle}  />
          )}
          {!UpperCase && (
            <FontAwesomeIcon icon={faTimesCircle}  />
          )}
          {`At least one uppercase letter`}

        </li>

        <li style={LowerCase ? correctStyle : wrongStyle} >
          
          {LowerCase && (
            <FontAwesomeIcon icon={faCheckCircle}  />
          )}
          {!LowerCase && (
            <FontAwesomeIcon icon={faTimesCircle}  />
          )}
          {`At least one lowercase letter`}
        </li>

        <li style={atLeastOneNumber ? correctStyle : wrongStyle}>
          
          {atLeastOneNumber && (
            <FontAwesomeIcon icon={faCheckCircle}  />
          )}
          {!atLeastOneNumber && (
            <FontAwesomeIcon icon={faTimesCircle}  />
          )}
          {`At least one digit`}
        </li>

        <li style={SpecialChar ? correctStyle : wrongStyle}>
          {SpecialChar && (
            <FontAwesomeIcon icon={faCheckCircle}  />
          )}
          {!SpecialChar && (
            <FontAwesomeIcon icon={faTimesCircle}  />
          )}
          {`At least one special character`}
        </li>
      </ul>
  );
};


export default PasswordRequirements;

