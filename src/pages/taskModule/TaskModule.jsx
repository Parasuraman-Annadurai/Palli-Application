// taskmodule.jsx
import React, { useEffect } from "react";
import "./TaskModule.css";
import TableComponent from "../../components/TableView";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Breadcrumb, Skeleton, Pagination } from "antd";
import ApplicationHeader from "../../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import useAPI from "../../hooks/useAPI";
import { API_END_POINT } from "../../../config";
const TaskModule = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id: batchId } = useParams();
  const [limit, setLimit] = useState(6);
  const [taskSearch, setTaskSearch] = useState("");
  const [taskFilter, setTaskFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: taskLists, loading, error, makeNetworkRequest } = useAPI();
  const breadcrumbTab = [
    {
      title: "Home",
    },
    {
      title: <a href="">Module</a>,
    },
  ];

  useEffect(() => {
    let url = `${API_END_POINT}/api/task/${batchId}/list_task/?limit=${limit}&page=${currentPage}`;

    if (taskFilter) {
      url += `&filter_task_type=${taskFilter}`;
    }

    // Append search parameter if it exists
    if (taskSearch) {
      url += `&search=${taskSearch}`;
    }

    makeNetworkRequest(url, "GET", null, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
  }, [limit, currentPage, taskSearch, taskFilter]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const coulmnName = [
    { key: "task_title", title: "Task Name" },
    { key: "task_description", title: "Date of Post" },
    { key: "due_date", title: "Deadline" },
    { key: "task_type", title: "Task Type" },
    { key: "action", title: "Action" },
  ];

  const handleDelete = async (deleteTaskId) => {
    makeNetworkRequest(
      `http://13.232.90.154:8000/api/task/${batchId}/delete_task/${deleteTaskId}`,
      "DELETE",
      null,
      {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      }
    );
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setTaskSearch(value);
  };

  const handleEdit = (editId) => {
    console.log(editId);
    navigate(`/batch/${batchId}/module/edit/task/${editId}`);
  };
  const handleFilter = (value) => {
    setTaskFilter(value);
  };
  console.log(taskLists);
  return (
    <div className="content">
      <div className="bread-crumb">
        <Breadcrumb items={breadcrumbTab} />
      </div>
      <ApplicationHeader
        headerText={"Module"}
        showCreateButton={true}
        showRecordCount={true}
        totalRecords={taskLists}
        handleSearch={handleSearch}
        showFilterSelect={true}
        handleFilter={handleFilter}
        filterableField={[
          { label: "All", value: "" },
          { label: "Task", value: "task" },
          { label: "Assessment", value: "assessment" },
        ]}
      />

      {/* [{label:"Task",value:"task"},{label:"Assessment",value:"assessment"}] */}
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <>
          <TableComponent
            data={taskLists}
            columns={coulmnName}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
          <div
            className={`pagination__container ${
              taskLists.total > 0 ? "show" : "hide"
            }`}
          >
            <Pagination
              current={currentPage}
              pageSize={limit}
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

/* 

   const fetchTaskData = () => {
    const url = taskSearch.trim()
      ? `${API_END_POINT}/api/task/${batchId}/list_task/?limit=${limit}&page=${currentPage}&filter_task_type=${taskFilter}&search=${taskSearch}`
      : `${API_END_POINT}/api/task/${batchId}/list_task/?limit=${limit}&page=${currentPage}&filter_task_type=${taskFilter}`;

    makeNetworkRequest(url, "GET", null, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
  };
*/
