
import React from "react";

const BatchList = ({ batchesList, handleEditClick }) => {
  return (
    <>
      {batchesList.map((batch, index) => (
        <div className="main__batches batch-card" key={index}>
          <span
            onClick={() => handleEditClick(batch)}
            className="material-symbols-outlined edit__icon"
          >
            edit
          </span>
          <a href={`/batch/${batch.id}/applications`}>
            <div className="added-batches "> 
              <div className="batches_list">
                <h3 className="batch_name">{batch.batch_name}</h3>
                <div className="years">
                  <p className="start_date">{batch.start_date.slice(0, 4)}</p>
                  <p className="end_date">{batch.end_date.slice(0, 4)}</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </>
  );
};

export default BatchList;
