import { useState } from 'react';

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
        delete errors[name]
      
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

 

  return {
    formData,
    errors,
    setErrors,
    handleChange,
    setFormData,
    resetForm
  };
};

export default useForm;
