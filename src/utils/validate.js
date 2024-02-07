import Quill from "quill";


export const valueTrim = (value,fieldName,setErrors)=>{
  let errors = {};
  let isValid = true;

  if (!value.trim()) {
    errors[fieldName] = `${fieldName} is required`;
    isValid = false;
  }
  setErrors(errors);
  return isValid;
}

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

export const validateTask = (taskDetails, setFormErrors) => {
  const { task_title, task_description, due_date } = taskDetails;
  let errors = {};
  let isValid = true;
  const emptyHtmlRegex = /^<p>(\s*|<br\s*\/?>)<\/p>\s*$/;

  if (!task_title.trim()) {
    errors = { ...errors, task_title: `Task name is required` };
    isValid = false;
  }

  const trimmedDescription = task_description.trim();

  if (!trimmedDescription || emptyHtmlRegex.test(trimmedDescription)) {
    errors = { ...errors, task_description: `Description is required` };
    isValid = false;
  }
  
  if (!due_date) {
    errors = { ...errors, due_date: `Due date is required` };
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};




export const isWeightageVaild =(taskWeightageDetails,setWeightageErros)=>{
  let errors ={};
  let isValid = true;
  let hasWeightageError = false;
  
  taskWeightageDetails.forEach((taskWeightageDetail, index) => {
    if (!taskWeightageDetail?.weightage || !taskWeightageDetail?.weightage_percentage) {
      if (!hasWeightageError) {
        errors.weightage = "Select the weightage from the suggestions and enter the desired percentage.";
        isValid = false;
        hasWeightageError = true;
      }
    }
  });

  if (!hasWeightageError) {
    // Check if the total percentage is equal to 100
    const totalPercentage = taskWeightageDetails.reduce(
      (sum, taskWeightageDetail) => sum + (taskWeightageDetail?.weightage_percentage || 0),
      0
    );

    if (totalPercentage !== 100) {
      errors.weightage = "Selected weightage is not equal to 100. Please check and adjust the values.";
      isValid = false;
    }
  }

  setWeightageErros(errors);
  return isValid;
}

export const isScoreValidate =(taskWeightageDetails,studentScoreDetails,setScoreErrors)=>{
  let isValid = true;
  let errors = {};
  if(studentScoreDetails?.length !== taskWeightageDetails?.length){
    errors.score = "Score field is required ";
    isValid = false;
  }
  else {
    studentScoreDetails.forEach((score, index) => {
      // Task score should not allow alphabets
      if (!/^\d+$/.test(score.task_score)) {
        errors.score = "Task score must be a valid number";
        isValid = false;
      }
    });
  }
  setScoreErrors(errors);
  return isValid;
}



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

export const CustomIcons = () => {
  const icons = Quill.import("ui/icons");
  icons.bold = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
    <path d="M3 2H7C7.53043 2 8.03914 2.21071 8.41421 2.58579C8.78929 2.96086 9 3.46957 9 4C9 4.53043 8.78929 5.03914 8.41421 5.41421C8.03914 5.78929 7.53043 6 7 6H3V2Z" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 6H7.5C8.03043 6 8.53914 6.21071 8.91421 6.58579C9.28929 6.96086 9.5 7.46957 9.5 8C9.5 8.53043 9.28929 9.03914 8.91421 9.41421C8.53914 9.78929 8.03043 10 7.5 10H3V6Z" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  icons.italic = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
  <path d="M9.5 2H5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7 10H2.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.5 2L4.5 10" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  icons.underline = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
<path d="M3 1.5V5C3 5.79565 3.31607 6.55871 3.87868 7.12132C4.44129 7.68393 5.20435 8 6 8C6.79565 8 7.55871 7.68393 8.12132 7.12132C8.68393 6.55871 9 5.79565 9 5V1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 10.5H10" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  icons["align"][""] = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
<path d="M8.5 5H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 3H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 7H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.5 9H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  icons["align"]["center"] = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
   <path d="M9 5H3" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
   <path d="M10.5 3H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
   <path d="M10.5 7H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
   <path d="M9 9H3" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>`;
 icons["align"]["right"]= `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
    <path d="M10.5 5H3.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.5 3H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.5 7H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.5 9H3.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  icons["align"]["justify"] = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 8" fill="none">
  <path d="M9.5 3H0.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.5 1H0.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.5 5H0.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.5 7H0.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
icons["link"] = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 3.5H9C9.32831 3.5 9.6534 3.56466 9.95671 3.6903C10.26 3.81594 10.5356 4.00009 10.7678 4.23223C10.9999 4.46438 11.1841 4.73998 11.3097 5.04329C11.4353 5.34661 11.5 5.6717 11.5 6C11.5 6.3283 11.4353 6.65339 11.3097 6.95671C11.1841 7.26002 10.9999 7.53562 10.7678 7.76777C10.5356 7.99991 10.26 8.18406 9.95671 8.3097C9.6534 8.43534 9.32831 8.5 9 8.5H7.5M4.5 8.5H3C2.6717 8.5 2.34661 8.43534 2.04329 8.3097C1.73998 8.18406 1.46438 7.99991 1.23223 7.76777C0.763392 7.29893 0.5 6.66304 0.5 6C0.5 5.33696 0.763392 4.70107 1.23223 4.23223C1.70107 3.76339 2.33696 3.5 3 3.5H4.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 6H8" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  return null;
};

export const toolbarConfig = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["link"],
    ],
  },
};



export const getPermission = (permissions,permissionKey,mode)=>{
  if (permissions && Object.keys(permissions).length > 0) {
    const userPermissions = permissions[permissionKey];
    return userPermissions && userPermissions.includes(mode);
  } else {
    // If permissions is empty or undefined, return false
    return false;
  }
}

