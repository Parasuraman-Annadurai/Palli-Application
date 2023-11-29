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
  const {id:batchId} = useParams();
  const {
    
    totalRecords,
    showUploadButton,
    showRecordCount,
    showFilterSelect,
    headerText,
    showCreateButton,
    onSearch
  } = props;

  const [fileList, setFileList] = useState([]);
  const { user } = useAuth();

  const handleMenuClick = ({ key }) => {
    if (key === "assessment") {
      navigate(`/batch/${batchId}/add/task`);
    } else if (key === "quiz") {
      navigate(`/batch/${batchId}/add/quiz`);
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
          <Upload
            accept=".xls, .xlsx"
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
          >
            <button className="upload__btn" type="primary">
              Import
            </button>
          </Upload>
        )}

        <Search placeholder="Search" className="search__bar" onChange={onSearch}/>

        {showRecordCount && (
          <div className="record-count">
            <span>Number of Records: </span>
            <span>{totalRecords.total}</span>
          </div>
        )}
        {showFilterSelect && (
          <div className="fileter-category">
            <Select
              defaultValue="all"
              style={{
                width: 120,
              }}
              options={[
                {
                  value: "all",
                  label: "All",
                },
                {
                  value: "first_name",
                  label: "First Name",
                },
                {
                  value: "success",
                  label: "Success",
                },
              ]}
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
