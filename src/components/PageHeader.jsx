// pageheader.jsx
import React from "react";
import { Select, Input, Button, Dropdown, Menu } from "antd";
import {
  DownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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
          <button className="upload__btn" type="primary">
            Import
          </button>
        )}

        {/* <Input
          placeholder="Search"
          className="search__bar"
          value={searchWord}
          suffix={
            <>
              {searchWord && (
                <Button
                  type="text"
                  icon={<CloseCircleOutlined />}
                  // onClick={handleClear}
                />
              )}
              <Button
                type="text"
                icon={<SearchOutlined />}
                onClick={() => handleSearch(searchWord)}
              />
            </>
          }
        /> */}
        <Search className="search__bar"placeholder="search task" onChange={handleSearch}/>

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
``
