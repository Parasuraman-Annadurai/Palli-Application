import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar"
const PrivateRoute = () => {
  const { token } = useAuth();
  // determine if authorized, from context or however you're doing it

  const auth = token["access"] ? true : false;

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Navbar/>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
