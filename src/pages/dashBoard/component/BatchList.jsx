import React from "react";

import { Link } from "react-router-dom";

import { Tooltip } from "antd";

import "../DashBoard.css";

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
            <div className="added-batches">
              <div className="batches_list">
                <Tooltip placement="top" title={batch.batch_name}>
                  <h3 className="batch_name">
                    {batch.batch_name.length > 12
                      ? `${batch.batch_name.slice(0, 12)}...`
                      : batch.batch_name}
                  </h3>
                </Tooltip>
                <div className="years">
                  <p className="start_date">{batch.start_date.slice(0, 4)}</p>
                  <p className="start_date">to</p>
                  <p className="end_date">{batch.end_date.slice(0, 4)}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default BatchList;
