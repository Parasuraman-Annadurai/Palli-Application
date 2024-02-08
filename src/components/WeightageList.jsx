import React, { useState, useEffect } from "react";

import { Button, Select, Tooltip } from "antd";

import { isWeightageVaild } from "../utils/validate";

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
      style={{ height: 550, overflowY: "scroll" }}
    >
      <div
        className="overall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 20,
        }}
      >
        <div className="weightage-adding-container flex">
          <div className="weight-inputs">
            {taskWeightages.map((taskWeightage, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <div className="weightage-select">
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
                  </div>
                  <div
                    className="percentage"
                    style={{ maxWidth: 45, width: "100%" }}
                  >
                    <input
                      type="text"
                      value={taskWeightage.weightage_percentage}
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
                        border: "1px solid #eaeaea",
                        borderRadius: 4,
                        width: "100%",
                        paddingTop: 7.5,
                        paddingBottom: 7.5,
                        paddingLeft: 5,
                        paddingRight: 5,
                        opacity: selectedStudents.length > 0 ? 0.5 : 1,
                        cursor:
                          selectedStudents.length > 0 ? "not-allowed" : "auto",
                      }}
                    />
                  </div>
                  <div className="weightage-unit-container flex">
                    <div className="weightage-action">
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
        <p className="error-message">
          {weightageErrors["weightage"] ? weightageErrors["weightage"] : ""}
        </p>

        {!selectedStudents?.length && (
          <>
            <div
              className="all-btns"
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <div className="add-weightage-button">
                <button
                  className="btn create-btn"
                  style={{ padding: 15, cursor: "pointer" }}
                  onClick={handleAddWeightage}
                >
                  + Add Weightage
                </button>
              </div>
              <div style={{ flex: 1 }}>
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
                        isWeightageVaild(taskWeightages, setWeightageErros)
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
