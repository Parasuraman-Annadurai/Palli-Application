import React, { useEffect, useState } from "react";
import "./Applicantions.css";
import Sidebar from "../../layouts/Sidebar";
import Navbar from "../../layouts/Navbar";
import Content from "../../layouts/ContentArea";
import ApplicationHeader from "../../components/PageHeader";
import TableComponent from "../../components/TableView";
import { API_END_POINT } from "../../../config";
import useAPI from "../../hooks/useAPI";
import { useAuth } from "../../context/AuthContext";
import { Breadcrumb, Pagination, Skeleton } from "antd";
import { useParams } from "react-router-dom";
const Applicantions = () => {
  const {id:batchId} = useParams();
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { token,user } = useAuth();
  
  const breadcrumbTab = [
    {
      title: "Home",
    },
    {
      title: <a href="">Applications</a>,
    },
  ];

  const coulmnName = [
    { key: 'id', title: 'Id' },
    { key: 'firstName', title: 'First Name' },
    { key: 'lastName', title: 'Last Name' },
    { key: 'address', title: 'Address' },
    { key: 'dob', title: 'DOB' },
    { key: 'email', title: 'Email' },
    { key: 'invite', title: 'Invite' },
    { key: 'viewMore', title: 'View More' },
  ];
  const { data, loading, error, makeNetworkRequest } = useAPI();

  useEffect(() => {
    makeNetworkRequest(
      `${API_END_POINT}/api/applicant/${batchId}/list/applicants/?limit=${limit}&page=${currentPage}`,
      "GET",
      null,
      {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      }
    );
  }, [limit, currentPage]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const applicantsData = data?.data || { data: [], total: 0 };
  console.log(user.role);
  return (
      <div className="main">
        <Navbar />
        <Content>
             <div className="bread-crumb">
               <Breadcrumb items={breadcrumbTab} />
             </div>
             <ApplicationHeader totalRecords={applicantsData}
                showUploadButton={true} // Set to true to show the Upload button
                showRecordCount={true} // Set to true to show the record count
                showFilterSelect={true} // Set to true to show the filter Select
                headerText={"Application"}
                showCreateButton={false}
             />
             <div className="filter">{/* Add your filter component here */}</div>
   
             {loading ? (
               <Skeleton active paragraph={{ rows: 4 }} />
             ) : (
               <>
                 <TableComponent data={applicantsData} coulmnName={coulmnName} />
                 <div
                   className={`pagination__container ${
                     applicantsData.total > 0 ? "show" : "hide"
                   }`}
                 >
                   <Pagination
                     current={currentPage}
                     pageSize={limit}
                     total={applicantsData.total}
                     onChange={handleChangePage}
                   />
                 </div>
               </>
             )}
           </Content>
      </div>
  );
};

export default Applicantions;
