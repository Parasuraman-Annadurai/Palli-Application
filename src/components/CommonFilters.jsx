import React from "react";
//External Packages here
import Search from "antd/es/input/Search";
import { Select, Popover } from "antd";
//Our componenent here
import UnifiedFilterComponent from "./FilterComponent";


const CommonFilter = ({
  handleChange,
  handleLimit,
  handleName,
  filterArray,
  applyFilter,
  
}) => {

  const content = (
    <div>
      <UnifiedFilterComponent filter={filterArray} applyFilter={applyFilter} />
    </div>
  );
  return (
    <>
      <Search
        className="search__bar"
        placeholder="search task"
        name={handleName}
        onChange={handleChange}
      />
      <div className="fileter-category">
        Show
        <Select
          size="small"
          defaultValue="5"
          style={{ width: 70, paddingLeft: 10, paddingRight: 5 }}
          onChange={handleLimit}
        >
          <Select.Option value="5">5</Select.Option>
          <Select.Option value="10">10</Select.Option>
          <Select.Option value="20">20</Select.Option>
          <Select.Option value="30">30</Select.Option>
        </Select>
        Entries
      </div>
      <div className="filter-container" >
        <Popover content={content} placement="bottomRight" trigger={"click"}>
          <div className="filter-icon">
            <span className="material-symbols-outlined">filter_list</span>{" "}
          </div>
        </Popover>
      </div>
    </>
  );
};

export default CommonFilter;