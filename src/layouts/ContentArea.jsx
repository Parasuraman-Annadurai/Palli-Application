import React from 'react';
import TableComponent from '../components/TableView';
import ApplicationHeader from '../pages/applications/components/PageHeader';
import { Breadcrumb,Table ,Pagination} from 'antd';
const Content = ({children}) => {


  const breadcrumbTab = [
    {
      title: 'Home',
    },
    {
      title: <a href="">Applicants</a>,
    }
  ]
  
  return (
    <div className="content">
      {children}    
    </div>
  );
};

export default Content;
