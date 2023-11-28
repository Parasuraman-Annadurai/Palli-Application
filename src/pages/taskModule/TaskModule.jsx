import React, { useEffect } from "react";
import "./TaskModule.css";
import Sidebar from "../../layouts/Sidebar";
import Navbar from "../../layouts/Navbar";
import Content from "../../layouts/ContentArea";
import TableComponent from "../../components/TableView";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Breadcrumb, Skeleton,Pagination } from "antd";
import ApplicationHeader from "../../components/PageHeader";
import { useParams } from "react-router-dom";
import useAPI from "../../hooks/useAPI";
import { API_END_POINT } from "../../../config";

const TaskModule = () => {
  const { token,user } = useAuth();
  const { id: batchId } = useParams();
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error, makeNetworkRequest } = useAPI();
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
      `${API_END_POINT}/api/task/${batchId}/list_task/?limit=${limit}&page=${currentPage}`,
      "GET",
      null,
      {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      }
    );
  }, [limit,currentPage]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  const coulmnName = [
    { key: "taskName", title: "Task Name" },
    { key: "dateOfPost", title: "Date of Post" },
    { key: "deadline", title: "Deadline" },
    { key: "completedCount", title: "Completed Count" },
    { key: "more", title: "More" },
  ];

  const taskLists = data?.data || { data: [], total: 0 };
  
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Navbar />
        <Content>
          <div className="bread-crumb">
            <Breadcrumb items={breadcrumbTab} />
          </div>
          <ApplicationHeader
            headerText={"Module"}
            showCreateButton={true}
            showRecordCount={true}
            totalRecords={taskLists.total}
          />

          {loading ? (
            <Skeleton active paragraph={{ rows: 4 }} />
          ) : (
            <>
             <TableComponent data={taskLists} coulmnName={coulmnName} />
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
        </Content>
      </div>
    </div>
  );
};

export default TaskModule;
