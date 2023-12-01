// TableComponent.jsx
import React from 'react';
import noDataFound from "../../public/images/no_data_found.svg";
import { Button } from 'antd';


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
                    {column.key === 'invite' && <Button>Invite</Button>}
                    {column.key === 'viewMore' && <Button>View More</Button>}
                    {column.key === 'action' && (
                      <div className='antd-table-action'>
                        <Button onClick={() => handleEdit(item.id)}>Edit</Button>
                        <Button onClick={() => handleDelete(item.id)} type='primary' danger>Delete</Button>
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
