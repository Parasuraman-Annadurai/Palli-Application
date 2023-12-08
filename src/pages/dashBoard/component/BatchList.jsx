
import React from "react";

import { Link } from "react-router-dom";
import "../DashBoard.css"
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
          <Link to={`/batch/${batch.id}/applications`} className="link">
          <div className="added-batches "> 
              <div className="batches_list">
                <h3 className="batch_name">{batch.batch_name}</h3>
                <div className="years">
                  <p className="start_date">{batch.start_date.slice(0, 4)}</p>
                  <p className="end_date">{batch.end_date.slice(0, 4)}</p>
                </div>
              </div>
            </div>
          </Link>
          {/* <a href={`/batch/${batch.id}/applications`}> */}
            
          {/* </a> */}
        </div>
      ))}
    </>
  );
};

export default BatchList;
