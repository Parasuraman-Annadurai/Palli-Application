import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Pagination, Skeleton } from "antd";
import axios from "axios";

import TableView from "../../components/TableView";
import CommonFilters from "../../components/CommonFilters";

import { useAuth } from "../../context/AuthContext";

import useForm from "../../hooks/useForm";
import useFilter from "../../hooks/useFilter";

import { API_END_POINT } from "../../../config";

import "./Applications.css";

const Applications = () => {
  const filter = useFilter("applicant");

  const { id: batchId } = useParams();
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const columnNameList = [
    { key: "full name", title: "Full Name" },
    { key: "dob", title: "DOB" },
    { key: "email", title: "Email" },
    { key: "district", title: "District" },
    { key: "invite", title: "Invite" },
    { key: "viewMore", title: "View More" },
  ];

  const { formData, handleChange } = useForm({
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

  const handleLimit = (limit) => {
    handleChange({ target: { name: "limit", value: limit } });
  };
  const [appliedFilters, setAppliedFilters] = useState({});

  const handleApplyFilter = (filterData) => {
    setAppliedFilters(filterData);
    Object.keys(filterData).forEach((key) => {
      handleChange({
        target: {
          name: key,
          value: filterData[key],
        },
      });
    });

    console.log(filterData);
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
  return (
    <div className="content">
      <div className="application-header">
        <h2>{"Applications"}</h2>
        <div className="header-controls">
          {applications.total > 0 && (
            <button className="upload__btn" type="primary">
              Import
            </button>
          )}

          <CommonFilters
            handleLimit={handleLimit}
            handleName={"applicantSearch"}
            totalRecords={applications.total}
            filterArray={filter}
            handleChange={handleChange}
            applyFilter={handleApplyFilter}
            appliedFilters={appliedFilters}
          />
          <div className="record-count">
            <span>{applications.total} Records</span>
          </div>
        </div>
      </div>
      <div className="applied-filters">
        {Object.keys(appliedFilters).map((filterName) => (
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
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <>
          <TableView
            tableData={applications.data}
            columnNameList={columnNameList}
            createButtonAction={`/batch/${batchId}/module/add/applicant`}
          />
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
