import React, { useState } from "react";





 let PasswordRequirements = (password ) => {
  // Define your password requirements here
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



export default PasswordRequirements;




