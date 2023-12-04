import React from "react";
import { Navigate, Outlet, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

const PrivateRoute = () => {
  const { token } = useAuth();
  const { id: batchId } = useParams();
  const { pathname } = useLocation();
  // determine if authorized, from context or however you're doing it

  const auth = token["access"] ? true : false;

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  const menu = [
    { label: "Applications", id: "applications" },
    { label: "Module", id: "module" },
  ];

  const menuList = batchId ? menu : [{ label: "Dashboard", id: "dashboard" }];
  const activeMenuItem = menuList.find((menu) => pathname.includes(menu.id));

  return auth ? (
    <div className="app">
      <Sidebar menuList={menuList} activeMenuItem={activeMenuItem.id}/>
      <div className="main">
        <Navbar />
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
