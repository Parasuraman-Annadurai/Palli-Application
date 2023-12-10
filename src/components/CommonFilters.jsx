import React,{useState} from "react";

import Search from "antd/es/input/Search";
import { Select, Popover } from "antd";

import FilterComponent from "./FilterComponent";


const CommonFilter = ({
  handleChange,
  handleLimit,
  handleName,
  filterArray,
  applyFilter,
  appliedFilters
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);


  const content = (
    <div>
      <FilterComponent filter={filterArray} applyFilter={applyFilter} setPopoverVisible={setPopoverVisible}/>
    </div>
  );
  const appliedFilterLength = Object.keys(appliedFilters).length;


  return (
    <>
      <Search
        className="search__bar"
        placeholder="search task"
        name={handleName}
        onChange={handleChange}
      />
      <div className="filter-category">
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
        <Popover  
         open={popoverVisible}
         content={content}
         placement="bottomRight"
         trigger="click"
         openClassName={popoverVisible}
         onVisibleChange={(visible) => setPopoverVisible(visible)}
         
         >
          <div className="filter-icon" onClick={() => setPopoverVisible(!popoverVisible)}>
          <span>{appliedFilterLength === 0 ? "" : appliedFilterLength}</span>
            <span className="material-symbols-outlined">filter_list</span>
          </div>
        </Popover>
      </div>
    </>
  );
};

export default CommonFilter;