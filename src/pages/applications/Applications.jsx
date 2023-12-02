import React, { useEffect, useState } from "react";
import "./Applicantions.css";
//spelling mistake
import ApplicationHeader from "../../components/PageHeader";
import TableComponent from "../../components/TableView";
import { API_END_POINT } from "../../../config";
import useAPI from "../../hooks/useAPI";
import { useAuth } from "../../context/AuthContext";
//remove the unused packages
import { Breadcrumb, Pagination, Skeleton } from "antd";
import { useParams } from "react-router-dom";

//spelling mistake
const Applicantions = () => {
  const { id: batchId } = useParams();
  //develop a custom hooks called useSearchAndLimit which handles limit, search, currentpage stuff and returns limit,search,currentpage,records
  //develop a sep componet for pagination and pass the parameters
  const [limit, setLimit] = useState(6);
  const [applicantSearch, setApplicantSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { token, user } = useAuth();


  //remove this if you're not using it

  // const breadcrumbTab = [
  //   {
  //     title: "Home",
  //   },
  //   {
  //     title: <a href="">Applications</a>,
  //   },
  // ];

  //keep columnNameList as name
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
    //move the header
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


  // if it is just one line just set the state in onchange itself     
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  // move this to custom hook
  const handleSearch = (e) => {
    const {value} = e.target;
    setApplicantSearch(value);
  };
  return (
    <div className="content">
      <div className="bread-crumb">
        {/* <Breadcrumb items={breadcrumbTab} /> */}
      </div>
      {/* CHange this component */}
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
