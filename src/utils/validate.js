
export const isEmailValid = (email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  switch (true) {
    case !email.trim():
      return "Required field cannot be empty.";
    case !emailRegex.test(email.toLowerCase()):
      return "Invalid Email";
  }
};

export let isPasswordValid = (password) => {
  const lengthCheck = /.{8,}/;
  const numberCheck = /\d/;
  const upperCaseCheck = /[A-Z]/;
  const specialCharCheck = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

  switch (true) {
    case !password.trim():
      return "Required field cannot be empty";
    case !lengthCheck.test(password):
      return "Password must be at least 8 characters.";
    case !upperCaseCheck.test(password):
      return "At least one uppercase letter";
    case !numberCheck.test(password):
      return "Password must contain at least one number.";
    case !specialCharCheck.test(password):
      return "Password must contain at least one special character.";
  }
};

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
  let errors = {};

  const criteria = isPasswordValid(newPasswordData.newPassword);
  if (criteria) {
    errors.newPassword = criteria;
    isValid = false;
  }

  if (newPasswordData.confirmPassword.trim() === "") {
    errors.confirmPassword = "Required field cannot be empty";
    isValid = false;
  } else if (newPasswordData.newPassword !== newPasswordData.confirmPassword) {
    errors.confirmPassword = "New password and confirm password not match";
    isValid = false;
  }

  setErrors(errors);
  return isValid;
};

export const validateAddTask = (addTaskData,setErrors) => {


  let errors = {};
  let isVaild = true;
  if (!addTaskData.task_title.trim()) {
    errors.task_title = "Task Name is Required";
    isVaild = false;
  }
  if (!addTaskData.task_description.trim()) {
    errors.task_description = "Task Description is Required";
    isVaild = false;
  }
 
  if (!addTaskData.due_date) {
    errors.due_date = "Task Due Date is Required";
    isVaild = false;
  }
  if (addTaskData.task_type <0) {
    errors.task_type = "Task Type is Required";
    isVaild = false;
  }
  setErrors(errors);
  return isVaild;
};




const content = [
  {
    error: false,
    content: 'At least one special character is required',
    key: 'specialCharError'
  },
  {
    error: false,
    content: 'At least one lowercase letter is required',
    key: 'lowercaseError'
  },
  {
    error: false,
    content: 'At least one uppercase letter is required', 
    key: 'uppercaseError' 
  },
  {
    error: false,
    content: 'At least one number is required',
    key: 'numberError'
  },
  {
    error: false,
    content: 'Password should be at least 8 characters long',
    key: 'lengthError'
  }
];

export const trackPwdRequirement = (password) => {
  let specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~]/;
  let lowercaseRegex = /[a-z]/;
  let uppercaseRegex = /[A-Z]/; 
  let numberRegex = /\d/;
  
  let updatedContent = content.map((item) => {
     switch (item.key) {
       case "specialCharError":
         item.error = !specialCharRegex.test(password);
         break;
       case "lowercaseError":
         item.error = !lowercaseRegex.test(password);
         break;
       case "uppercaseError":
         item.error = !uppercaseRegex.test(password);
         break;
       case "numberError":
         item.error = !numberRegex.test(password);
         break;
       case "lengthError":
         item.error = password.length < 8;
         break;
       default:
         break;
     }
     return item;
   });

  return updatedContent;
};



const colorObject = {
  "TODO" : {backgroundColor:"#E2E8F0",color:"#64748B"},
  "INPROGRESS":{backgroundColor :"#DBEAFE",color:"#3B82F6"},
  "COMPLETED":{backgroundColor:"#EEFDB0",color:"#49A843"},
  "REWORK":{backgroundColor:"#FEF3C7",color:"#F59E0B"},
  "SUBMITTED":{backgroundColor:"#EEFDB0",color:"#49A843"}
}
export default colorObject;