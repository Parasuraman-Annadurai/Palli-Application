import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import useAPI from "../../../hooks/useAPI";
import "./WeightAge.css";
import { API_END_POINT } from "../../../../config";
import { useParams } from "react-router-dom";
const Weightage = () => {
  const { id: batchId } = useParams();
  const { token } = useAuth();

  const { data, loading, error, isCompleted, makeNetworkRequest } = useAPI();
  const [additionalFields, setAdditionalFields] = useState([]);

  const addNewField = () => {
    const newField = {
      id: Date.now(),
      description: "",
      value: "",
      descriptionError: "",
      valueError: "",
    };
    setAdditionalFields([...additionalFields, newField]);
  };

  const handleDescriptionChange = (id, event) => {
    const description = event.target.value.trim();
    const updatedFields = additionalFields.map((field) => {
      if (field.id === id) {
        return { ...field, description, descriptionError: "" };
      }
      return field;
    });
    setAdditionalFields(updatedFields);
  };
  const handleValueChange = (id, event) => {
    const value = event.target.value;
    // Regex to allow only numeric values
    if (!/^\d*\.?\d*$/.test(value)) {
      setValidationErrors({
        ...validationErrors,
        [id]: "Please enter numbers only",
      });
    } else {
      const updatedFields = additionalFields.map((field) => {
        if (field.id === id) {
          return { ...field, value };
        }
        return field;
      });
      setAdditionalFields(updatedFields);
      setValidationErrors({ ...validationErrors, [id]: "" });
    }
  };

  const removeField = (id) => {
    const filteredFields = additionalFields.filter((field) => field.id !== id);
    setAdditionalFields(filteredFields);
  };

  const handleSave = () => {
    let isValid = true;
    const updatedFields = additionalFields.map((field) => {
      let descriptionError = "";
      let valueError = "";

      if (field.description.trim() === "") {
        descriptionError = "Description cannot be empty";
        isValid = false;
      }
      if (field.value.trim() === "") {
        valueError = "Value cannot be empty ";
        isValid = false;
      }

      return {
        ...field,
        descriptionError,
        valueError,
      };
    });

    if (isValid) {
      const dataToSend = additionalFields.map(({ description, value }) => ({
        description,
        value,
      }));

      // Assuming your authentication context provides a method for API calls with a token
      makeNetworkRequest(
        `${API_END_POINT}/api/task/assign/task_weightage/${batchId}`,
        "POST",
        dataToSend,
        {
          headres: {
            Authorization: `Bearer ${token.access}`
          },
        }
      );
    }

    setAdditionalFields(updatedFields);
  };

  return (
    <div className="content">
      <div className="weightage">
        <p className="icon__title">
          <span className="material-symbols-outlined">check_circle</span>
          Weightage
        </p>
        <div className="close">
          <span className="material-symbols-outlined">close</span>
        </div>
      </div>
      {/* Additional Fields */}
      {additionalFields.map((field) => (
        <div className="weightage__container">
          <div key={field.id} className="des&value">
            <div className="description">
              <label
                className="input__label"
                htmlFor={`description-${field.id}`}
              >
                Description
              </label>
              <div>
                <input
                  id={`description-${field.id}`}
                  className="input__description"
                  type="text"
                  placeholder="e.g UI"
                  value={field.description}
                  onChange={(event) => handleDescriptionChange(field.id, event)}
                />
                {field.descriptionError && (
                  <span style={{ color: "red" }}>{field.descriptionError}</span>
                )}
              </div>
            </div>
            <div className="value">
              <label className="input__label" htmlFor={`value-${field.id}`}>
                Value
              </label>
              <div>
                <input
                  id={`value-${field.id}`}
                  className="input__value"
                  type="text"
                  placeholder="e.g 50%"
                  value={field.value}
                  onChange={(event) => handleValueChange(field.id, event)}
                />
                {field.valueError && (
                  <span style={{ color: "red" }}>{field.valueError}</span>
                )}
              </div>
            </div>
            <div className="cancel" onClick={() => removeField(field.id)}>
              <span className="material-symbols-outlined">cancel</span>
            </div>
          </div>
        </div>
      ))}
      <div className="all_btn">
        <div className="btns">
          <div className="save__new">
            <button onClick={addNewField}>Add New</button>
          </div>
          <div className="save">
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weightage;
