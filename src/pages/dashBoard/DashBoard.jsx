import React, { useState, useEffect } from "react";
import dashBoardHeaderImage from "../../../public/images/dashboard_header_image.svg";
import useAPI from "../../hooks/useAPI";
import { Button, Modal, Input, DatePicker, Skeleton } from "antd";
import { API_END_POINT } from "../../../config";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./DashBoard.css";
import BacthList from "./component/BatchList";
const DashBoard = () => {
  
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { data: batchList, loading, makeNetworkRequest } = useAPI();


  const [isModalOpen, setIsModalOpen] = useState(false);
  /* i have told mulitple times , dont use batch_name  use the convention*/
  const [batch_name, setBatchName] = useState("");
    /* i have told mulitple times , dont use batch_name  use the convention*/

  const [start_date, setStartYear] = useState("");
    /* i have told mulitple times , dont use batch_name  use the convention*/

  const [end_date, setEndYear] = useState("");
  /*are we using this, if not remove it*/
  const [company, setCompany] = useState(1);

  const [batchNameError, setBatchNameError] = useState(null);
  const [startError, setStartError] = useState(null);
  const [endError, setEndError] = useState(null);

  /* instead of this, just set editId*/
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  useEffect(() => {

    /* keep this headers in useapi*/
    makeNetworkRequest(
      "http://13.232.90.154:8000/api/list/batch/",
      "GET",
      null,
      {
        headers: {
          Authorization: `Bearer ${token.access}`,
          "Content-Type": "application/json",
        },
      }
    );
  }, []);

  /* for this single line we dont need new function just do the set state in onclick itself*/
  const showModal = () => {
    setIsModalOpen(true);
  };

  /* change this func name to handleClose */
  const handleCancel = () => {
    setIsModalOpen(false);
    resetFields();
    setIsEditMode(false)
  };

  const resetFields = () => {
    setBatchName("");
    setStartYear("");
    setEndYear("");
    setBatchNameError(null);
    setStartError(null);
    setEndError(null);
  };

  const handleDateChange = (dateString, setter, setError, errorKey) => {
    setter(dateString);
    setError(null);
  };
  const handleBatchNameChange = (e) => {
    const input = e.target.value;
    /* dont prevent here, they should be able to type anything once they click submit and then show the erros*/
   
    const regex = /^[A-Za-z0-9\- ]*$/;

    if (regex.test(input)) {
      setBatchName(input);
      setBatchNameError(null);
    } else {
      setBatchNameError(
        "Batch name can only contain text, numbers, '-' symbol, and spaces"
      );
    }
  };

  /* move this to utility and change the func name to validateBatch*/
  const validateForm = () => {
    let hasError = false;

    if (!batch_name.trim()) {
      setBatchNameError("Batch name is required");
      hasError = true;
    }

    if (!start_date) {
      setStartError("Start date is required");
      hasError = true;
    }

    if (!end_date) {
      setEndError("End date is required");
      hasError = true;
    }

    if (start_date === end_date) {
      setStartError("Start date should not be equal to end date");
      setEndError("End date should not be equal to start date");
      hasError = true;
    }

    const startDateObj = new Date(start_date);
    const endDateObj = new Date(end_date);

    if (startDateObj >= endDateObj) {
      setStartError("Start date should be earlier than end date");
      setEndError("End date should be later than start date");
      hasError = true;
    }

    const newBatchName = batch_name.trim().toLowerCase();

    if (isEditMode) {
      const existingBatchNames = batches
        .filter((batch) => batch.id !== selectedBatch.id)
        .map((batch) => batch.batch_name.toLowerCase());

      if (existingBatchNames.includes(newBatchName)) {
        setBatchNameError("Batch name already exists");
        hasError = true;
      }
    } else {
      const existingBatchNames = batches.map((batch) =>
        batch.batch_name.toLowerCase()
      );

      if (existingBatchNames.includes(newBatchName)) {
        setBatchNameError("Batch name already exists");
        hasError = true;
      }
    }

    return hasError;
  };

  /* typo handleCL*/
  const handleCLick = () => {
    const hasError = validateForm();

    if (!hasError) {
      const batch = {
        batch_name: batch_name.trim(),
        company,
        start_date,
        end_date,
      };

      makeNetworkRequest(
        "http://13.232.90.154:8000/api/create/batch/",
        "POST",
        batch,
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
            "Content-Type": "application/json",
          },
        }
      );

      handleCancel();
      navigate("/dashboard");
    }
  };

  const handleEditClick = (batch) => {
    setSelectedBatch(batch);
    setIsModalOpen(true);
    setIsEditMode(true);
    setBatchName(batch.batch_name);
    setStartYear(batch.start_date);
    setEndYear(batch.end_date);
    setBatchNameError(null);
  };

  
  const handleUpdate = () => {
    const hasError = validateForm();

    if (!hasError) {
      const updatedBatch = {
        ...selectedBatch,
        batch_name: batch_name.trim(),
        start_date,
        end_date,
      };

      makeNetworkRequest(
        `${API_END_POINT}/api/update/batch/${selectedBatch.id}/`,
        "PUT",
        updatedBatch,
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
            "Content-Type": "application/json",
          },
        }
      );

      handleCancel();
    }
  };

  /*remove this line and add batchList.data directly , dont need addtional variable*/
  const batches = batchList.data || [];

  return (
    <div className="content">
      <div className="greeting">
        <div className="heading">
          <h1>
            {/* check using ?. or in operator */}
            Welcome, {user.first_name} {user.last_name} <br />
          </h1>
          <p>
            You have two batch students added to your domain. Please reach out
            to <br />
            the Head Teacher if you want them excluded from your domain.
          </p>
        </div>

        <div className="header__img">
          <img src={dashBoardHeaderImage} alt="DashboardHeaderImage" />
        </div>
      </div>

      <div className="add__batch">
        <div className="batches__list">
          <div className="add-btn">
              {/* Add Batch is ok change the case */}

            <Button className="cards" type="primary" onClick={showModal}>
              ADD BATCH
            </Button>
          </div>

      {/* Move this as seperate component AddBatch.jsx */}
          <Modal
            title={isEditMode ? "Edit Batch" : "Add Year to Year Batch"}
            className="Yearpicker"
            open={isModalOpen}
            onOk={isEditMode ? handleUpdate : handleCLick}
            onCancel={handleCancel}
            okText={isEditMode ? "Update" : "Add Batch"}
          >
            <div>
              <Input
                placeholder="Enter Batch Name"
                value={batch_name}
                onChange={handleBatchNameChange}
              />
              {batchNameError && (
                <span style={{ color: "red" }}>{batchNameError}</span>
              )}

              <DatePicker
                format="YYYY-MM-DD"
                onChange={(date, dateString) =>
                  handleDateChange(
                    dateString,
                    setStartYear,
                    setStartError,
                    "startError"
                  )
                }
                placeholder="Start Year"
              />

              {startError && <span style={{ color: "red" }}>{startError}</span>}

              <DatePicker
                format="YYYY-MM-DD"
                onChange={(date, dateString) =>
                  handleDateChange(
                    dateString,
                    setEndYear,
                    setEndError,
                    "endError"
                  )
                }
                placeholder="End Year"
              />
              {endError && <span style={{ color: "red" }}>{endError}</span>}
            </div>
          </Modal>
          {loading ? (
            <Skeleton active paragraph={{ rows: 4 }} />
          ) : (
            <>
            {/*Spelling mistake */}
              <BacthList batchesList={batches} handleEditClick={handleEditClick}/>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

//keep this file as minimun as below 150 lines
// where is proptype?