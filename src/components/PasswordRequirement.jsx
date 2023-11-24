
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
          <li className='criteria'>{criteria.lengthCheck ? <span class="material-symbols-outlined tick">check_circle</span> : <span class="material-symbols-outlined cancel">cancel</span>} Minimum 8 characters</li>
          <li className='criteria'>{criteria.upperCaseCheck ? <span class="material-symbols-outlined tick">check_circle</span> : <span class="material-symbols-outlined cancel">cancel</span>} At least one uppercase letter</li>
          <li className='criteria'>{criteria.lowerCaseCheck ? <span class="material-symbols-outlined tick">check_circle</span> : <span class="material-symbols-outlined cancel">cancel</span>} At least one lowercase letter</li>
          <li className='criteria'>{criteria.numberCheck ? <span class="material-symbols-outlined tick">check_circle</span> : <span class="material-symbols-outlined cancel">cancel</span>} At least one digit</li>
          <li className='criteria'>{criteria.specialCharCheck ? <span class="material-symbols-outlined tick">check_circle</span> : <span class="material-symbols-outlined cancel">cancel</span>} At least one special character</li>
        </ul>
      );
      setpasswordCriteria(content);

 
 };
