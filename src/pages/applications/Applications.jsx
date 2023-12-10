import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Pagination, Skeleton } from "antd";
import axios from "axios";

import TableView from "../../components/TableView";
import CommonFilters from "../../components/CommonFilters";

import { useAuth } from "../../context/AuthContext";

import useForm from "../../hooks/useForm";

import { API_END_POINT } from "../../../config";

import "./Applications.css";

const Applications = () => {

  const { id: batchId } = useParams();
  const {token} = useAuth()
  const [applications,setApplications] = useState([])
  const [loading,setLoading] = useState(false)
  
  const columnNameList = [
    { key: "first_name", title: "First Name" },
    { key: "last_name", title: "Last Name" },
    { key: "address", title: "Address" },
    { key: "dob", title: "DOB" },
    { key: "email", title: "Email" },
    { key: "invite", title: "Invite" },
    { key: "viewMore", title: "View More" },
  ];

  const { formData, handleChange} = useForm({
    limit: 5,
    applicantSearch: "",
    currentPage: 1,
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
          `${API_END_POINT}/api/applicant/${batchId}/list/applicants/?limit=${formData.limit}&page=${formData.currentPage}&search=${formData.applicantSearch}`,
          { headers }
        );
  
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData(); 
  }, [formData.limit, formData.currentPage, formData.applicantSearch]);
  
  const handleChangePage = (page) => {
    handleChange({ target: { name: "currentPage", value: page } });
  };
  const handleSearch = (value) => {
       if (value.trim() !== "" || value === "") {
      handleChange({ target: { name: "applicantSearch", value: value.trim() } });
    }
  };

  const handleLimit =(limit)=>{
    handleChange({ target: { name: "limit", value: limit } });
  }
  return (
    <div className="content">
      <div className="application-header">
        <h2>{"Applications"}</h2>
        <div className="header-controls">
          <button className="upload__btn" type="primary">
            Import
          </button>

          <CommonFilters handleLimit={handleLimit}  handleName={"applicantSearch"} handleChange={handleChange}  handleSearch={handleSearch} totalRecords={applications.total}/>
        </div>
      </div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <>
          <TableView tableData={applications.data} columnNameList={columnNameList}  />
          <div
            className={`pagination__container ${
              applications.total > 0 ? "show" : "hide"
            }`}
          >
            <Pagination
              current={formData.currentPage}
              pageSize={formData.limit}
              total={applications.total}
              onChange={handleChangePage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Applications;
