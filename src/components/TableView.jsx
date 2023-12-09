import React from 'react';

import { Tag, Tooltip } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import noDataFound from "/images/no_data_found.svg";

const TableView = ({ tableData, columnNameList, handleDelete, handleEdit }) => {
  const renderDueDate = (dueDate) => {
   
    const utcDueDate = dayjs.utc(dueDate);

    const formattedDueDate = utcDueDate.format('MMMM DD, YYYY');
    const today = dayjs();
  
    const dueDateMoment = dayjs(utcDueDate).startOf('day'); // Adjust to start of day for accurate comparisons
    const daysDifference = dueDateMoment.diff(today, 'days');
    return (
      <div>
      {formattedDueDate}
      {daysDifference === 0 && <Tag color="red">Today's Deadline</Tag>}
      {daysDifference === 1 && <Tag color="orange">1 Day Left</Tag>}
      {daysDifference > 1 && daysDifference <= 3 && <Tag color="orange">3 Day Left</Tag>}
      {daysDifference < 0 && <Tag color="red">Overdue</Tag>}
    </div>
    );
  };

  if (tableData && tableData.length > 0) {
    return (
      <div className="table-wrapper">
        <table className="antd-table">
          <thead>
            <tr>
              {columnNameList.map((column) => (
                <th key={column.key}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item.id}>
                {columnNameList.map((column) => (
                  <td key={column.key} >
                    {column.key === 'due_date' && (
                      <Tooltip title={dayjs.utc(item[column.key]).format('MMMM DD, YYYY')} className='due-date-container'>
                        {renderDueDate(item[column.key])}
                      </Tooltip>
                    )}
                    {column.key === 'task_description' && (
                      <Tooltip title={item[column.key]} placement="topLeft">
                        {item[column.key]}
                      </Tooltip>
                    )}
                    {column.key === 'task_type' && item[column.key] === 0 ? (
                      <span>Task</span>
                    ) : column.key === 'task_type' && item[column.key] === 1 ? (
                      <span>Assessment</span>
                    ) : column.key !== 'due_date' && column.key !== 'task_type' ? (
                      <Tooltip title={item[column.key]  } >
                        {item[column.key]}
                      </Tooltip>
                    ) : null}
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

export default TableView;
