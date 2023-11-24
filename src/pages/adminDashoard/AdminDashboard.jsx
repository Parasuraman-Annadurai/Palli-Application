import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Content from './components/ContentArea';
import { API_END_POINT } from '../../../config';
import useAPI from '../../hooks/useAPI';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { token } = useAuth();
  const { data, makeNetworkRequest } = useAPI();

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


  const applicantsData = data?.data || { data: [], total: 0 };
  
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Navbar />
        <Content
          applicationData={applicantsData.data}
          limit={limit}
          currentPage={currentPage}
          total={applicantsData.total}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
