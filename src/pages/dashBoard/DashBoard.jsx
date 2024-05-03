import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Modal, Input, DatePicker, Skeleton, notification } from "antd";
import dayjs from "dayjs";
import axios from "axios";

import BacthList from "./component/BatchList";

import { useAuth } from "../../context/AuthContext";

import { API_END_POINT } from "../../../config";

import "./scss/Dashboard.css";

const DashBoard = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [batchList, setBatchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [batch_name, setBatchName] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [company, setCompany] = useState(1);

  const [startError, setStartError] = useState("");
  const [endError, setEndError] = useState("");
  const [batchNameError, setBatchNameError] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      const headers = {
        Authorization: `Bearer ${token.access}`,
        "Content-type": "application/json",
      };
      axios
        .get(`${API_END_POINT}/api/list/batch`, { headers })
        .then((res) => {
          setBatchList(res.data.data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    resetFields();
    setIsEditMode(false);
  };

  const resetFields = () => {
    setBatchName("");
    setStartDate("");
    setEndDate("");
    setBatchNameError(null);
    setStartError(null);
    setEndError(null);
  };

  const handleDateChange = (dateString, setDate, setError, errorType) => {
    // setter(dateString);
    // setError(null);
    if (dateString === "") {
      setError("Date cannot be empty");
    } else {
      setDate(dateString);
      setError("");
    }
  };

  const handleBatchNameChange = (e) => {
    const input = e.target.value;
    const regex = /^[A-Za-z0-9\- ]*$/;

    if (regex.test(input) || input === "") {
      const formattedBatchName = input
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      setBatchName(formattedBatchName);
      setBatchNameError(null);
    } else {
      setBatchNameError(
        "Batch name can only contain text, numbers, '-' symbol, and spaces"
      );
    }
  };

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
      const existingBatchNames = batchList
        .filter((batch) => batch.id !== selectedBatch.id)
        .map((batch) => batch.batch_name.toLowerCase());

      if (existingBatchNames.includes(newBatchName)) {
        setBatchNameError("Batch name already exists");
        hasError = true;
      }
    } else {
      const existingBatchNames = batchList.map((batch) =>
        batch.batch_name.toLowerCase()
      );

      if (existingBatchNames.includes(newBatchName)) {
        setBatchNameError("Batch name already exists");
        hasError = true;
      }
    }

    return hasError;
  };

  const handleCLick = () => {
    const hasError = validateForm();

    if (!hasError) {
      const batchData = {
        batch_name: batch_name.trim(),
        company,
        start_date,
        end_date,
      };

      const headers = {
        Authorization: `Bearer ${token.access}`,
        "Content-type": "application/json",
      };
      axios
        .post(`${API_END_POINT}/api/create/batch/`, batchData, { headers })
        .then((res) => {
          const newBatch = { ...batchData, ...res.data.data };
          const updatedArray = [...batchList, newBatch];
          setBatchList(updatedArray);
          notification.success({
            message: "Success",
            description: "Batch Created Successfully",
            duration: 3,
          });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });

      handleCancel();
      navigate("/dashboard");
    }
  };
  const [EditId, setEditId] = useState();

  const handleEditClick = (batch) => {
    setEditId(batch.id);
    setIsEditMode(batch.id);
    setSelectedBatch(batch);
    setIsModalOpen(true);
    setIsEditMode(true);
    setBatchName(batch.batch_name);
    setStartDate(dayjs(batch.start_date));
    setEndDate(dayjs(batch.end_date));
    setBatchNameError(null);
  };

  const handleUpdate = () => {
    const hasError = validateForm();

    if (!hasError) {
      const updatedBatch = {
        batch_name: batch_name.trim(),
        start_date: dayjs(start_date).format("YYYY-MM-DD"),
        end_date: dayjs(end_date).format("YYYY-MM-DD"),
        id: EditId,
      };

      const headers = {
        Authorization: `Bearer ${token.access}`,
        "Content-type": "application/json",
      };

      axios
        .put(`${API_END_POINT}/api/update/batch/${EditId}/`, updatedBatch, {
          headers,
        })
        .then((res) => {
          const updatedData = batchList.map((item) => {
            if (item.id === EditId) {
              return {
                ...item,
                batch_name: batch_name.trim(),
                start_date: dayjs(start_date).format("YYYY-MM-DD"),
                end_date: dayjs(end_date).format("YYYY-MM-DD"),
                // Add other properties you want to update
              };
            }
            return item;
          });

          setBatchList(updatedData);
          notification.success({
            message: "Success",
            description: "Batch Updated Successfully",
            duration: 3,
          });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });

      handleCancel();
    }
  };
  return (
    <div className="content">
      <div className="greeting flex">
        <div className="welcome-text">
          <h1 className="welcome-message">
            Welcome, {user.first_name} {user.last_name} <br />
          </h1>
          <p>
            You have two batch students added to your domain. Please reach out
            to <br />
            the Head Teacher if you want them excluded from your domain.
          </p>
        </div>
        <div className="header-img">
          <img
            src="/images/dashboard_header_image.svg"
            alt="DashboardHeaderImage"
          />
        </div>
      </div>

      <div className="add__batch">
        <div className="batches__list">
          {loading ? (
            <Skeleton active paragraph={{ rows: 4 }} />
          ) : (
            <>
              <div className="add-btn">
                <Button
                  className="cards batch-card"
                  type="primary"
                  onClick={showModal}
                >
                  <h3 style={{ width: "215px" }}>
                    <span style={{ fontSize: 18, marginRight: 5 }}>+</span>
                    ADD BATCH
                  </h3>
                </Button>
              </div>

              <Modal
                title={isEditMode ? "Edit Batch" : "Add Year to Year Batch"}
                className="Yearpicker"
                open={isModalOpen}
                onOk={isEditMode ? handleUpdate : handleCLick}
                onCancel={handleCancel}
                okText={isEditMode ? "Update" : "Add Batch"}
                maskClosable={false}
              >
                <div>
                  <div className="batch_name">
                    <label htmlFor="">Batch Name</label>
                    <Input
                      placeholder="Enter Batch Name"
                      value={batch_name}
                      onChange={handleBatchNameChange}
                    />

                    <p className="error-message">
                      {batchNameError && (
                        <span style={{ color: "red" }}>{batchNameError}</span>
                      )}
                    </p>
                  </div>

                  {/* <div className="start_year">
                    <label htmlFor="">Start Year</label>
                  </div>
                  <DatePicker
                    format="YYYY-MM-DD"
                    value={dayjs(start_date)}
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
                  <p className="error-message">
                    {startError && (
                      <span style={{ color: "red" }}>{startError}</span>
                    )}
                  </p>

                  <div className="end_year">
                    <label htmlFor="">End Year</label>
                  </div>
                  <DatePicker
                    format="YYYY-MM-DD"
                    value={dayjs(end_date)}
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
                  <p className="error-message">
                    {endError && (
                      <span style={{ color: "red" }}>{endError}</span>
                    )}
                  </p> */}
                  <div className="start_year">
                    <label htmlFor="startYearInput">Start Year</label>
                  </div>
                  <DatePicker
                    className="batch-inputs"
                    id="startYearInput"
                    format="YYYY-MM-DD"
                    value={start_date ? dayjs(start_date) : null}
                    onChange={(date, dateString) =>
                      handleDateChange(
                        dateString,
                        setStartDate,
                        setStartError,
                        "startError"
                      )
                    }
                    placeholder="Start Year"
                  />
                  <p className="error-message">
                    {startError && (
                      <span style={{ color: "red" }}>{startError}</span>
                    )}
                  </p>

                  <div className="end_year">
                    <label htmlFor="endYearInput">End Year</label>
                  </div>
                  <DatePicker
                    className="batch-inputs"
                    id="endYearInput"
                    format="YYYY-MM-DD"
                    value={end_date ? dayjs(end_date) : null}
                    onChange={(date, dateString) =>
                      handleDateChange(
                        dateString,
                        setEndDate,
                        setEndError,
                        "endError"
                      )
                    }
                    placeholder="End Year"
                  />
                  <p className="error-message">
                    {endError && (
                      <span style={{ color: "red" }}>{endError}</span>
                    )}
                  </p>
                </div>
              </Modal>

              <BacthList
                batchesList={batchList}
                handleEditClick={handleEditClick}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
