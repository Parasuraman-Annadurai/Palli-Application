import React from "react";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { Select, Upload, Button, Dropdown, Menu } from "antd";
import { useAuth } from "../context/AuthContext";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const ApplicationHeader = (props) => {
  const navigate = useNavigate();
  const { id: batchId } = useParams();
  const {
    totalRecords,
    showUploadButton,
    showRecordCount,
    showFilterSelect,
    headerText,
    showCreateButton,
    handleSearch,
    filterableField,
    handleFilter,
  } = props;


  const { user } = useAuth();

  const handleMenuClick = ({ key }) => {
    if (key === "assessment") {
      navigate(`/batch/${batchId}/module/add/task`);
    } else if (key === "quiz") {
      navigate(`/batch/${batchId}/module/add/quiz`);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="assessment" onClick={handleMenuClick}>
        <PlusOutlined /> Add Assessment
      </Menu.Item>
      <Menu.Item key="quizz" onClick={handleMenuClick}>
        <PlusOutlined /> Add Quizz
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="application-header">
      <h2>{headerText}</h2>
      <div className="header-controls">
        {showUploadButton && (
          <Upload accept=".xls, .xlsx">
            <button className="upload__btn" type="primary">
              Import
            </button>
          </Upload>
        )}

        <Search
          placeholder="Search"
          className="search__bar"
          onChange={handleSearch}
        />

        {showRecordCount && (
          <div className="record-count">
            <span>Number of Records: </span>
            <span>{totalRecords.total}</span>
          </div>
        )}
        {showFilterSelect && (
          <div className="fileter-category">
            <Select
              defaultValue="All"
              onChange={handleFilter}
              style={{
                width: 120,
              }}
              options={filterableField}
            />
          </div>
        )}

        {user.role === 1 && showCreateButton && (
          <Dropdown overlay={menu} placement="bottomRight">
            <span style={{ cursor: "pointer" }}>
              Create <DownOutlined />
            </span>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default ApplicationHeader;
