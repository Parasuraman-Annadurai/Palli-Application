import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_END_POINT } from "../../config";
import { useAuth } from "../context/AuthContext";
import { useForm, Controller } from "react-hook-form";
const WeightageList = () => {
  const { id: batchId } = useParams();
  const { token } = useAuth();
  const [weightages, setWeighatages] = useState([]);

  const { control } = useForm();

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
  return (
    <>
      <div className="weightage-label-container flex">
        <h3>Weightage</h3>
        <div className="horizon-line"></div>
      </div>

      <div className="weightage-adding-container">
        <div className="weight-inputs">
          <p>Weightage</p>
          <div className="weightage-unit-container flex">
            <Controller
              name="selectedWeightage"
              control={control}
              render={({ field }) => (
                <select
                  className="task-weightage-selector"
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                >
                  <option value="" disabled selected hidden>
                    Select Weightage...
                  </option>
                  {weightages.map((weightage, index) => (
                    <option value={weightage.id} key={index}>
                      {weightage.weightage}
                    </option>
                  ))}
                </select>
              )}
            />

            <Controller
              name="weightage_percentage"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  className="task-weight-value-selector"
                  placeholder="00"
                />
              )}
            />

            <div className="weightage-action">
              <span className="btn increment-btn">+</span>
              <span className="btn decrement-btn">-</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeightageList;
