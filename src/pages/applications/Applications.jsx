import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
//External packages here
import { Pagination, Skeleton } from "antd";
//Components paste here
import TableComponent from "../../components/TableView";
import CommonFilter from "../../components/CommonFilters";
//Custom hook paste here
import useAPI from "../../hooks/useAPI";
import useForm from "../../hooks/useForm";
import useFilter from "../../hooks/useFilter";

//API endpoint paste here
import { API_END_POINT } from "../../../config";
//CSS here
import "./Applications.css";
const Applications = () => {
  const { id: batchId } = useParams();
  const filter = useFilter("applicant");
  const coulmnNameList = [
    { key: "first_name", title: "First Name" },
    { key: "last_name", title: "Last Name" },
    { key: "address", title: "Address" },
    { key: "dob", title: "DOB" },
    { key: "email", title: "Email" },
    { key: "invite", title: "Invite" },
    { key: "viewMore", title: "View More" },
  ];
  const { data: applications, loading, makeNetworkRequest } = useAPI();

  const { formData, handleChange } = useForm({
    limit: 5,
    applicantSearch: "",
    currentPage: 1,
  });
  useEffect(() => {
    makeNetworkRequest(
      `${API_END_POINT}/api/applicant/${batchId}/list/applicants/?limit=${formData.limit}&page=${formData.currentPage}&search=${formData.applicantSearch}`,
      "GET",
      null
    );
  }, [formData.limit, formData.currentPage, formData.applicantSearch]);

  const handleChangePage = (page) => {
    handleChange({ target: { name: "currentPage", value: page } });
  };
  const handleSearch = (value) => {
    if (value.trim() !== "" || value === "") {
      handleChange({
        target: { name: "applicantSearch", value: value.trim() },
      });
    }
  };

  const handleLimit = (limit) => {
    handleChange({ target: { name: "limit", value: limit } });
  };
  return (
    <div className="content">
      <div className="application-header">
        <h2>{"Applications"}</h2>
        <div className="header-controls">
          <div className="record-count">
            <span>{applications.total} Records</span>
          </div>
          <button className="upload__btn" type="primary">
            Import
          </button>
          <CommonFilter
            handleChange={handleChange}
            handleLimit={handleLimit}
            handleName={"taskSearch"}
            filterArray={filter}
          />{" "}
        </div>
      </div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <>
          <TableComponent data={applications} coulmnNameList={coulmnNameList} />
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
