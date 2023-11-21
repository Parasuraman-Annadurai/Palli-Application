// TableComponent.js

import React, { useState } from 'react';
import '../css/table.css';



const TableComponent = ({data}) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (column) => {
    setSortedColumn(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <table className="antd-table">
      <thead>
        <tr>
        <th >
            Id
          </th>
          <th >
            First Name 
          </th>
          <th >
            Last Name
          </th>
          <th >
            Email
          </th>
          <th >
            Date of Birth
          </th>
          <th >
            Address
          </th>
          <th >
            Invite 
          </th>
          <th >
            view more 
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.key}>
            <td>{item.key}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
            <td>{item.dob}</td>
            <td>{item.address}</td>
            <td><a href="">create login</a></td>
            <td><a href="">see all details</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};



export default TableComponent;
