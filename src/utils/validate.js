import Quill from "quill";
import { notification } from "antd";


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

export const validateComments =(value,fieldName,setErrors)=>{
  let errors = {};
  let isValid = true;

  const emptyHtmlRegex = /^<p>(\s*|<br\s*\/?>)<\/p>\s*$/;

  const trimmedComment = value.trim();

  if (!trimmedComment || emptyHtmlRegex.test(trimmedComment)) {
    errors[fieldName] = `${fieldName} is required`;
    isValid = false;
  }

  setErrors(errors);
  return isValid;
}

export const validUrl =(value,fieldName,setErrors)=>{
  let errors = {};
  let isValid = true;

  if (!/^(ftp|http|https):\/\/[^ "]+$/.test(value)) {
    errors[fieldName] = `Please enter a valid url`;
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




export const isWeightageValid = (taskWeightageDetails, setWeightageErrors) => {
  let errors = {};
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
      (sum, taskWeightageDetail) => sum + parseFloat(taskWeightageDetail?.weightage_percentage || 0),
      0
    );

    if (totalPercentage !== 100) {
      errors.weightage = "Selected weightage does not sum up to 100. Please check and adjust the values.";
      isValid = false;
    }
  }

  setWeightageErrors(errors);
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

export const formatPermissions = (permissions) => {
  const formattedPermissions = {};
  permissions.forEach(permission => {
    const { module_name, access_level } = permission;
    formattedPermissions[module_name] = formattedPermissions[module_name] || [];
    formattedPermissions[module_name].push(access_level);
  });
  return formattedPermissions;
};

//


// authUtils.js


import axios from "axios";
import { API_END_POINT } from "../../config";
export const fetchUserInfo = (token, setToken, setUser, navigate, setLoading,redirectStatus) => {
  axios({
    url: `${API_END_POINT}/api/accounts/get/user_info/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  })
    .then((userData) => {
      localStorage.setItem("token", JSON.stringify(token));
      setToken(token);

      const formattedPermissions = formatPermissions(userData.data.data.permissions);
      const formattedUserData = {
        ...userData.data.data,
        permissions: formattedPermissions,
      };
      localStorage.setItem("user", JSON.stringify(formattedUserData));
      setUser(formattedUserData);

      if(redirectStatus){
        if(getPermission(formattedUserData.permissions,"Applicant","read")){
          if (formattedUserData.batch && formattedUserData.batch.length > 0) {
            navigate(`/batch/${formattedUserData.batch[0].id}/applications`);
          } else {
            setLoading(false);
            notification.error({
              message: "Batch Access Error",
              description: "You don't have batch access.",
              duration: 1
            });
          }
        }else{
          const batchId = formattedUserData.batch?.[0]?.id;
          if (batchId) {
            navigate(`/batch/${formattedUserData.batch[0].id}/task`);
          } else {
            setLoading(false);
            notification.error({
              message: "Batch Access Error",
              description: "You don't have batch access.",
              duration: 1
            });
          }
        }
      }

    
    })
    .catch((error) => {
      setLoading(false);
      if (
        error.response.data.status === 400 ||
        "errors" in error.response.data
      ) {
        const errorMessages = error.response.data.errors;
        notification.error({
          message: error.response.data?.message,
          description: errorMessages.detail,
          duration: 1
        })
      }
    });
};

export const formatFileSize = (sizeInBytes) => {
  const fileSize = sizeInBytes < 1024 ? sizeInBytes / 1024 : sizeInBytes / (1024 * 1024);
  return fileSize.toFixed(2) + (fileSize < 1 ? ' KB' : ' MB');
};
