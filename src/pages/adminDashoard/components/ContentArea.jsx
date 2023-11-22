// Content.js
import React from 'react';
import TableComponent from './tableView';
import ApplicationHeader from './PageHeader';
import { Breadcrumb,Table ,Pagination} from 'antd';
const Content = ({data}) => {


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
      <div className="bread-crumb">
      <Breadcrumb items={breadcrumbTab}/>
      </div>
      <ApplicationHeader totalApplicants={data.length}/>
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
    </div>
  );
};

export default Content;
