import React from "react";
//external packages here
import Search from "antd/es/input/Search";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

const CommonFilter = ({ handleSearch, handleLimit, handleName ,handleChange}) => {
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
          style={{ width: 70, paddingLeft: 10, paddingRight: 5 }}
          onChange={handleLimit}
        >
          <Option value="5">5</Option>
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="30">30</Option>
        </Select>
        entries
      </div>
    </>
  );
};

export default CommonFilter;
