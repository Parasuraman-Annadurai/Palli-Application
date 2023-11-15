import React, { useState } from 'react';
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
           <i className="fa-regular fa-circle-check"></i>
          )}
          {password.length < minLength && (
            <i className="fa-regular fa-circle-xmark" style={{color: "#ff0000"}}></i>
          )}
          {`Minimum 8 characters`}
        </li>

        <li style={UpperCase ? correctStyle : wrongStyle}>
          {UpperCase && (
             <i className="fa-regular fa-circle-check"></i>
          )}
          {!UpperCase && (
            <i className="fa-regular fa-circle-xmark" style={{color: "#ff0000"}}></i>
          )}
          {`At least one uppercase letter`}

        </li>

        <li style={LowerCase ? correctStyle : wrongStyle} >
          
          {LowerCase && (
             <i className="fa-regular fa-circle-check"></i>
          )}
          {!LowerCase && (
            <i className="fa-regular fa-circle-xmark" style={{color: "#ff0000"}}></i>
          )}
          {`At least one lowercase letter`}
        </li>

        <li style={atLeastOneNumber ? correctStyle : wrongStyle}>
          
          {atLeastOneNumber && (
             <i className="fa-regular fa-circle-check"></i>
          )}
          {!atLeastOneNumber && (
            <i className="fa-regular fa-circle-xmark" style={{color: "#ff0000"}}></i>
          )}
          {`At least one digit`}
        </li>

        <li style={SpecialChar ? correctStyle : wrongStyle}>
          {SpecialChar && (
             <i className="fa-regular fa-circle-check"></i>
          )}
          {!SpecialChar && (
            <i className="fa-regular fa-circle-xmark" style={{color: "#ff0000"}}></i>
          )}
          {`At least one special character`}
        </li>
      </ul>
  );
};


export default PasswordRequirements;

