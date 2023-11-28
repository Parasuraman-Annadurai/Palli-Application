
import React from 'react';

import noDataFound from "../../public/images/no_data_found.svg"
const TableComponent = ({ data,coulmnName }) => {
  console.log(data);
  // Check if the array has data
  if (data.data && data.data.length > 0) {
    console.log(coulmnName);
    return (
      
      <table className="antd-table">
        <thead>
        <tr>
            {coulmnName.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Map through the array and render table rows for each object */}
          {data.data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.address}</td>
              <td>{item.dob}</td>
              <td>{item.email}</td>
              <td><button className='create-login-btn'>create login</button></td>
              <td><button className='table-view-more'>view more</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    // Display a message or component when the array is empty
    return <div className='no-data-found'>
      <img src={noDataFound} alt='no data found'/>
  </div>;
  }
};

export default TableComponent;
