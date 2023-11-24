import React from 'react';
import TableComponent from './tableView';
import ApplicationHeader from './PageHeader';
import { Breadcrumb, Pagination } from 'antd';

const Content = ({ applicationData, limit, currentPage, total, setCurrentPage }) => {
  const breadcrumbTab = [
    {
      title: 'Home',
    },
    {
      title: <a href="/">Applicants</a>,
    },
  ];

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="content">
      <div className="bread-crumb">
        <Breadcrumb items={breadcrumbTab} />
      </div>
      <ApplicationHeader total={total} />
      <div className="filter"></div>
      <TableComponent tableData={applicationData} />
      <div className="pagination__container">
        <Pagination
          current={currentPage}
          pageSize={limit}
          total={total}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default Content;
