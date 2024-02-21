import React from "react";
import { Navigate, Outlet, useParams, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Sidebar from "../layouts/Sidebar";

const PrivateRoute = () => {
  const { token,user } = useAuth();
  const {pathname} = useLocation()

  const auth = token["access"] ? true : false;

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  const menuList = [
    { label: "Applications", id: "applications" },
    { label: "Task", id: "task" },
    { label: "Assessment", id: "assessment" },
    { label: "Permissions Show", id: "permissions" },
  ];


  // Filter for student login remove the application
  const filteredMenuList = menuList.filter(
    (menuItem) => !(user.role === "Student" && menuItem.id === "applications")
  );
    

  return auth ? (
    <div className="container">
      <Sidebar menuList={pathname.includes("dashboard") ? [] : filteredMenuList} />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
