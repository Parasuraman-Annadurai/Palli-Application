import React, { useState, useEffect } from "react";
import dashBoardHeaderImage from "../../../../public/images/dashboard_header_image.svg";
import useAPI from "../../../hooks/useAPI";
import { Button, Modal, Input, DatePicker } from "antd";
import { API_END_POINT } from "../../../../config";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Content = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { data, makeNetworkRequest } = useAPI();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batch_name, setBatchName] = useState("");
  const [start_date, setStartYear] = useState("");
  const [end_date, setEndYear] = useState("");
  const [company, setCompany] = useState(1);

  const [batchNameError, setBatchNameError] = useState(null);
  const [startError, setStartError] = useState(null);
  const [endError, setEndError] = useState(null);

  useEffect(() => {
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetFields();
  };

  const resetFields = () => {
    setBatchName("");
    setStartYear("");
    setEndYear("");
    setBatchNameError(null);
    setStartError(null);
    setEndError(null);
  };
  const onChangeStartYear = (date, dateString) => {
    setStartYear(dateString);
    setStartError(null);
  };

  const onChangeEndYear = (date, dateString) => {
    setEndYear(dateString);
    setEndError(null);
  };

  const handleBatchNameChange = (e) => {
    setBatchName(e.target.value);
    setBatchNameError(null);
  };

  const handleCLick = () => {
    // Validation
    let hasError = false;

    if (!batch_name) {
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

    if (!hasError) {
      // Make API request if there are no validation errors
      const batch = {
        batch_name,
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

      // Close modal and reset fields
      handleCancel();
      navigate("/dashboard");
    }
  };

  const batches = data?.data?.data || [];

  console.log(batches);
  return (
    <div className="content">
      <div className="greeting">
        <div className="heading">
          <h1>
            Welcome, Ayodele <br />
            Irepodun
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
            <Button className="cards" type="primary" onClick={showModal}>
              ADD BATCH
            </Button>
          </div>
          <Modal
            title="Add Year to Year Batch"
            className="Yearpicker"
            open={isModalOpen}
            onOk={handleCLick}
            onCancel={handleCancel}
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
                onChange={onChangeStartYear}
                placeholder="Start Year"
              />

              {startError && <span style={{ color: "red" }}>{startError}</span>}

              <DatePicker
                format="YYYY-MM-DD"
                onChange={onChangeEndYear}
                placeholder="End Year"
              />
              {endError && <span style={{ color: "red" }}>{endError}</span>}
            </div>
          </Modal>
          {batches.map((batch, index) => (
            <Link to={`/batch/${batch.id}/applications`} key={index}>
              <div key={index} className="added-batches">
                <p>{batch.batch_name}</p>
                <p>{batch.start_date}</p>
                <p>{batch.end_date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
