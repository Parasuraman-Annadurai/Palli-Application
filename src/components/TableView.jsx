import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Select, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import UserDetailsModal from "./UserDetailsModal";
import noDataFound from "/images/no_data_found.svg";

const TableView = ({
  tableData,
  columnNameList,
  handleDelete,
  handleEdit,
  createButtonAction,
  handleSortChange,
  sortKey,
  sortOrder,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const showModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  const renderDueDate = (dueDate) => {
    const utcDueDate = dayjs.utc(dueDate);
    const today = dayjs().startOf("day"); // Adjusted for accurate comparisons
    const dueDateMoment = dayjs(utcDueDate).startOf("day");
    const daysDifference = dueDateMoment.diff(today, "days");
    const formattedDueDate = utcDueDate.format("MMMM DD, YYYY");

    return (
      <div>
        {formattedDueDate}
        {daysDifference === 0 && <Tag color="red">Today's Deadline</Tag>}
        {daysDifference === 1 && <Tag color="orange">1 Day Left</Tag>}
        {daysDifference > 1 && daysDifference <= 3 && (
          <Tag color="orange">{`${daysDifference} Days Left`}</Tag>
        )}
        {daysDifference < 0 && <Tag color="red">Overdue</Tag>}
      </div>
    );
  };

  const statusChoices = [
    { key: 0, label: "Applied" },
    { key: 1, label: "Shortlisted" },
    { key: 2, label: "InterviewScheduled" },
    { key: 3, label: "Selected" },
    { key: 4, label: "OfferReleased" },
    { key: 5, label: "OfferAccepted" },
    { key: 6, label: "OnBoarded" },
    { key: 8, label: "Rejected" },
    { key: 7, label: "NotEligible" },
    { key: 9, label: "OfferDeclined" },
  ];



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
                  <td key={column.key}>
                    {column.key === "dob" ? (
                      <Tooltip
                        title={dayjs
                          .utc(item[column.key])
                          .format("MMMM DD, YYYY")}
                        className="dob-container"
                      >
                        {dayjs(item[column.key]).format("MMM DD YYYY")}
                      </Tooltip>
                    ) : column.key === "full name" ? (
                      <Tooltip title={`${item.first_name} ${item.last_name}`}>
                        {`${item.first_name
                          .charAt(0)
                          .toUpperCase()}${item.first_name.slice(
                          1
                        )} ${item.last_name
                          .charAt(0)
                          .toUpperCase()}${item.last_name.slice(1)}`}
                      </Tooltip>
                    ) : column.key === "due_date" ? (
                      <Tooltip
                        title={dayjs
                          .utc(item[column.key])
                          .format("MMMM DD, YYYY")}
                        className="due-date-container"
                      >
                        {renderDueDate(item[column.key])}
                      </Tooltip>
                    ) : column.key === "task_description" ? (
                      <Tooltip
                        title={
                          new DOMParser().parseFromString(
                            item[column.key],
                            "text/html"
                          ).body.textContent
                        }
                        placement="topLeft"
                      >
                        {
                          new DOMParser().parseFromString(
                            item[column.key],
                            "text/html"
                          ).body.textContent
                        }
                      </Tooltip>
                    ) : column.key === "task_type" ? (
                      item[column.key] === 0 ? (
                        <span>Task</span>
                      ) : (
                        <span>Assessment</span>
                      )
                    ) : column.key === "invite" ? (
                      <Select
                        style={{ width: 130 }}
                        placeholder={"Select status"}
                      >
                        {statusChoices.map((choice) => (
                          <Select.Option key={choice.key} value={choice.key}>
                            {choice.label}
                          </Select.Option>
                        ))}
                      </Select>
                    ) : column.key === "viewMore" ? (
                      <div>
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => showModal(item)}
                        >
                          View More
                        </a>
                      </div>
                    ) : column.key === "action" ? (
                      <div className="antd-table-action">
                        <button
                          className="btn edit-btn"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn delete-btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <Tooltip title={item[column.key]}>
                        {item[column.key]}
                      </Tooltip>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {selectedItem && (
          <UserDetailsModal
            userData={selectedItem}
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="no-data-found">
        <img src={noDataFound} alt="no data found" />
        <Link to={createButtonAction}>
          <button className="btn create-btn">Create</button>
        </Link>
      </div>
    );
  }
};

export default TableView;
