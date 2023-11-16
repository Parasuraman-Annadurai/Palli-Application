// utils.js

import React from 'react';
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

export const checkPasswordCriteria = (password,setpasswordCriteria) => {
  let criteria = passwordRequirements(password);
      const content = (
        <ul>
          <li>{criteria.lengthCheck ? '✅' : '❌'} Minimum 8 characters</li>
          <li>{criteria.upperCaseCheck ? '✅' : '❌'} At least one uppercase letter</li>
          <li>{criteria.lowerCaseCheck ? '✅' : '❌'} At least one lowercase letter</li>
          <li>{criteria.numberCheck ? '✅' : '❌'} At least one digit</li>
          <li>{criteria.specialCharCheck ? '✅' : '❌'} At least one special character</li>
        </ul>
      );
      setpasswordCriteria(content);

 
 };
