import React, { useEffect } from "react";
import { Navigate, Outlet, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import { API_END_POINT } from "../../config";

const PrivateRoute = () => {
  const { token,setUser } = useAuth();
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

  useEffect(() => {
    if (Object.keys(token).length > 0) {
      axios({
        url: `${API_END_POINT}/api/accounts/get/user_info/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
        .then((userData) => {
          setUser(userData.data.data);
        })
        .catch((err) => {
          console.error("userData fetch Failed", err);
        });
    }
  }, [token]);

  return auth ? (
    <div className="app">
      <Sidebar menuList={menuList} activeMenuItem={activeMenuItem.id}/>
      <div className="main">
      <Navbar item={activeMenuItem ? [{ label: "Dashboard", link: "/dashboard" }, activeMenuItem] : null} />

         <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
