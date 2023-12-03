// TableComponent.jsx
import React from "react";
import { Button, Tooltip, Tag } from "antd";

const TableComponent = ({ data, columns, handleDelete, handleEdit }) => {
  // Format date as "May 20 203"
  const formatDate = (date) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Get due date tag along with show due date based on different conditions

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
                    {column.key !== "action" ? (
                      <>
                        {column.key === "task_description" && (
                          <Tooltip placement="topLeft" title={item[column.key]}>
                            {item[column.key]}
                          </Tooltip>
                        )}

                        {column.key === "due_date"
                          ? formatDate(new Date(item[column.key]))
                          : item[column.key]}
                      </>
                    ) : (
                      <div className="antd-table-action">
                        <Button onClick={() => handleEdit(item.id)}>
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(item.id)}
                          type="primary"
                          danger
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                    {column.key === "invite" && <Button>Invite</Button>}
                    {column.key === "viewMore" && <Button>View More</Button>}
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
      <div className="no-data-found">
        {/* Render your "No Data Found" content here */}
      </div>
    );
  }
};

export default TableComponent;
