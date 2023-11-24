import React, { useEffect, useState } from 'react'
import "./Applicantions.css"
import Sidebar from '../../layouts/Sidebar';
import Navbar from '../../layouts/Navbar';
import Content from '../../layouts/ContentArea';
import ApplicationHeader from './components/PageHeader';
import TableComponent from '../../components/TableView';
import { API_END_POINT } from '../../../config';
import useAPI from '../../hooks/useAPI';
import { useAuth } from '../../context/AuthContext';
import { Breadcrumb,Pagination } from 'antd';

const Applicantions = () => {
    const [applicants,setApplicants] = useState([])
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const { token } = useAuth();
    const breadcrumbTab = [
      {
        title: 'Home',
      },
      {
        title: <a href="">Applicants</a>,
      }
    ]

    const { data, loading, error, makeNetworkRequest } = useAPI()

    useEffect(() => {
      makeNetworkRequest(
        `${API_END_POINT}/api/applicant/1/list/applicants/?limit=${limit}&page=${currentPage}`,
        'GET',
        null,
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
    }, [limit, currentPage]);

    const handleChangePage=(page)=>{
      setCurrentPage(page);
    }
  
    const applicantsData = data?.data || { data: [], total: 0 };
    return ( 
        <div className="app">
        <Sidebar />
        <div className="main">
          <Navbar />
          <Content>
          <div className="bread-crumb">
              <Breadcrumb items={breadcrumbTab}/>
              </div>
              <ApplicationHeader totalRecords={applicantsData}/>
              <div className="filter">
              </div>
              <TableComponent applicationListData={applicantsData}/>
              <div className='pagiation__container'>
              <Pagination
                current={currentPage}
                pageSize={limit}
                total={applicantsData.total}
                onChange={handleChangePage}
              />
              </div>
          </Content>
        </div>
        </div>
    );
}
 
export default Applicantions;