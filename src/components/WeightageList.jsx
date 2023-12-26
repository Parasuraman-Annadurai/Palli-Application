import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_END_POINT } from "../../config";
import { useAuth } from "../context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import { Select, notification } from "antd";
const WeightageList = () => {
  const { id: batchId } = useParams();
  const { token } = useAuth();
  const [weightages, setWeighatages] = useState([]);
  const [selectWeightages, setSelectWeightages] = useState([{}]);
  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };

  useEffect(() => {
    axios
      .get(`${API_END_POINT}/api/task/140/list/weightage`, { headers })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Success") {
          setWeighatages(res.data.data);
        }
      });
  }, []);
  const remainingPercentage =
    100 -
    selectWeightages.reduce(
      (acc, curr) => acc + (curr.weightage_percentage || 0),
      0
    );

  const handleAddSelect = () => {
    let sum = 0;

    for (let i = 0; i < selectWeightages.length; i++) {
      sum += selectWeightages[i].weightage_percentage;
    }

    if (sum < 100 && sum !== 100) {
      setSelectWeightages([
        ...selectWeightages,
        { weightage: "", weightage_percentage: "" },
      ])
    } else {
      notification.warning({
        message: "Warning",
        description:
          "Total weightage cannot exceed 100% or no remaining percentage available",
        duration: 3,
      });
    }
  };
  const handleWeightageChange = (value, index) => {
    const updatedValues = [...selectWeightages];
    updatedValues[index].weightage = value;
    setSelectWeightages(updatedValues);
  };
  const handleInputChange = (value, index) => {
    let weightagePercentage = Number(value);

  if (weightagePercentage === 0 || value === '') {
    setError(`weightage_percentage`, {
      type: "manual",
      message: "Weightage percentage is required",
    });
    return;
  }

  if (weightagePercentage > 0 && weightagePercentage <= 100) {
    const updatedValues = [...selectWeightages];
    updatedValues[index].weightage_percentage = weightagePercentage;
    setSelectWeightages(updatedValues);
    clearErrors(`weightage_percentage`);
  } else {
    setError(`weightage_percentage`, {
      type: "manual",
      message: "Weightage must be between 0 and 100",
    });
  }
  };
  const handleDeleteSelect = (index) => {
    const updatedWeightages = [...selectWeightages];
    updatedWeightages.splice(index, 1);
    setSelectWeightages(updatedWeightages);
  };

  console.log(errors);
  return (
    <>
      {/* <div className="weightage-label-container flex">
        <h3>Weightage</h3>
        <div className="horizon-line"></div>
      </div>

      <div className="weightage-adding-container">
        <div className="weight-inputs">
          <p>Weightage</p>
          {selectWeightages.map((weightage, index) => {
            return (
              <>
                <div className="weightage-unit-container flex" key={index}>
                  <Controller
                    name={`weightage`}
                    rules={{required:"weightage is required"}}

                    control={control}
                    render={({ field }) => (
                      <Select
                        style={{ width: "200px" }}
                        placeholder="Select Weightage..."
                        className={`${errors.weightage_percentage ? "error-notify":""}`}
                        value={weightage.weightage}
                        suffixIcon={<img src="/icons/dropdown.svg" />}
                        onChange={(value) =>
                          handleWeightageChange(value, index)
                        }
                      >
                  
                        {weightages.map((weightage, index) => (
                          <Select.Option value={weightage.id} key={index}>
                            {weightage.weightage}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  />

                  <Controller
                    name={`weightage_percentage`}
                    rules={{required:"weightage percentage is required"}}
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        className={`task-weight-value-selector ${errors.weightage_percentage ? "error-notify":""}`}

                        placeholder="00"
                        onChange={(e) =>
                          handleInputChange(e.target.value, index)
                        }
                      />
                    )}
                  />

                  <div className="weightage-action">
                    <span
                      className="btn increment-btn"
                      onClick={handleAddSelect}
                    >
                      +
                    </span>
                    <span className="btn decrement-btn">
                      {index > 0 ? (
                        (
                          <img
                          src="/icons/deleteIcon.svg"
                          style={{ width: "16px", height: "16px" }}
                          onClick={() => handleDeleteSelect(index)}
                        />
                       )
                      ) :(
                        <img
                        src="/icons/deleteIcon.svg"
                          style={{ width: "16px", height: "16px" ,display:"none"}}
                        />
                      )}
                    </span>
                  </div>
                </div>
              </>
            );
          })}
          <p className="error-message">
            {errors.weightage_percentage
              ? errors.weightage_percentage.message
              : ""}
          </p>
          <div className="remaining-percentage">
            Remaining Percentage: {remainingPercentage}%
          </div>
        </div>
      </div> */}
      <div>jj</div>
    </>
  );
};

export default WeightageList;

/*




*/
