// taskmodule.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Skeleton, Pagination, Modal, Dropdown, Menu } from "antd";
import axios from "axios";

import TableView from "../../components/TableView";
import CommonFilters from "../../components/CommonFilters";

import useForm from "../../hooks/useForm";

import { useAuth } from "../../context/AuthContext";

import { API_END_POINT } from "../../../config";

import "./TaskModule.css";

const TaskModule = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id: batchId } = useParams();
  const [taskLists, setTaskLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { formData, handleChange } = useForm({
    limit: 5,
    currentPage: 1,
    taskSearch: "", // Add taskSearch field
    taskFilter: "", // Add taskFilter field
  });
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.get(
          `${API_END_POINT}/api/task/${batchId}/list_task/?limit=${formData.limit}&page=${formData.currentPage}&filter_task_type=${formData.taskFilter}&search=${formData.taskSearch}`,
          { headers }
        );

        setTaskLists(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    formData.limit,
    formData.currentPage,
    formData.taskSearch,
    formData.taskFilter,
  ]);

  const handleChangePage = (page) => {
    handleChange({ target: { name: "currentPage", value: page } });
  };
  const columnNameList = [
    { key: "task_title", title: "Task Name" },
    { key: "task_description", title: "Task Description" },
    { key: "due_date", title: "Deadline" },
    { key: "task_type", title: "Task Type" },
    { key: "action", title: "Action" },
  ];

  const handleDelete = (deleteTaskId) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this task?",
      onOk: async () => {
        try {
          await axios.delete(
            `${API_END_POINT}/api/task/${batchId}/delete_task/${deleteTaskId}`,
            {
              headers: {
                Authorization: `Bearer ${token.access}`,
                "Content-Type": "application/json",
              },
            }
          );
          
        } catch (error) {
          console.error("Error deleting task:", error);
         
        }
      },
    });
  };
  
  const handleEdit = (editId) => {
    navigate(`/batch/${batchId}/module/edit/task/${editId}`);
  };
  const handleSearch = (value) => {
    if (value.trim() !== "" || value === "") {
      handleChange({ target: { name: "taskSearch", value: value.trim() } });
    }
  };
  const handleMenuClick = ({ key }) => {
    if (key === "assessment") {
      navigate(`/batch/${batchId}/module/add/task`);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="assessment" onClick={handleMenuClick}>
        <div className="icon-flex">
          <span class="material-symbols-outlined">add</span>
          Add Assessment
        </div>
      </Menu.Item>
    </Menu>
  );
  const handleLimit = (limit) => {
    handleChange({ target: { name: "limit", value: limit } });
  };
  return (
    <div className="content">
      <div className="application-header">
        <h2>Tasks</h2>
        <div className="header-controls">
          <Dropdown overlay={menu} placement="bottomRight">
            <span className="icon-flex">
              Create <span class="material-symbols-outlined">expand_more</span>
            </span>
          </Dropdown>
          <CommonFilters
            handleChange={handleChange}
            handleSearch={handleSearch}
            handleLimit={handleLimit}
            handleName={"taskSearch"}
            totalRecords={taskLists.total}
          />
        </div>
      </div>

      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <>
          <TableView
            tableData={taskLists.data}
            columnNameList={columnNameList}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <div
            className={`pagination__container ${
              taskLists.total > 0 ? "show" : "hide"
            }`}
          >
            <Pagination
              current={formData.currentPage}
              pageSize={formData.limit}
              total={taskLists.total}
              onChange={handleChangePage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TaskModule;
