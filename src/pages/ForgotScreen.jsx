// import React, { Component } from "react";
// import ForgotPasswordImage from "../assets/images/Forgot-password.png";
// import "/home/dckap/Palli-Application/Palli-Application/src/assets/css/forgotPage.css";

// const Forgotpassword = () => {
//   return (
//     <div className="forgot-container">
//       <div className="left-side">
//         <img src={ForgotPasswordImage} alt="ForgotPasswordImage" />
//       </div>
//       <div className="right-side">
//         <div className="circle">
//           <span className="material-symbols-outlined">vpn_key</span>
//         </div>
//         <div className="input-container">
//           <div className="header">
//             <h3>Forgot Password?</h3>
//             <p>No Worries we’ll send you reset instructions</p>
//           </div>
//           <div className="email-input">
//             <label htmlFor="Email">
//               Email
//               <span className="required-symbole">*</span>
//             </label>
//             <div className="emailAndicon">
//               <span className="material-symbols-outlined">mail</span>
//               <input type="email" />
//             </div>
//           </div>
//           <div className="resetpassword">
//             <button>Reset Password</button>
//           </div>
//           <div className="back">
//             <span className="material-symbols-outlined">
//               keyboard_backspace
//             </span>
//             <p>Go to back</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Forgotpassword;





// Import necessary dependencies
import React from "react";
import ForgotPasswordImage from "../assets/images/Forgot-password.png";
import "/home/dckap/Palli-Application/Palli-Application/src/assets/css/forgotPage.css";

// Define a functional component for the Forgot Password page
const Forgotpassword = () => {
  return (
    <div className="forgot-container">
      {/* Left side container with an image */}
      <div className="left-side">
        <img src={ForgotPasswordImage} alt="ForgotPasswordImage" />
      </div>

      {/* Right side container with input fields and instructions */}
      <div className="right-side">
        {/* Circular icon container */}
        <div className="circle">
          <span className="material-symbols-outlined">vpn_key</span>
        </div>

        {/* Container for the main input fields */}
        <div className="input-container">
          {/* Header section with title and description */}
          <div className="header">
            <h3>Forgot Password?</h3>
            <p>No Worries we’ll send you reset instructions</p>
          </div>

          {/* Email input field section */}
          <div className="email-input">
            <label htmlFor="Email">
              Email
              <span className="required-symbole">*</span>
            </label>
            <div className="emailAndicon">
              <span className="material-symbols-outlined">mail</span>
              <input type="email" />
            </div>
          </div>

          {/* Reset password button */}
          <div className="resetpassword">
            <button>Reset Password</button>
          </div>

          {/* Back link to go back */}
          <div className="back">
            <span className="material-symbols-outlined">
              keyboard_backspace
            </span>
            <p>Go back</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Forgotpassword component for use in other files
export default Forgotpassword;
