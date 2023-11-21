// ApplicationHeader.js
import React from 'react';
import Search from 'antd/es/input/Search';
import { useState } from 'react';
import { Select,Upload } from 'antd';

const ApplicationHeader = (props) => {

  const {handleStatus,handleSearch,totalRecord} = props;

  const [fileList, setFileList] = useState([]);


  return (
    <div className="application-header">
      <h2>Applicants</h2>
      <div className="header-controls">
        <Upload 
          accept=".xls, .xlsx" fileList={fileList} onChange={({ fileList }) => setFileList(fileList)}
        >
        <button className='upload__btn' type="primary" >
          Import
        </button>
        </Upload>
        <Search
          placeholder="Search"
          className='search__bar'
          onChange={handleSearch}
        />

        <div className="record-count">
          <span>Number of Records: </span>
          <span>{totalRecord}</span>
        </div>
           <div className="fileter-category">
                  <Select
                defaultValue="all"
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: 'all',
                    label: 'All',
                  },
                  {
                    value: 'pending',
                    label: 'Pending',
                  },
                  {
                    value: 'success',
                    label: 'Success',
                  },
                ]}
                onChange={handleStatus}
              />
           </div>
        
        {/* fillter icon */}
        {/* <div className="select-item">
       
           <div className="filter__icon">
           <span className="material-symbols-outlined">filter_list</span>
           </div>
           
        </div> */}


      </div>
    </div>
  );
};

export default ApplicationHeader;

