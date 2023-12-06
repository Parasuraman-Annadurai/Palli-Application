// taskmodule.jsx
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//external package
import { Skeleton, Pagination, Modal, Dropdown, Menu } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
//our component paste here
import TableComponent from "../../components/TableView";

import CommonFilter from "../../components/CommonFilters";
//context paste here

//custom hook paste here
import useForm from "../../hooks/useForm";
//API endpoint paste here
import { API_END_POINT } from "../../../config";
//custom hook paste here
import useAPI from "../../hooks/useAPI";
import useFilter from "../../hooks/useFilter";
//css paste here
import "./TaskModule.css";

const TaskModule = () => {
  const navigate = useNavigate();
  const filter = useFilter("task");
  const { id: batchId } = useParams();
  const { data: taskLists, loading, error, makeNetworkRequest } = useAPI();

  const { formData, handleChange } = useForm({
    limit: 5,
    currentPage: 1,
    taskSearch: "",
    taskFilter: "",
  });
  useEffect(() => {
    const url = `${API_END_POINT}/api/task/${batchId}/list_task/?limit=${formData.limit}&page=${formData.currentPage}&filter_task_type=${formData.taskFilter}&search=${formData.taskSearch}`;
    makeNetworkRequest(url, "GET", null);
  }, [
    formData.limit,
    formData.currentPage,
    formData.taskSearch,
    formData.taskFilter,
  ]);

  const handleChangePage = (page) => {
    handleChange({ target: { name: "currentPage", value: page } });
  };

  const coulmnNameList = [
    { key: "task_title", title: "Task Name" },
    { key: "task_description", title: "Task Description" },
    { key: "due_date", title: "Deadline" },
    { key: "task_type", title: "Task Type" },
    { key: "action", title: "Action" },
    //
  ];
  const handleDelete = (deleteTaskId) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this task?",
      onOk: async () => {
        await makeNetworkRequest(
          `${API_END_POINT}/api/task/${batchId}/delete_task/${deleteTaskId}`,
          "DELETE",
          null
        );
      },
    });
  };
  const handleEdit = (editId) => {
    navigate(`/batch/${batchId}/module/edit/task/${editId}`);
  };

  const handleMenuClick = ({ key }) => {
    if (key === "task") {
      navigate(`/batch/${batchId}/module/add/task`);
    }
  };
  const menu = (
    <Menu>
      <Menu.Item key="task" onClick={handleMenuClick}>
        <PlusOutlined /> Add Task
      </Menu.Item>
 
    </Menu>
  );
  const handleLimit = (limit) => {
    handleChange({ target: { name: "limit", value: limit } });
  };

  const handleApplyFilter =(filterData)=>{
      handleChange({ target: { name: "taskFilter", value: filterData.task_type } });
  }

  return (
    <div className="content">
      <div className="application-header">
        <h2>Tasks</h2>

        <div className="header-controls">
          <Dropdown overlay={menu} placement="bottomRight">
            <span style={{ cursor: "pointer" }}>
              Create <DownOutlined />
            </span>
          </Dropdown>
          <div className="record-count">
            <span>{taskLists.total} Records</span>
          </div>

          <CommonFilter
            handleChange={handleChange}
            handleLimit={handleLimit}
            handleName={"taskSearch"}
            filterArray={filter}
            applyFilter={handleApplyFilter}
            />
        </div>
      </div>

      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <>
          <TableComponent
            data={taskLists}
            coulmnNameList={coulmnNameList}
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
