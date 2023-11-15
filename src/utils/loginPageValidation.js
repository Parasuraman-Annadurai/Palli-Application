

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
    const UpperCase = /[A-Z]/;
    const specialCharCheck = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
  
    switch (true) {
      case !password.trim():
        return "Password is required";
      case !lengthCheck.test(password):
        return "Password must be at least 8 characters.";
      case !UpperCase.test(password):
        return "At least one uppercase letter";
      case !numberCheck.test(password):
        return "Password must contain at least one number.";
      case !specialCharCheck.test(password):
        return "Password must contain at least one special character.";
    }
  
}