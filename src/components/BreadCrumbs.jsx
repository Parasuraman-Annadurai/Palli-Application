import React from "react";
import { useLocation } from "react-router-dom";

import { Breadcrumb } from "antd";

const Breadcrumbs = () => {
  const location = useLocation();
  const breadcrumbsPath = location.pathname.split("/").filter((i) => i);

  const isInDashboard = location.pathname.startsWith("/dashboard");

  if (isInDashboard) {
    // Do not show breadcrumbs in the dashboard
    return null;
  }
  const breadcrumbs = breadcrumbsPath.map((path, index) => {
    return (
      <span key={index}>
        {`${path.charAt(0).toUpperCase()}${path.slice(1)}`}
        {index !== breadcrumbsPath.length - 1 && (
          <span className="material-symbols-outlined double-arrow">
            double_arrow
          </span>
        )}
      </span>
    );
  });

  return (
    <Breadcrumb className="breadcrumb-container">{breadcrumbs}</Breadcrumb>
  );
};

export default Breadcrumbs;
