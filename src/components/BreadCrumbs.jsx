import React from "react";
import { useLocation } from "react-router-dom";

import { Breadcrumb } from "antd";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const isInDashboard = location.pathname.startsWith("/dashboard");

  if (isInDashboard) {
    // Do not show breadcrumbs in the dashboard
    return null;
  }
  const breadcrumbs = pathSnippets.map((snippet, index) => {
    return (
      <span key={index}>
      {snippet}{" "}
      {index !== pathSnippets.length - 1 && (
       <span className="material-symbols-outlined double-arrow" >
       double_arrow
       </span>
      )}
    </span>
    );
  });

  return (
    <Breadcrumb className="breadcrumb-container" >{breadcrumbs}</Breadcrumb>
  );
};

export default Breadcrumbs;
