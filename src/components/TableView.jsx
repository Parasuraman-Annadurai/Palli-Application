// TableComponent.jsx
import React from 'react';

//image paste
import noDataFound from "/images/no_data_found.svg";


const TableComponent = ({ data, columns, handleDelete, handleEdit }) => {

  if (data.data && data.data.length > 0) {
    return (
      <div className="table-wrapper">
        <table className="antd-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {item[column.key]}
                    {column.key === 'invite' && <button className='btn invite-btn'>Invite</button>}
                    {column.key === 'viewMore' && <a href=''>View More</a>}
                    {column.key === 'action' && (
                      <div className='antd-table-action'>
                        <button className='btn edit-btn' onClick={() => handleEdit(item.id)}>Edit</button>
                        <button className='btn delete-btn' onClick={() => handleDelete(item.id)}>Delete</button>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className='no-data-found'>
        <img src={noDataFound} alt='no data found' />
       
      </div>
    );
  }
};

export default TableComponent;
