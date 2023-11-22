import React, { useEffect, useState } from 'react'


import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Content from './components/ContentArea';

import UserService from '../../services/UserService';

const AdminDashoboard = () => {
    const [applicants,setApplicants] = useState("")

    //this useeffect 
    useEffect(()=>{
      UserService.getApplicants().then(res=>{
        setApplicants(res.data)
      })
    },[])
  
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