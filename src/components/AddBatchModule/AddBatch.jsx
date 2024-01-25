import React, { useState, useEffect } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import { DatePicker, Modal, notification, Drawer, Tooltip } from "antd";

import { CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";

import { useAuth } from "../../context/AuthContext";

import { API_END_POINT } from "../../../config";

import "./scss/AddBatch.css";

const AddBatch = (props) => {
  const { showSwitchBatch, setShowSwitchBatch, batchList, setBatchList } =
    props;

  const { user, token } = useAuth();
  const navigate = useNavigate();
  const company = 1;
  // const [loading, setLoading] = useState(false);
  const [batch_name, setBatchName] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [startError, setStartError] = useState("");
  const [endError, setEndError] = useState("");
  const [batchNameError, setBatchNameError] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [editId, setEditId] = useState(null);
  const [batchinputs, setBatchInputs] = useState(false);
  const [batchShow, setBatchshow] = useState(true);

  // const [buttonText, setButtonText] = useState("Add New Batch");

  useEffect(() => {
    if (!showSwitchBatch) {
      setBatchInputs(false);
      setBatchshow(true);
    }
  }, [showSwitchBatch]);

  const handleSwitch = (batch) => {
    //   <Modal
    //   open={true}
    //   title={`Confirm Switch to ${batch.batch_name}`}
    //   content= {`Are you sure you want to Switch this Batch?`}
    //   onOk={() => {
    //     navigate(`/batch/${batch.id}/applications`);
    //     window.location.reload();
    //   }}

    //   onCancel={() => {
    //     // setIsDeleteModalOpen(false);
    //     // setIsDraft(false);

    //   }}
    //   okButtonProps={{
    //     style: { background: "#49a843", borderColor: "#EAEAEA" },
    //   }}
    // >
    //   <p>{`${
    //     isDraft
    //       ? "Are you sure you want to discard the changes"
    //       : "Are you sure you want to delete"
    //   } ${type} ${
    //     assessmentList.find((asses) => asses.id === editId).task_title
    //   }?`}</p>
    // </Modal>

    Modal.confirm({
      title: `Confirm Switch to ${batch.batch_name}`,
      content: "Are you sure you want to Switch this Batch?",
      onOk: () => {
        navigate(`/batch/${batch.id}/applications`);
        window.location.reload();
      },
      // Attach the ref to the modal
    });
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

    const startDateObj = new Date(start_date);
    const endDateObj = new Date(end_date);

    if (startDateObj >= endDateObj) {
      setStartError("Start date should be earlier than end date");
      setEndError("End date should be later than start date");
      hasError = true;
    }

    const newBatchName = batch_name.trim().toLowerCase();

    if (editId) {
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

  const handleCLick = (e) => {
    // setLoading(true);
    e.preventDefault();
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
          resetFields();
          // setLoading(false);
          setBatchInputs(false);
          setBatchshow(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEditClick = (batch) => {
    setEditId(batch.id);
    setSelectedBatch(batch);

    setBatchName(batch.batch_name);
    setStartDate(dayjs(batch.start_date));
    setEndDate(dayjs(batch.end_date));
    setBatchNameError(null);
  };

  const handleUpdate = (e) => {
    // setLoading(true);

    e.preventDefault();
    const hasError = validateForm();

    if (!hasError) {
      const updatedBatch = {
        batch_name: batch_name.trim(),
        start_date: dayjs(start_date).format("YYYY-MM-DD"),
        end_date: dayjs(end_date).format("YYYY-MM-DD"),
        id: editId,
      };

      const headers = {
        Authorization: `Bearer ${token.access}`,
        "Content-type": "application/json",
      };

      axios
        .put(`${API_END_POINT}/api/update/batch/${editId}/`, updatedBatch, {
          headers,
        })
        .then((res) => {
          const updatedData = batchList.map((item) => {
            if (item.id === editId) {
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
          resetFields();
          setBatchInputs(false);
          setBatchshow(true);
          setEditId(null);

          notification.success({
            message: "Success",
            description: "Batch Updated Successfully",
            duration: 3,
          });
          // setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {/* <Button type="primary" onClick={showDrawer}>
        Open
      </Button> */}
      <Drawer
        // title={batchShow ? "Switch Batch" : editId ? "Edit Batch" : "Add Batch"}
        title={
          <div
            style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Roboto" }}
          >
            {batchShow ? "Switch Batch" : editId ? "Edit Batch" : "Add Batch"}
          </div>
        }
        onClose={props.onClose}
        open={props.open}
        placement="left"
      >
        {props.open && (
          <div className="popup-container">
            <div className="popup-content">
              {/* <div className="inner-content flex">
                <h3>
                  {batchShow
                    ? "Switch Batch"
                    : editId
                    ? "Edit Batch"
                    : "Add Batch"}
                </h3>

                <div className="close-icon">
                  <img
                    src="/icons/Cancel.svg"
                    className="cancel-btn"
                    alt=""
                    onClick={() => {
                      setShowSwitchBatch(false),
                        setBatchshow(true),
                        setBatchInputs(false);
                    }}
                  />
                </div>
              </div> */}
              <div className="add-batch">
                <button
                  className="add-batch-btn"
                  onClick={() => {
                    setBatchInputs(!batchinputs);
                    setBatchshow(!batchShow);
                    resetFields();
                  }}
                >
                  {batchinputs ? (
                    <>
                      <span>
                        <img src="/icons/backIcon.svg" alt="backicon" />
                      </span>{" "}
                      Switch Batch
                    </>
                  ) : (
                    <>
                      <span>+</span> Add New Batch
                    </>
                  )}
                </button>
              </div>

              {batchinputs && (
                <form onSubmit={editId ? handleUpdate : handleCLick}>
                  <div className="input-fields">
                    <div className="input-field">
                      <p>Batch Name</p>
                      <input
                        className={`batch-inputs  ${
                          batchNameError ? "error-notify" : ""
                        }`}
                        type="text"
                        placeholder="Enter the Batch"
                        name="batchName"
                        value={batch_name}
                        onChange={handleBatchNameChange}
                        autoComplete="off"
                      />
                      <p className="error-message">
                        {batchNameError && (
                          <span style={{ color: "red" }}>{batchNameError}</span>
                        )}
                      </p>
                    </div>

                    <div className="input-field">
                      <p>Start Year</p>
                      <DatePicker
                        className={`datepicker ${
                          startError ? "error-notify" : ""
                        }`}
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
                    </div>
                    <div className="input-field">
                      <p>End Year</p>
                      <DatePicker
                        className={`datepicker ${
                          endError ? "error-notify" : ""
                        }`}
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

                    {editId ? (
                      <button
                        className="btn primary-medium "
                        // disabled={loading}
                      >
                        {/* {loading ? ( */}
                        <span>
                          {/* Updating Batch... */}
                          {/* <LoadingOutlined className="loader" /> */}
                        </span>
                        {/* ) : ( */}
                        Update Batch
                        {/* // )} */}
                      </button>
                    ) : (
                      <button
                        className="btn primary-medium"
                        // disabled={loading}
                      >
                        {/* {loading ? ( */}
                        <span>
                          {/* Creating Batch... */}
                          {/* <LoadingOutlined className="loader" /> */}
                        </span>
                        {/* ) : ( */}
                        Create Batch
                        {/* )} */}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
            <div className="switch-batch-list-container">
              {batchShow && batchList.length > 0 && (
                <>
                  {batchList.map((batch, index) => (
                    <>
                      <div className="switchbatch-container">
                        <div
                          className="switch-batch-card flex"
                          onClick={() => handleSwitch(batch)}
                          key={index}
                        >
                          <div className="batch-left-side flex">
                            <div className="batch-name-year">
                              {batch.batch_name.length > 30 ? (
                                <Tooltip title={batch.batch_name}>
                                  <h4>
                                    {batch.batch_name.length > 30
                                      ? `${batch.batch_name.slice(0, 30)}...`
                                      : batch.batch_name}
                                  </h4>
                                </Tooltip>
                              ) : (
                                <h4>{batch.batch_name}</h4>
                              )}

                              <p>
                                {batch.start_date.slice(0, 4)} -{" "}
                                {batch.end_date.slice(0, 4)}
                              </p>
                            </div>
                            {/* Uncomment the following lines if needed */}
                            {/* <div className="tag">
                        <span>Internship</span>
                      </div> */}
                          </div>
                          {/* Uncomment the following lines if needed */}
                        </div>
                        <div className="batch-right-side">
                          <img
                            className="edit-icon"
                            src="/icons/edit-pencil.svg"
                            alt=""
                            onClick={() => {
                              handleEditClick(batch);
                              setBatchshow(false);
                              setBatchInputs(true);
                            }}
                          />
                        </div>
                      </div>
                    </>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default AddBatch;
