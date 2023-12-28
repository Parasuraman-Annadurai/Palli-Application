import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate, NavLink } from "react-router-dom";

import { Button, Modal, Input, DatePicker, Skeleton, notification } from "antd";

import axios from "axios";
import { useAuth } from "../context/AuthContext";

import { API_END_POINT } from "../../config";

const Sidebar = ({ menu, activeMenuItem }) => {
  const navigate = useNavigate();
  const { id: batchId } = useParams();
  const { token } = useAuth();

  const currentPath = useLocation().pathname;
  const isDashboardPage = currentPath === "/dashboard";
  const handleSwitch = (id, batchName) => {
    Modal.confirm({
      title: `Confirm Switch to ${batchName}`,
      content: "Are you sure you want to Switch this Batch?",
      onOk: () => {
        navigate(`/batch/${id}/applications`);
        setIsModalOpen(false);
        window.location.reload();
      },
    });
  };

  const [isActive, setIsActive] = useState({
    home: false,
    application: false,
    session: false,
    module: false,
    settings: false,
  });
  const [state, set] = "application";

  // {module:"task"};
  // "session"

  const [isSubActive, setIsSubActive] = useState({
    task: false,
    assessment: false,
    quiz: false,
  });
  const [isModuleActive, setIsModuleActive] = useState(false);

  const handleMainLinkClick = (link) => {
    const updateActive = { ...isActive };
    Object.keys(updateActive).forEach((key) => {
      const checkIsActive = key === link ? true : false;
      updateActive[key] = checkIsActive;
    });
    setIsActive(updateActive);
    if (link === "module") {
      setIsModuleActive(!isModuleActive);
    }
  };

  const handleSubLinkClick = (link) => {
    const updateSubActive = { ...isSubActive };
    Object.keys(updateSubActive).forEach((key) => {
      const checkIsSubActive = key === link ? true : false;
      updateSubActive[key] = checkIsSubActive;
    });
    setIsSubActive(updateSubActive);
  };
  const [showSwitchBatch, setShowSwitchBatch] = useState(false);
  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  useEffect(() => {
    axios.get(`${API_END_POINT}/api/list/batch/`, { headers }).then((res) => {
      setBatchList(res.data.data);
    });
  }, []);

  const [showInputFields, setShowInputFields] = useState(false);

  const [isAddingBatch, setIsAddingBatch] = useState(false); // New state for switching text

  const toggleInputFields = () => {
    setShowInputFields((prevState) => !prevState); // Toggle input fields visibility directly using prevState
    setIsAddingBatch(!showInputFields);

    // setBatchList(true)// Update text directly based on the current state of input fields
  };

  const [batchList, setBatchList] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const [batch_name, setBatchName] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [company, setCompany] = useState(1);

  const [startError, setStartError] = useState("");
  const [endError, setEndError] = useState("");
  const [batchNameError, setBatchNameError] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [errors, setErrors] = useState({
    batchNameError: "",
    startYearError: "",
    endYearError: "",
  });

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  const handleCancel = () => {
    // setIsModalOpen(false);
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
          console.log(error);
        })
        // .finally(() => {
        //   setLoading(false);
        // });

      handleCancel();
      navigate("/dashboard");
    }
  };
  const [EditId, setEditId] = useState();
  const handleEditClick = (batch) => {
    setEditId(batch.id);
    setIsEditMode(batch.id);
    setSelectedBatch(batch);
    // setIsModalOpen(true);
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
          console.log(error);
        })
        // .finally(() => {
        //   setLoading(false);
        // });

      handleCancel();
    }
  };

  const submitBatchData = () => {
    const batchData = {
      batchName: batch_name,
      startYear: start_date,
      endYear: end_date,
      // Add other properties as needed
    };
    const { batchName, startYear, endYear } = batchData;
    const newErrors = {
      batchNameError: batchName.trim() === "" ? "Please enter Batch Name" : "",
      startYearError: startYear.trim() === "" ? "Please enter Start Year" : "",
      endYearError: endYear.trim() === "" ? "Please enter End Year" : "",
    };

    if (Object.values(newErrors).every((errMsg) => errMsg === "")) {
      console.log("Submitting batch data:", batchData);
      setErrors({ batchNameError: "", startYearError: "", endYearError: "" });
      togglePopup(false);
    } else {
      setErrors(newErrors);
    }
  };
  const currentBatch = batchList?.filter((a) => a.id === Number(batchId));
  const {batch_name:batchName,start_date:startDate,end_date:endDate} = currentBatch[0] || []

  return (
    <>
      <nav className="side-nav-container flex">
        <div className="logo">
          <img src="/images/dckap_palli_logo_sm.svg" alt="DCKAP Palli logo" />
        </div>
        {!isDashboardPage && (
         <div className="batch-switch-container flex" onClick={()=>setShowSwitchBatch(!showSwitchBatch)}>
         <div className="batch-content-container flex">
           <div className="batch-logo">
             <p>B1</p>
           </div>
           <div className="batch-name">
             <p>{batchName ? batchName : ""}</p>
             <span>{startDate ? startDate.slice(0,4) :""}-{endDate ? endDate.slice(0,4) :""}</span>
           </div>
         </div>
         <div className="switch-icon">
           <img src="/icons/dropdown.svg" alt="" />
         </div>
       </div>
        )}

        <div className="nav-links">
          <ul>
            <li className={`main-link ${isActive.home ? "main-active" : ""}`}>
              <a
                href="#"
                className="flex"
                onClick={() => handleMainLinkClick("home")}
              >
                <img src="/icons/home.svg" alt="home icon" />
                <span>Home</span>
              </a>
            </li>
            {!isDashboardPage && (
              <>
                <li
                  className={`main-link ${
                    isActive.application ? "main-active" : ""
                  }`}
                >
                  <a
                    href={`/batch/${batchId}/applications`}
                    className="flex"
                    onClick={() => handleMainLinkClick("application")}
                  >
                    <img src="/icons/application.svg" alt="home icon" />
                    <span>Application</span>
                  </a>
                </li>
                <li
                  className={`main-link ${
                    isActive.session ? "main-active" : ""
                  }`}
                >
                  <a
                    href="#"
                    className="flex"
                    onClick={() => handleMainLinkClick("session")}
                  >
                    <img src="/icons/application.svg" alt="home icon" />
                    <span>Session</span>
                  </a>
                </li>
                <li
                  className={`main-link ${
                    isActive.module ? "main-active" : ""
                  }`}
                >
                  <a
                    href="#"
                    className="flex"
                    onClick={() => handleMainLinkClick("module")}
                  >
                    <img src="/icons/application.svg" alt="home icon" />
                    <span>Module</span>
                  </a>
                  {isModuleActive && (
                    <ul className="sub-links">
                      <li
                        className={`sub-link ${
                          isSubActive.task ? "sub-active" : ""
                        }`}
                        onClick={() => {
                          handleSubLinkClick("task");
                        }}
                      >
                        <a
                          href={`/batch/${batchId}/module/task`}
                          onClick={() => isModuleActive(true)}
                        >
                          Task
                        </a>
                      </li>
                      <li
                        className={`sub-link ${
                          isSubActive.assessment ? "sub-active" : ""
                        }`}
                        onClick={() => handleSubLinkClick("assessment")}
                      >
                        <a
                          href={`/batch/${batchId}/module/assessment`}
                          onClick={() => isModuleActive(true)}
                        >
                          Assessment
                        </a>
                      </li>
                      <li
                        className={`sub-link ${
                          isSubActive.quiz ? "sub-active" : ""
                        }`}
                        onClick={() => handleSubLinkClick("quiz")}
                      >
                        <a href="#" onClick={() => isModuleActive(true)}>
                          Quiz
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  className={`main-link ${
                    isActive.settings ? "main-active" : ""
                  }`}
                >
                  <a
                    href="#"
                    className="flex"
                    onClick={() => handleMainLinkClick("settings")}
                  >
                    <img src="/icons/application.svg" alt="home icon" />
                    <span>Settings</span>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="user-profile flex">
          <div className="profile-img">
            <img src="/icons/profile.svg" alt="" />
          </div>
          <div className="user-details">
            <p>Kate Bishop</p>
            <span>Trainer</span>
          </div>
        </div>
      </nav>

      {showSwitchBatch && (
        <div className="popup-container">
          <div className="popup-content">
            <div className="inner-content flex">
              <h3>{isAddingBatch ? "Add Batch" : "Switch Batch"}</h3>
              <div className="close-icon">
                <img
                  src="/public/icons/Cancel.svg"
                  className="cancel-btn"
                  alt=""
                  onClick={() => setShowSwitchBatch(false)}
                />
              </div>
            </div>
            <div className="add-batch">
              <button className="add-batch-btn" onClick={toggleInputFields}>
                Add New Batch
              </button>
            </div>
            {showInputFields && (
              <div className="input-fields">
                <div className="input-field">
                  <label htmlFor="">Batch Name</label>
                  <Input
                    className="in"
                    name="batchName"
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
                <div className="input-field">
                  <label htmlFor="">Start Year</label> <br />
                  <DatePicker
                    className="in"
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
                  <label htmlFor="">End Year</label> <br />
                  <DatePicker
                    className="in"
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
                <button
                  className="btn primary-medium"
                  onClick={submitBatchData}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
          <div className="switch-batch-list-container">
            {batchList.map((batch, index) => {
              // console.log(batch);
              return (
                <div
                  className="switch-batch-card flex"
                  onClick={() => handleSwitch(batch.id, batch.batch_name)}
                  key={index}
                >
                  <div className="batch-left-side flex">
                    <div className="batch-name-year">
                      <h4>{batch.batch_name}</h4>
                      <p>
                        {batch.start_date.slice(0, 4)} -{" "}
                        {batch.end_date.slice(0, 4)}{" "}
                      </p>
                    </div>
                    <div className="tag">
                      <span>Internship</span>
                    </div>
                  </div>
                  <div className="batch-right-side">
                    <img
                      src="/public/icons/edit-pencil.svg"
                      alt=""
                      handleEditClick={handleEditClick}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
