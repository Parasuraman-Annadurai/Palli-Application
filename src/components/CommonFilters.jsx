import React from "react";

import { Select } from "antd";
import { Option } from "antd/es/mentions";
import Search from "antd/es/input/Search";

const CommonFilters = ({ handleSearch, handleLimit, handleName ,handleChange,totalRecords}) => {
 
  return (
    <>
      <Search
        className="search__bar"
        placeholder="search task"
        name={handleName}
        onChange={handleChange}
        onSearch={handleSearch}
      />
      <div className="fileter-category">
        Show
        <Select
          size="small"
          defaultValue="5"
          className="limit-seter"
          onChange={handleLimit}
        >
          <Option value="5">5</Option>
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="30">30</Option>
        </Select>
        Entries
      </div>

      <div className="record-count">
            <span>{totalRecords} Records</span>
          </div>
    </>
  );
};

export default CommonFilters;
