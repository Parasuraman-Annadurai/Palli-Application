import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


import { Skeleton, Pagination, Modal,Tag,notification } from "antd";
import axios from "axios";
import {useForm} from "react-hook-form"

import TableView from "../../components/TableView";
import CommonFilter from "../../components/CommonFilters";

import useFilter from "../../hooks/useFilter";

import { useAuth } from "../../context/AuthContext";

import { API_END_POINT } from "../../../config";

import "./TaskModule.css";

const TaskModule = () => {
  const navigate = useNavigate();
  const filter = useFilter("task");

  const { token } = useAuth();
  const { id: batchId } = useParams();



  const {
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      taskLists:[],
      loading:false,
      sortKey:"",
      sortOrder:"",
      limit: 5,
      currentPage: 1,
      taskSearch: "",
      task_type:"",
      appliedFilters:{}
    },
  });
  const watchFields = watch(); // Get the current form values


  useEffect(() => {

    setValue("loading",true)
    const headers = {
      Authorization: `Bearer ${token.access}`,
      "Content-Type": "application/json",
    };
    
    axios
    .get(
      `${API_END_POINT}/api/task/${batchId}/list_task/?limit=${watchFields.limit}&page=${watchFields.currentPage}&filter_task_type=${watchFields.task_type}&sort_key=${watchFields.sortKey}&sort_order=${watchFields.sortOrder}&search=${watchFields.taskSearch}`
      ,
      { headers }
    )
    .then((res) => {
      setValue("taskLists",res.data)
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setValue("loading",false)
    });
  }, [
    watchFields.limit,
    watchFields.currentPage,
    watchFields.taskSearch,
    watchFields.task_type,
    watchFields.sortKey,
    watchFields.sortOrder
    
  ]);

  const columnNameList = [
    { key: "task_title", title: "Task Name" },
    { key: "task_description", title: "Task Description" },
    { key: "due_date", title: "Deadline" },
    { key: "task_type", title: "Task Type" },
    { key: "action", title: "Action" },
  ];

  const handleLimit = (limit) => {
    console.log(limit);
    setValue("limit",limit)
  };

  const handleSearch =(event)=>{
    const {value} = event.target
    setValue("taskSearch",value)
  }
  const handleChangePage = (page) => {
    setValue("currentPage",page)
  };
  const handleCreate = () => {
    navigate(`/batch/${batchId}/module/addtask`);
  };


  const handleEdit = (editId) => {
    navigate(`/batch/${batchId}/module/edit/${editId}`);
  };
  const handleDelete = (deleteTask) => {
    Modal.confirm({
      title: `Confirm Deletion the ${deleteTask.task_title} `,
      content: `Are you sure you want to delete this ${deleteTask.task_title}?`,
      onOk: () => {
        axios
          .delete(
            `${API_END_POINT}/api/task/${batchId}/delete_task/${deleteTask.id}`,
            {
              headers: {
                Authorization: `Bearer ${token.access}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            // Update taskLists after successful deletion
            const updatedTasklist = {
              data: watchFields.taskLists.data.filter((item) => item.id !== deleteTask.id),
              total: watchFields.taskLists.total - 1,
            };
            setValue("taskLists", updatedTasklist);
            notification.success({
              message: "Success",
              description: "Task Deleted Successfully",
              duration: 3,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  };
 

  const handleApplyFilter = (filterData) => {
    setValue("appliedFilters",filterData)
    Object.keys(filterData).forEach((key) => {
      setValue(key,filterData[key])
     
    });
  };

  const handleCancelFilter = (filterName) => {
    const updatedFilters = { ...watchFields.appliedFilters };
    delete updatedFilters[filterName];
    setValue("appliedFilters",updatedFilters)
    setValue(filterName,"")
   
  };

  const handleSortChange = (columnName,order) => {
    setValue("sortKey",columnName)
    setValue("sortOrder",order)
  };

  return (
    <div className="content">
      <div className="application-header">
        <h2>Tasks</h2>
        <div className="header-controls">
         {watchFields.taskLists.total > 0 &&(
           <button className="btn add-task" onClick={handleCreate}>
           Create
         </button>
         )}
          <CommonFilter
           handleSearch={handleSearch}
            handleLimit={handleLimit}
            handleName={"taskSearch"}
            filterArray={filter}
            applyFilter={handleApplyFilter}
            appliedFilters={watchFields.appliedFilters}
          />
           <div className="record-count">
            <span>{watchFields.taskLists.total} Records</span>
          </div>
        </div>
        
      </div>
      <div className="applied-filters">
          {Object.keys(watchFields.appliedFilters).map((filterName) => (
            <div key={filterName} className="applied-filter">
              <Tag color="green">
              <span>{`${filterName}`}: {watchFields.appliedFilters[filterName] === 0 ? "Task" : "Assessment"}</span>
              </Tag>
              <span class="material-symbols-outlined clear-filter-icon" onClick={() => handleCancelFilter(filterName)}>cancel</span>
            </div>
          ))}
        </div>
       
      {watchFields.loading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <>
          <TableView
            tableData={watchFields.taskLists.data}
            columnNameList={columnNameList}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            createButtonAction={`/batch/${batchId}/module/add/task`}
            sortKey={watchFields.sortKey}
            sortOrder={watchFields.sortOrder}
            handleSortChange={handleSortChange}

          />
          <div
            className={`pagination__container ${
              watchFields.taskLists.total > 0 ? "show" : "hide"
            }`}
          >
            <Pagination
              current={watchFields.currentPage}
              pageSize={watchFields.limit}
              total={watchFields.taskLists.total}
              onChange={handleChangePage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TaskModule;
