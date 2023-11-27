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
    const { token } = useAuth();

    console.log(token.access,"my")

    const { data, loading, error, makeNetworkRequest } = useAPI()

    //this useeffect 
    useEffect(()=>{
      makeNetworkRequest(
        `${API_END_POINT}/api/applicant/1/list/applicants/`,
        "GET",
        null,
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
    },[])

    // console.log(loading,"loading")
    // console.log(error,"error")

    // console.log(data,"data")
    const breadcrumbTab = [
      {
        title: 'Home',
      },
      {
        title: <a href="">Applicants</a>,
      }
    ]
  
    return ( 
        <div className="app">
        <Sidebar />
        <div className="main">
          <Navbar />
          <Content>
          <div className="bread-crumb">
              <Breadcrumb items={breadcrumbTab}/>
              </div>
              <ApplicationHeader />
              <div className="filter">
              </div>
              <TableComponent data={data}/>
              <div className='pagiation__container'>
              <Pagination
                current={1}
                pageSize={5}

                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              />
              </div>
          </Content>
        </div>
        </div>
    );
}
 
export default Applicantions;