import React from 'react';
import { Button } from 'antd';
import '../css/table.css';

const TableComponent = ({ tableData }) => {
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
          <th>Invite</th>
          <th>View More</th>
        </tr>
      </thead>
      <tbody>
        {tableData.length > 0 ? (
          tableData.map((application, index) => (
            <tr key={application.id}>
              <td>{application.id}</td>
              <td>{application.first_name}</td>
              <td>{application.last_name}</td>
              <td>{application.address}</td>
              <td>{application.dob}</td>
              <td>{application.email}</td>
              <td>
                <Button>Create Login</Button>
              </td>
              <td>
                <Button>View More</Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td>No applications available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
