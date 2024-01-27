import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Select, notification } from "antd";
import axios from "axios";

import { API_END_POINT } from "../../config";

import { useAuth } from "../context/AuthContext";

const WeightageList = ({
  taskId,
  taskWeightages,
  handleSaveWeightage,
  handleAddWeightage,
  handleWeightageChange,
  handleDeleteWeightage
}) => {
  const { id: batchId } = useParams();
  const { token } = useAuth();
  const [weightages, setWeighatages] = useState([]);

  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  useEffect(() => {
    axios
      .get(`${API_END_POINT}/api/task/${batchId}/list/weightage`, { headers })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Success") {
          setWeighatages(res.data.data);
        }
      });
  }, []);

   return (
    <div
      className="weightage-main-container"
      style={{ height: 550, overflowY: "scroll" }}
    >
      <div
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
              console.log(taskWeightage);
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
                      style={{ width: "170px" }}
                      placeholder={"Select Weightage"}
                      value={taskWeightage.weightage}
                      onChange={(value) =>
                        handleWeightageChange(value, index, "weightage")
                      }
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
                      className="task-weight-value-selector"
                      style={{
                        border: "1px solid #eaeaea",
                        borderRadius: 4,
                        width: "100%",
                        paddingTop: 7.5,
                        paddingBottom: 7.5,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    />
                  </div>
                  <div className="weightage-unit-container flex">
                    <div className="weightage-action">
                      {/* Show the delete icon only if weightage is greater than 0 */}
                      <span onClick={() => handleDeleteWeightage(taskWeightage.id,index)}>
                        <img
                          src="/icons/deleteIcon.svg"
                          alt="delete-icon"
                          className="delete-icon"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="add-weightage-button">
          <button
            className="btn create-btn"
            style={{ padding: 15, cursor: "pointer" }}
            onClick={handleAddWeightage}
          >
            + Add Weightage
          </button>
        </div>
        <div>
          <div className="apply-weightage">
            <button
              className="btn primary-medium"
              onClick={() => handleSaveWeightage()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightageList;