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
  handleWeightageChange
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



  const handleDeleteWeightage = (deleteIndex) => {
    const copyWeightage = [...taskWeightages];
    copyWeightage.splice(deleteIndex, 1);

    const removeWeightageId = appliedWeightage[deleteIndex]["id"];
    const url = `${API_END_POINT}/api/task/${batchId}/delete/task_weightage/${removeWeightageId}`;

    axios
      .delete(url, { headers })
      .then((res) => {
        if (res.data.status === 200) {
          notification.success({
            message: "Success",
            description: `${res.data.message}`,
          });
          setSeletedWeightage(copyWeightage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <>
      <div className="weightage-adding-container flex" >
        <div className="weight-inputs" >
          {taskWeightages.map((taskWeightage, index) => {
            console.log(taskWeightage);
            return (
              <>
                <div className="weightage-select">
                  <Select
                    style={{ width: "100px" }}
                    placeholder={"Select Weightage"}
                    value={taskWeightage.weightage}
                    onChange={(value) => handleWeightageChange(value, index,"weightage")}
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
                <div className="percentage">
                  <input
                    type="text"
                    value={taskWeightage.weightage_percentage}
                    onChange={(e) => handleWeightageChange(e.target.value, index,"weightage_percentage")}
                    className="task-weight-value-selector"
                    style={{ border: "1px solid grey" }}
                  />
                </div>
                <div className="weightage-unit-container flex">
                  <div className="weightage-action">
                    {/* Show the delete icon only if weightage is greater than 0 */}
                    <span onClick={() => handleDeleteWeightage(index)}>
                      Delete
                    </span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="add-weightage-button">
          <button
            className="btn secondary-medium-icon"
            onClick={handleAddWeightage}
          >
            Add Weightage
          </button>
        </div>

        <div className="apply-weightage">
          <button onClick={()=>handleSaveWeightage()}>Save</button>
        </div>
      </div>
    </>
  );
};

export default WeightageList;
