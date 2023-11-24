import React, { useEffect, useState } from 'react'


import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Content from './components/ContentArea';
import { API_END_POINT } from '../../../config';

import UserService from '../../services/UserService';
import useAPI from '../../hooks/useAPI';
import { useAuth } from '../../context/AuthContext';

const AdminDashoboard = () => {
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
      // UserService.getApplicants().then(res=>{
      //   setApplicants(res.data)
      // })
    },[])

    console.log(loading,"loading")
    console.log(error,"error")

    console.log(data,"data")

  
    return ( 
        <div className="app">
        <Sidebar />
        <div className="main">
            <Navbar />
          <Content data={applicants}/>
        </div>
        </div>
    );
}
 
export default AdminDashoboard;