import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import {useForm} from "react-hook-form"
import { Pagination, Skeleton } from "antd";
import axios from "axios";

import TableView from "../../components/TableView";
import CommonFilters from "../../components/CommonFilters";

import { useAuth } from "../../context/AuthContext";

import useFilter from "../../hooks/useFilter";

import { API_END_POINT } from "../../../config";

import "./Applications.css";

const Applications = () => {
  const filter = useFilter("applicant");
  const { id: batchId } = useParams();
  const { token } = useAuth();


  const columnNameList = [
    { key: "full name", title: "Full Name" },
    { key: "dob", title: "DOB" },
    { key: "email", title: "Email" },
    { key: "district", title: "District" },
    { key: "applicantStatus", title: "Applicant Status" },
    { key: "viewMore", title: "View More" },
  ];

  const {
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      applications:[],
      loading:false,
      appliedFilters:{},
      limit: 5,
      applicantSearch: "",
      currentPage: 1,
    },
  });
  const watchFields = watch(); // Get the current form values


  useEffect(() => {
    setValue("loading",true)

    const headers = {
      Authorization: `Bearer ${token.access}`,
      "Content-Type": "application/json",
    };
    axios.get(`${API_END_POINT}/api/applicant/${batchId}/list/applicants/?limit=${watchFields.limit}&page=${watchFields.currentPage}&search=${watchFields.applicantSearch}`,{headers}).then((res)=>{
     setValue("applications",res.data);
    }).catch((error)=>{
      console.log(error);
    }).finally(()=>{
      setValue("loading",false)
    })
  }, [watchFields.limit, watchFields.currentPage, watchFields.applicantSearch]);

  const handleSearch =(event)=>{
    const {value} = event.target;
    setValue("applicantSearch",value)
  }
  const handleChangePage = (page) => {
    setValue("currentPage",page)
  };

  const handleLimit = (limit) => {
    setValue("limit",limit)
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
  return (
    <div className="content">
      <div className="application-header">
        <h2>{"Applications"}</h2>
        <div className="header-controls">
          {watchFields.applications.total > 0 && (
            <button className="upload__btn" type="primary">
              Import
            </button>
          )}

          <CommonFilters
            handleLimit={handleLimit}
            handleName={"applicantSearch"}
            totalRecords={watchFields.applications.total}
            filterArray={filter}
            handleSearch={handleSearch}
            applyFilter={handleApplyFilter}
            appliedFilters={watchFields.appliedFilters}
          />
          <div className="record-count">
            <span>{watchFields.applications.total} Records</span>
          </div>
        </div>
      </div>
      <div className="applied-filters">
        {Object.keys(watchFields.appliedFilters).map((filterName) => (
          <div key={filterName} className="applied-filter">
            <span> {`${filterName}`}</span>
            <span
              class="material-symbols-outlined clear-filter-icon"
              onClick={() => handleCancelFilter(filterName)}
            >
              cancel
            </span>
          </div>
        ))}
      </div>
      {watchFields.loading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <>
          <TableView
            tableData={watchFields.applications.data}
            columnNameList={columnNameList}
            createButtonAction={`/batch/${batchId}/module/add/applicant`}
          />
          <div
            className={`pagination__container ${
              watchFields.applications.total > 0 ? "show" : "hide"
            }`}
          >
            <Pagination
              current={watchFields.currentPage}
              pageSize={watchFields.limit}
              total={watchFields.applications.total}
              onChange={handleChangePage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Applications;
