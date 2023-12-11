

import React from 'react';

const Input = ({ label, name, type, value, onChange, onBlur, error,onFocus }) => (
  <div className={`${name}__inputs`}>
    <label htmlFor={name}>
      {label} <span className="required-feild">*</span>
    </label>
    <div className={`${name}__icon`}>
      <span className={`material-symbols-outlined ${name}-sybmbol`}>{name}</span>
      <div className="input__component">
        <input
          type={type}
          placeholder={`Enter the ${label}`}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={`${name}__feild`}
        />
      </div>
    </div>
    <p className="error__message">{error}</p>
  </div>
);

export default Input;

  
