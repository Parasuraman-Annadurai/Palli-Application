// taskmodule.jsx
import React, { useEffect, useState } from "react";
import "./TaskModule.css";
import TableComponent from "../../components/TableView";
import { useAuth } from "../../context/AuthContext";
import { Skeleton, Pagination, Modal } from "antd";
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


  //follow applications comment
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  //refer applicatins
  const coulmnName = [
    { key: "task_title", title: "Task Name" },
    { key: "task_description", title: "Task Description" },
    { key: "due_date", title: "Deadline" },
    { key: "action", title: "Action" },
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
          {
            headers: {
              Authorization: `Bearer ${token.access}`,
            },
          }
        );
      },
    });
  };

  const handleEdit = (editId) => {
    navigate(`/batch/${batchId}/module/edit/task/${editId}`);
  };

  
  const handleFilter = (value) => {
    setTaskFilter(value);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setTaskSearch(value);
  };

  return (
    <div className="content">
      <ApplicationHeader
        headerText={"Module"}
        showCreateButton={true}
        showRecordCount={true}
        totalRecords={taskLists}
        showFilterSelect={true}
        handleFilter={handleFilter}
        filterableField={[
          { label: "All", value: "" },
          { label: "Task", value: 0 },
          { label: "Assessment", value: 1 },
        ]}
        handleSearch={handleSearch}
      />

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
