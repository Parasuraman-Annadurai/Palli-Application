// taskmodule.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Skeleton, Pagination, Modal,Tag } from "antd";
import axios from "axios";

import TableView from "../../components/TableView";
import CommonFilter from "../../components/CommonFilters";

import useForm from "../../hooks/useForm";
import useFilter from "../../hooks/useFilter";

import { useAuth } from "../../context/AuthContext";

import { API_END_POINT } from "../../../config";

import "./TaskModule.css";

const TaskModule = () => {
  const navigate = useNavigate();
  const filter = useFilter("task");

  const { token } = useAuth();
  const { id: batchId } = useParams();
  const [taskLists, setTaskLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { formData, handleChange } = useForm({
    limit: 4,
    currentPage: 1,
    taskSearch: "",
    task_type: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      };
      axios
        .get(
          `${API_END_POINT}/api/task/${batchId}/list_task/?limit=${formData.limit}&page=${formData.currentPage}&filter_task_type=${formData.task_type}&sort_key=${sortKey}&sort_order=${sortOrder === "asc" ? 0 : 1}&search=${formData.taskSearch}`,
          { headers }
        )
        .then((res) => {
          setTaskLists(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, [
    formData.limit,
    formData.currentPage,
    formData.taskSearch,
    formData.task_type,
  ]);

  // const columnNameList = [
  //   { key: "task_title", title: "Task Name" },
  //   { key: "task_description", title: "Task Description" },
  //   { key: "due_date", title: "Deadline" },
  //   { key: "task_type", title: "Task Type" },
  //   { key: "action", title: "Action" },
  // ];

  const columnNameList = [
    { key: "task_title", title: "Task Name", sortable: true },
    { key: "task_description", title: "Task Description", sortable: true },
    { key: "due_date", title: "Deadline", sortable: true },
    { key: "task_type", title: "Task Type", sortable: true },
    { key: "action", title: "Action" },
  ];
  const handleChangePage = (page) => {
    handleChange({ target: { name: "currentPage", value: page } });
  };
  const handleCreate = () => {
    navigate(`/batch/${batchId}/module/add/task`);
  };
  const handleDelete = (deleteTaskId) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this task?",
      onOk: () => {
        axios
          .delete(
            `${API_END_POINT}/api/task/${batchId}/delete_task/${deleteTaskId}`,
            {
              headers: {
                Authorization: `Bearer ${token.access}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            // Update taskLists after successful deletion
            setTaskLists((prevTaskLists) => ({
              ...prevTaskLists,
              data: prevTaskLists.data.filter((item) => item.id !== deleteTaskId),
              total: prevTaskLists.total - 1,
            }));
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  };

  const handleEdit = (editId) => {
    navigate(`/batch/${batchId}/module/edit/task/${editId}`);
  };

  const handleLimit = (limit) => {
    handleChange({ target: { name: "limit", value: limit } });
  };
  const [appliedFilters, setAppliedFilters] = useState({});

  const handleApplyFilter = (filterData) => {
    setAppliedFilters(filterData)
    Object.keys(filterData).forEach((key) => {
      handleChange({
        target: {
          name: key,
          value: filterData[key],
        },
      });
    });
  };

  const handleCancelFilter = (filterName) => {
    const updatedFilters = { ...appliedFilters };
    delete updatedFilters[filterName];
    setAppliedFilters(updatedFilters);
    handleChange({
      target: {
        name: `${filterName}`,
        value: "",
      },
    });
  };

  const handleSortChange = (key) => {
    if (sortKey === key) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };
  return (
    <div className="content">
      <div className="application-header">
        <h2>Tasks</h2>
        <div className="header-controls">
         {taskLists.total > 0 &&(
           <button className="btn add-task" onClick={handleCreate}>
           Create
         </button>
         )}
          <CommonFilter
            handleChange={handleChange}
            handleLimit={handleLimit}
            handleName={"taskSearch"}
            filterArray={filter}
            applyFilter={handleApplyFilter}
            appliedFilters={appliedFilters}
          />
           <div className="record-count">
            <span>{taskLists.total} Records</span>
          </div>
        </div>
        
      </div>
      <div className="applied-filters">
          {Object.keys(appliedFilters).map((filterName) => (
            <div key={filterName} className="applied-filter">
              <Tag color="green">
              <span>{`${filterName}`}</span>
              </Tag>
              <span class="material-symbols-outlined clear-filter-icon" onClick={() => handleCancelFilter(filterName)}>cancel</span>
            </div>
          ))}
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
            createButtonAction={`/batch/${batchId}/module/add/task`}
            sortKey={sortKey}
            sortOrder={sortOrder}
            handleSortChange={handleSortChange}

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
