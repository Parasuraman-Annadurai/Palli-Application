// taskmodule.jsx
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//external package
import { Skeleton, Pagination, Modal ,Dropdown,Menu} from "antd";

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
//css paste here
import "./TaskModule.css";
import {
  DownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
const TaskModule = () => {
  const navigate = useNavigate();
  const { id: batchId } = useParams();
  const { data: taskLists, loading, error, makeNetworkRequest } = useAPI();

  const { formData, handleChange} = useForm({
    limit: 5,
    currentPage: 1,
    taskSearch: "", // Add taskSearch field
    taskFilter: "", // Add taskFilter field
  });
  useEffect(() => {
    const url = `${API_END_POINT}/api/task/${batchId}/list_task/?limit=${formData.limit}&page=${formData.currentPage}&filter_task_type=${formData.taskFilter}&search=${formData.taskSearch}`;
    makeNetworkRequest(url, "GET", null);
  }, [formData.limit, formData.currentPage, formData.taskSearch, formData.taskFilter]);

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
          null,
        );
      },
    });
  };
  const handleEdit = (editId) => {
    navigate(`/batch/${batchId}/module/edit/task/${editId}`);
  };
  const handleSearch = (e) => {
    handleChange(e);
  };
  const handleMenuClick = ({ key }) => {
    if (key === "assessment") {
      navigate(`/batch/${batchId}/module/add/task`);
    }
    //later use pupose in I'm comment it
    
    //  else if (key === "quiz") {
    //   navigate(`/batch/${batchId}/module/add/quiz`);
    // }
  };
  const menu = (
    <Menu>
      <Menu.Item key="assessment" onClick={handleMenuClick}>
        <PlusOutlined /> Add Assessment
      </Menu.Item>
      <Menu.Item key="quiz" onClick={handleMenuClick}>
        <PlusOutlined /> Add Quiz
      </Menu.Item>
    </Menu>
  );
  const handleLimit =(limit)=>{
    handleChange({ target: { name: "limit", value: limit } });
  }
  return (
    <div className="content">
      <div className="application-header">
        <h2>Tasks</h2>
        <div className="header-controls">
          <div className="record-count">
            <span>{taskLists.total} Records</span>
          </div>
          <CommonFilter handleSearch={handleSearch} handleLimit={handleLimit} handleName={"taskSearch"}/>
          <Dropdown overlay={menu} placement="bottomRight">
            <span style={{ cursor: "pointer" }}>
              Create <DownOutlined />
            </span>
          </Dropdown>
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
