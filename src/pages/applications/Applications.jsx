import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//external packages
import { Pagination, Skeleton } from "antd";
//components paste here
import ApplicationHeader from "../../components/PageHeader";
import TableComponent from "../../components/TableView";
//custom hook paste here
import useAPI from "../../hooks/useAPI";
//API endpoint paste here
import { API_END_POINT } from "../../../config";
//css
import "./Applicantions.css";
const Applicantions = () => {
  const { id: batchId } = useParams();
  const [limit, setLimit] = useState(6);
  const [applicantSearch, setApplicantSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    makeNetworkRequest(
      `${API_END_POINT}/api/applicant/${batchId}/list/applicants/?limit=${limit}&page=${currentPage}&search=${applicantSearch}`,
      "GET",
      null
    );
  }, [limit, currentPage, applicantSearch]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  const handleSearch = (e) => {
    const { value } = e.target;
    setApplicantSearch(value);
  };
  return (
    <div className="content">
      <ApplicationHeader
        totalRecords={applications}
        showUploadButton={true} // Set to true to show the Upload button
        showRecordCount={true} // Set to true to show the record count
        showFilterSelect={false} // Set to true to show the filter Select
        headerText={"Applications"}
        showCreateButton={false}
        handleSearch={handleSearch}
      />
     
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <>
          <TableComponent data={applications} columns={coulmnNameList} />
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
