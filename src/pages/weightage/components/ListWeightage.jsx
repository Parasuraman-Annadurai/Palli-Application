import React from "react";

import Card from "antd/es/card/Card";

const ListWeightage = ({ listWeightage, handleDelete, handleEdit }) => {
  return (
    <div className="list-weightages">
      {listWeightage.map((weightage, index) => (
        <Card className="list-weightage-card" key={index}>
          <div className="weightage-content">
            <div>
              <p>{weightage.weightage}</p>
            </div>
            <div className="more">
              <span
                className="material-symbols-outlined custom-icon edit-btn"
                onClick={() => handleEdit(weightage.id)}
              >
                edit
              </span>
              <span
                className="material-symbols-outlined custom-icon delete-btn"
                onClick={() => handleDelete(weightage.id)}
              >
                delete
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ListWeightage;
