

export const isEmailValid = (email) => {

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    switch (true) {
      case !email.trim():
        return "Email field is required";
      case !emailRegex.test(email.toLowerCase()):
        return "Email not valid";
    }
  };

export let isPasswordValid = (password) => {
    const lengthCheck = /.{8,}/;
    const numberCheck = /\d/;
    const upperCaseCheck = /[A-Z]/;
    const specialCharCheck = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
  
    switch (true) {
      case !password.trim():
        return "Password is required";
      case !lengthCheck.test(password):
        return "Password must be at least 8 characters.";
      case !upperCaseCheck.test(password):
        return "At least one uppercase letter";
      case !numberCheck.test(password):
        return "Password must contain at least one number.";
      case !specialCharCheck.test(password):
        return "Password must contain at least one special character.";
    }
  
}


export const validate = (loginUserData, setErrors) => {
  let errors = {};
  let isValid = true;

  const emailError = isEmailValid(loginUserData.email);
  if (emailError) {
    errors.email = emailError;
    isValid = false;
  }

  const passwordError = isPasswordValid(loginUserData.password);
  if (passwordError) {
    errors.password = passwordError;
    isValid = false;
  }

  setErrors(errors);
  return isValid;
};

export const validateNewpassword = (newPasswordData, setErrors) => {

  let isValid = true;
  let errors ={}

 
   const criteria = isPasswordValid(newPasswordData.newPassword);
    if(criteria){
      errors.newPassword = criteria
      isValid = false;
    }


    if(newPasswordData.confirmPassword.trim()===""){
      errors.confirmPassword = "confirmPassword required";
      isValid = false;
    }
    else if(newPasswordData.newPassword !== newPasswordData.confirmPassword){
      errors.confirmPassword = "New password and Confirm password not match";
      isValid = false;
    }


  setErrors(errors);
  return isValid;


};