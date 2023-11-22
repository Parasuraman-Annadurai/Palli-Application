
import DashboardHeaderImage from "../../../assests/images/DashboardHeaderImage.svg";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { DatePicker } from "antd";
const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [startError, setStartError] = useState(null);
  const [endError, setEndError] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (startYear && endYear && startYear < endYear) {
      setIsModalOpen(false);
      // Perform actions with startYear and endYear
    } else {
      if (!startYear || !endYear) {
        setStartError(!startYear ? "Please select a start year" : null);
        setEndError(!endYear ? "Please select an end year" : null);
      } else {
        setStartError(
          startYear >= endYear ? "Start year must be smaller" : null
        );
        setEndError(endYear <= startYear ? "End year must be greater" : null);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeStartYear = (date, dateString) => {
    setStartYear(dateString);
    setStartError(null);
  };

  const onChangeEndYear = (date, dateString) => {
    setEndYear(dateString);
    setEndError(null);
  };

  return (
    <div className="content">
      <div className="greeting">
        <div className="heading">
          <h1>
            Welcome, Ayodele <br />
            Irepodun
          </h1>
          <p>
            You have two batch student added to your domain. Please reach out to{" "}
            <br />
            the Head Teacher if you want them excluded from your domain.
          </p>
        </div>

        <div className="header__img">
          <img src={DashboardHeaderImage} alt="DashboardHeaderImage" />
        </div>
      </div>

      <div className="add__batch">
        <Button className="cards" type="primary" onClick={showModal}>
          ADD BATCH
        </Button>
        <Modal
          title="Year to Year"
          className="Yearpicker"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <DatePicker
              onChange={onChangeStartYear}
              picker="year"
              placeholder="Start Year"
            />
            {startError && <span style={{ color: "red" }}>{startError}</span>}
            <DatePicker
              onChange={onChangeEndYear}
              picker="year"
              placeholder="End Year"
            />
            {endError && <span style={{ color: "red" }}>{endError}</span>}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Content;
