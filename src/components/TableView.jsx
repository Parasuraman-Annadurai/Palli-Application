import React from 'react';
//external packages here
import moment from 'moment';
import { Tag, Tooltip } from 'antd';
//images here
import noDataFound from "/images/no_data_found.svg";

const TableComponent = ({ data, coulmnNameList, handleDelete, handleEdit }) => {
  const renderDueDate = (dueDate) => {
    const formattedDueDate = moment(dueDate).format('MMMM DD, YYYY');
    const today = moment();
    const dueDateMoment = moment(dueDate);
    const daysDifference = dueDateMoment.diff(today, 'days');

    return (
      <div>
        {formattedDueDate}
        {daysDifference === 0 && <Tag color="red">Today's Deadline</Tag>}
        {daysDifference > 0 && daysDifference <= 3 && <Tag color="orange">{`${daysDifference} Days Left`}</Tag>}
        {daysDifference < 0 && <Tag color="green">Completed</Tag>}
      </div>
    );
  };

  if (data.data && data.data.length > 0) {
    return (
      <div className="table-wrapper">
        <table className="antd-table">
          <thead>
            <tr>
              {coulmnNameList.map((column) => (
                <th key={column.key}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map((item) => (
              <tr key={item.id}>
                {coulmnNameList.map((column) => (
                  <td key={column.key}>
                    {column.key === 'due_date' && (
                      <Tooltip title={item[column.key]}>
                        {renderDueDate(item[column.key])}
                      </Tooltip>
                    )}
                    {column.key === 'task_type' && item[column.key] === 1 ? (
                      <span>Task</span>
                    ) : column.key === 'task_type' && item[column.key] !== 1 ? (
                      <span>Assessment</span>
                    ) : column.key !== 'due_date' && column.key !== 'task_type' ? (
                      <Tooltip title={item[column.key]}>
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

export default TableComponent;
