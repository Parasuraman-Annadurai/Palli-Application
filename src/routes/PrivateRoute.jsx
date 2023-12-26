import React from "react";
import { Navigate, Outlet, useParams, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

const PrivateRoute = () => {
  const { token } = useAuth();
  const { id: batchId } = useParams();
  const { pathname } = useLocation();

  const auth = token["access"] ? true : false;

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  const menu = [
    { label: "Applications", id: "applications" },
    {
      label: "Module",
      id: "module",
      subMenu: [
        { label: "Task", id: "module/task" },
        { label: "Assessment", id: "module/assessment" },
        { label: "Quiz", id: "module/quiz" },
      ],
    },
  ];
  const menuList = batchId ? menu : [{ label: "Dashboard", id: "dashboard" }];
  const activeMenuItem = menuList.find((menu) => pathname.includes(menu.id));

  return auth ? (
    <div className="container">
      <Sidebar menu={menu} activeMenuItem={activeMenuItem} />
       <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
