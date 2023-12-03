// pageheader.jsx
import React from "react";
import { Select, Dropdown, Menu } from "antd";
import {DownOutlined,PlusOutlined,} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Search from "antd/es/input/Search";

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

  const handleMenuClick = ({ key }) => {
    if (key === "assessment") {
      navigate(`/batch/${batchId}/module/add/task`);
    } else if (key === "quizz") {
      navigate(`/batch/${batchId}/module/add/quiz`);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="assessment" onClick={handleMenuClick}>
        <PlusOutlined /> Add Task 
      </Menu.Item>
      {/* <Menu.Item key="quizz" onClick={handleMenuClick}>
        <PlusOutlined /> Add Quizz
      </Menu.Item> */}
    </Menu>
  );
  return (
    <div className="application-header">
      <h2>{headerText}</h2>
      <div className="header-controls">
        {showRecordCount && (
          <div className="record-count">
            <span>{totalRecords.total} records</span>
          </div>
        )}
    
    <button className="upload__btn" type="primary">
            Import
          </button>
        <Search
          className="search__bar"
          placeholder="search task"
          onChange={handleSearch}
        />

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

        {showCreateButton && (
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
``;
