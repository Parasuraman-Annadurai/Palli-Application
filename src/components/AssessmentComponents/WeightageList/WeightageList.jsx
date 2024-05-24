import React from "react";

import {  Select, Tooltip } from "antd";
import { isWeightageValid } from "../../../utils/validate";

import "./scss/WeightageList.css"
const WeightageList = ({
  taskWeightages,
  handleSaveWeightage,
  handleAddWeightage,
  handleWeightageChange,
  handleDeleteWeightage,
  weightages,
  selectedStudents,
  weightageErrors,
  setWeightageErros,
}) => {
  return (
    <div
      className="weightage-main-container"
    >
      <div className="overall">
        <div className="weightage-adding-container flex">
          <div className="weight-inputs">
            {taskWeightages.map((taskWeightage, index) => {
              return (
                <div className="weight-age-input">
                  <div className="weightage-select">
                    <Tooltip placement="left" title={selectedStudents.length > 0  && <p>Once users are assigned to the assessment, weightage cannot be modified</p>}>
                    <Select
                      style={{ width: "170px", opacity: selectedStudents.length > 0 ? 0.5 : 1,
                      cursor:
                        selectedStudents.length > 0 ? "not-allowed" : "auto", }}
                      placeholder={"Select Weightage"}
                      value={taskWeightage.weightage}
                      onChange={(value) =>
                        handleWeightageChange(value, index, "weightage")
                      }
                      disabled={selectedStudents.length ? true : false}
                    >
                      {weightages.map((weightageList) => (
                        <Select.Option
                          key={weightageList.id}
                          value={weightageList.id}
                        >
                          {weightageList.weightage}
                        </Select.Option>
                      ))}
                    </Select>
                    </Tooltip>
                  
                  </div>
                  <div className="percentage">
                    <input
                      type="number"
                      min="1" // Set the minimum allowed value
                      max="100" // Set the maximum allowed value
                      value={parseFloat(taskWeightage.weightage_percentage)} // Ensure it's a string or an empty string
                      onChange={(e) =>
                        handleWeightageChange(
                          e.target.value,
                          index,
                          "weightage_percentage"
                        )
                      }
                      disabled={selectedStudents.length}
                      className="task-weight-value-selector"
                      style={{
                        opacity: selectedStudents.length > 0 ? 0.5 : 1,
                        cursor:
                          selectedStudents.length > 0 ? "not-allowed" : "auto",
                          '-moz-appearance': 'textfield'
                      }}
                    />
                  </div>
                  <div className="weightage-unit-container flex" >
                    <div className="weightage-action" >
                      {/* Show the delete icon only if weightage is greater than 0 */}
                      <span
                        onClick={() =>
                          !selectedStudents.length &&
                          handleDeleteWeightage(taskWeightage.id, index)
                        }
                      >
                        <img
                          src="/icons/deleteIcon.svg"
                          alt="delete-icon"
                          className="delete-icon"
                          style={{
                            cursor: selectedStudents.length
                              ? "not-allowed"
                              : "auto",
                              opacity: selectedStudents.length > 0 ? 0.5 : 1,
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
       {weightageErrors["weightage"] ? <p className="error-message">
          {weightageErrors["weightage"] ? weightageErrors["weightage"] : ""}
        </p> :"" } 

        {!selectedStudents?.length && (
          <>
            <div className="all-btns">
              <div className="add-weightage-button">
                <button
                  className="btn create-btn"
                  onClick={handleAddWeightage}
                >
                  + Add Weightage
                </button>
              </div>
              <div>
                <div className="apply-weightage">
                  <Tooltip
                    title={
                      taskWeightages?.length === 0
                        ? "Add atleast one weightage to link in task"
                        : ""
                    }
                  >
                    <button
                      className={`${
                        taskWeightages?.length === 0
                          ? "btn secondary-medium-default"
                          : "btn secondary-medium"
                      }`}
                      onClick={() =>
                        taskWeightages?.length > 0 &&
                        isWeightageValid(taskWeightages, setWeightageErros)
                          ? handleSaveWeightage()
                          : null
                      }
                    >
                      Save
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeightageList;
