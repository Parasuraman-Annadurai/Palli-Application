import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Select, notification } from "antd";
import axios from "axios";

import { API_END_POINT } from "../../config";

import { useAuth } from "../context/AuthContext";


const WeightageList = ({ taskId, selectedWeightage, setSeletedWeightage,appliedWeightage }) => {
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

  const handleAddWeightage = () => {
    const copyWeightage = [
      ...selectedWeightage,
      { weightage: null, weightage_percentage: null },
    ];
    setSeletedWeightage(copyWeightage);
   
    selectedWeightage.map((weightage)=>{
      const url = `${API_END_POINT}/api/task/${batchId}/assign/task_weightage/${taskId}`
      axios.post(url,{...weightage},{headers}).then((res)=>{
        console.log(res);
      }).catch((error)=>{
        console.log(error);
      })
    })
  };

  const handleDeleteWeightage = (deleteIndex) => {
    const copyWeightage = [...selectedWeightage];
    copyWeightage.splice(deleteIndex, 1);

    
    const removeWeightageId = appliedWeightage[deleteIndex]["id"];
    const url = `${API_END_POINT}/api/task/${batchId}/delete/task_weightage/${removeWeightageId}`;

    console.log(url);

    axios.delete(url,{headers}).then((res)=>{
     if(res.data.status === 200){
       notification.success({
        message:"Success",
        description:`${res.data.message}`
       });
       setSeletedWeightage(copyWeightage);

     }
    }).catch((error)=>{
      console.log(error);
    })

  };

  const handleWeightageChange = (value, index) => {
    const copyWeightage = [...selectedWeightage];
    copyWeightage[index]["weightage"] = value;
    setSeletedWeightage(copyWeightage);
  };
  const handleInputChange = (value, index) => {
   const copyWeightage = [...selectedWeightage];
   copyWeightage[index]["weightage_percentage"] = Number(value);
   setSeletedWeightage(copyWeightage)

  }
  return (
    <>
      <div className="weightage-adding-container flex">
        <div className="weight-inputs">
          {selectedWeightage.map((slectWeightage,index)=>{
            return(
              <div key={index}>
              <Select
                style={{ width: "100px" }}
                placeholder={"Select Weightage"}
                value={slectWeightage.weightage}
                onChange={(value) => handleWeightageChange(value, index)}
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
              <input
                type="number"
                value={slectWeightage.weightage_percentage}
                onChange={(e)=>handleInputChange(e.target.value,index)}
                className="task-weight-value-selector"
                style={{ border: "1px solid grey" }}
              />
              <div className="weightage-unit-container flex">
                <div className="weightage-action">
                  {/* Show the delete icon only if weightage is greater than 0 */}
                  <span onClick={() => handleDeleteWeightage(index)}>
                      Delete
                    </span>
                </div>
              </div>
            </div>
            )
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
      </div>
    </>
  );
};

export default WeightageList;
