// TableComponent.js

import React, { useState } from 'react';
import '../css/table.css';



const TableComponent = ({data}) => {

  let applicant = Array.from(data);

  return (
    <table className="antd-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th>DOB</th>
          <th>Email</th>
          <th>invite</th>
          <th>view more</th>
        </tr>
      </thead>
      <tbody>
        {applicant.map((applicants,index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{applicants.first_name}</td>
            <td>{applicants.last_name}</td>
            <td>{applicants.email}</td>
            <td>{applicants.dob}</td>
            <td>{applicants.address}</td>
            <td><a href="">create login</a></td>
            <td><a href="">see all details</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};



export default TableComponent;
