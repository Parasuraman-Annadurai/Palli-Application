import React, { useEffect } from "react";
import "./TaskModule.css";
import TableComponent from "../../components/TableView";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Breadcrumb, Skeleton, Pagination } from "antd";
import ApplicationHeader from "../../components/PageHeader";
import { useParams } from "react-router-dom";
import useAPI from "../../hooks/useAPI";
import { API_END_POINT } from "../../../config";

const TaskModule = () => {
  const { token, user } = useAuth();
  const { id: batchId } = useParams();
  const [limit, setLimit] = useState(6);
  const [taskSearch,setTaskSearch] = useState("");
  const [taskFilter,setTaskFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data:taskLists, loading, error, makeNetworkRequest } = useAPI();

  const breadcrumbTab = [
    {
      title: "Home",
    },
    {
      title: <a href="">Module</a>,
    },
  ];
  useEffect(() => {
    makeNetworkRequest(
      `${API_END_POINT}/api/task/${batchId}/list_task/?limit=${limit}&page=${currentPage}&filter_task_type=${taskFilter}&search=${taskSearch}`,
      "GET",
      null,
      {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      }
    )
   
    
   
  }, [limit, currentPage,taskSearch,taskFilter]);
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  const coulmnName = [
    { key: "id", title: "Id" },
    { key: "task_title", title: "Task Name" },
    { key: "task_description", title: "Date of Post" },
    { key: "due_date", title: "Deadline" },
    { key: "viewMore", title: "More" },
  ];

  const handleSearch = (e)=>{
    const {value} =e.target;
    setTaskSearch(value.toLowerCase())
  }
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
        onSearch={handleSearch}
      />

      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <>
          <TableComponent data={taskLists} columns={coulmnName} />
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
