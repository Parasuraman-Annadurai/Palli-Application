// TableComponent.jsx
import React from 'react';
import noDataFound from "../../public/images/no_data_found.svg";
import { Button } from 'antd';

const TableComponent = ({ data, columns }) => {
  // Check if the array has data
  if (data.data && data.data.length > 0) {
    return (
      <table className="antd-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
       
          {/* Map through the array and render table rows for each object */}
          {data.data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={column.key}>
                  {item[column.key]}
                  {column.key === 'invite' && (
                    <Button onClick={() => handleInvite(item.id)}>Invite</Button>
                  )}
                  {column.key === 'viewMore' && (
                    <Button onClick={() => handleViewMore(item.id)}>View More</Button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    // Display a message or component when the array is empty
    return (
      <div className='no-data-found'>
        <img src={noDataFound} alt='no data found' />
      </div>
    );
  }
};

export default TableComponent;
