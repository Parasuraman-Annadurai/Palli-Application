import React, { useEffect, useState } from "react";
import "./Applicantions.css";
import ApplicationHeader from "../../components/PageHeader";
import TableComponent from "../../components/TableView";
import { API_END_POINT } from "../../../config";
import useAPI from "../../hooks/useAPI";
import { useAuth } from "../../context/AuthContext";
import { Breadcrumb, Pagination, Skeleton } from "antd";
import { useParams } from "react-router-dom";
const Applicantions = () => {
  const { id: batchId } = useParams();
  const [limit, setLimit] = useState(6);
  const [applicantSearch, setApplicantSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { token, user } = useAuth();

  // const breadcrumbTab = [
  //   {
  //     title: "Home",
  //   },
  //   {
  //     title: <a href="">Applications</a>,
  //   },
  // ];

  const coulmnName = [
    { key: "first_name", title: "First Name" },
    { key: "last_name", title: "Last Name" },
    { key: "address", title: "Address" },
    { key: "dob", title: "DOB" },
    { key: "email", title: "Email" },
    { key: "invite", title: "Invite" },
    { key: "viewMore", title: "View More" },
  ];
  const { data: applications, loading, error, makeNetworkRequest } = useAPI();

  useEffect(() => {
    makeNetworkRequest(
      `${API_END_POINT}/api/applicant/${batchId}/list/applicants/?limit=${limit}&page=${currentPage}&search=${applicantSearch}`,
      "GET",
      null,
      {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      }
    );
  }, [limit, currentPage, applicantSearch]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  const handleSearch = (e) => {
    const {value} = e.target;
    setApplicantSearch(value);
  };
  return (
    <div className="content">
      <div className="bread-crumb">
        {/* <Breadcrumb items={breadcrumbTab} /> */}
      </div>
      <ApplicationHeader
        totalRecords={applications}
        showUploadButton={true} // Set to true to show the Upload button
        showRecordCount={true} // Set to true to show the record count
        showFilterSelect={false} // Set to true to show the filter Select
        headerText={"Application"}
        showCreateButton={false}
        handleSearch={handleSearch}
      />
      <div className="filter"></div>

      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <>
          <TableComponent data={applications} columns={coulmnName} />
          <div
            className={`pagination__container ${
              applications.total > 0 ? "show" : "hide"
            }`}
          >
            <Pagination
              current={currentPage}
              pageSize={limit}
              total={applications.total}
              onChange={handleChangePage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Applicantions;
