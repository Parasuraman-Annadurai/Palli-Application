import React from 'react';
import { useLocation } from 'react-router-dom';
//External Packages here
import { Breadcrumb } from 'antd';


const Breadcrumbs = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const isInDashboard = location.pathname.startsWith('/dashboard');

  if (isInDashboard) {
    // Do not show breadcrumbs in the dashboard
    return null;
  }
  const breadcrumbs = pathSnippets.map((snippet, index) => {

    return (
      <span>
        {snippet}
        {" "}
        {index !== pathSnippets.length - 1 && (
          <span className="breadcrumb-arrow"></span>
        )}
      </span>
    );
  });

  return (
    <Breadcrumb className="breadcrumb-container">{breadcrumbs}</Breadcrumb>
  );
};

export default Breadcrumbs;
