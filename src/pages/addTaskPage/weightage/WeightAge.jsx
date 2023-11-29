import React, { useState } from "react";
import "./WeightAge.css";
const Weightage = () => {
  const [fields, setFields] = useState([
    {
      id: Date.now(),
      description: "",
      value: "",
      descriptionError: "",
      valueError: "",
    },
  ]);

  const validate = () => {
    let valid = true;
    const updatedFields = fields.map((field) => {
      let descriptionError = "";
      let valueError = "";

      if (!field.description.trim()) {
        descriptionError = "Description cannot be empty";
        valid = false;
      }

      if (!field.value.trim()) {
        valueError = "Value cannot be empty";
        valid = false;
      } else if (!/^\d+$/.test(field.value)) {
        valueError = "Value must be a number";
        valid = false;
      }

      return {
        ...field,
        descriptionError,
        valueError,
      };
    });

    setFields(updatedFields);
    return valid;
  };

  const handleDescriptionChange = (id, event) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, description: event.target.value } : field
    );
    setFields(updatedFields);
  };

  const handleValueChange = (id, event) => {
    const updatedFields = fields.map((field) =>
      field.id === id
        ? { ...field, value: event.target.value.replace(/\D/, "") }
        : field
    );
    setFields(updatedFields);
  };
  const addNewField = () => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        description: "",
        value: "",
        descriptionError: "",
        valueError: "",
      },
    ]);
  };

  const removeField = (id) => {
    const filteredFields = fields.filter((field) => field.id !== id);
    setFields(filteredFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      // Perform your submission logic here
      console.log("Fields are valid:", fields);
    } else {
      console.log("Fields are not valid");
    }
  };

  return (
    <div  className="content">
      <div className="weightage__header">
        <p className="icon__title">
          <span className="material-symbols-outlined">check_circle</span>
          Weightage
        </p>
        <div className="close">
          <span className="material-symbols-outlined">close</span>
        </div>
      </div>
      {fields.map((field, index) => (
        <div className="weightage__container" key={field.id}>
          <div className="des&value">
            <div className="description">
              <label className="input__label" htmlFor="">
                Description
              </label>
              <input
                type="text"
                className="input__description"
                placeholder="e.g UI "
                value={field.description}
                onChange={(e) => handleDescriptionChange(field.id, e)}
              />
              <p className="error-message">{field.descriptionError ? field.descriptionError : ""}</p>
            </div>
            <div className="value">
              <label className="input__label" htmlFor="">
                Value
              </label>
              <input
                type="text"
                className="input__value"
                placeholder="e.g 50%"
                value={field.value}
                onChange={(e) => handleValueChange(field.id, e)}
              />
              <p className="error-message">{field.valueError ? field.valueError : ""}</p>
            </div>

            {index !== 0 && (
              <div className="cancel" onClick={() => removeField(field.id)}>
                <span className="material-symbols-outlined">cancel</span>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="all_btn">
        <div className="btns">
          <div className="save__new">
            <button onClick={addNewField}>Add New</button>
          </div>
          <div className="save">
            <button onClick={handleSubmit} type="submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weightage;
