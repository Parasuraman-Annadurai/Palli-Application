import React, { useState } from "react";

const WeightageList = () => {
  const [weightageData, setWeightageData] = useState([
    { id: 1, weightage: "", percentage: "" },
  ]);

  const addWeightage = () => {
    const newWeightageData = [...weightageData];
    const newId = weightageData.length + 1;

    newWeightageData.push({ id: newId, weightage: "", percentage: "" });
    setWeightageData(newWeightageData);
  };

  const deleteWeightage = (id) => {
    const newWeightageData = weightageData.filter((data) => data.id !== id);
    setWeightageData(newWeightageData);
  };

  const handleWeightageChange = (id, event) => {
    const { name, value } = event.target;

    const updatedWeightageData = weightageData.map((data) =>
      data.id === id ? { ...data, [name]: value } : data
    );

    setWeightageData(updatedWeightageData);
  };

  return (
    <>
      <div className="weightage-label-container flex">
        <h3>Weightage</h3>
        <div className="horizon-line"></div>
      </div>

      <div className="weightage-adding-container">
        {weightageData.map((item, index) => (
          <div className="weight-inputs" key={item.id}>
            <p>Weightage</p>
            <div className="weightage-unit-container flex">
              <select
                className="task-weightage-selector"
                onChange={(e) => handleWeightageChange(item.id, e)}
                value={item.weightage}
                name="weightage"
              >
                <option value="" disabled>
                  Select Weightage...
                </option>
                {/* Populate options here */}
              </select>

              <input
                type="number"
                className="task-weight-value-selector"
                placeholder="00"
                onChange={(e) => handleWeightageChange(item.id, e)}
                value={item.percentage}
                name="percentage"
              />

              <div className="weightage-action">
                <span className="btn decrement-btn" onClick={() => deleteWeightage(item.id)}> - </span>
              </div>
            </div>
          </div>
        ))}
        <div>
          <button onClick={addWeightage}>Add</button>
        </div>
      </div>
    </>
  );
};

export default WeightageList;
