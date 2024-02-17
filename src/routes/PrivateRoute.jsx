import React, { useEffect,useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Sidebar from "../layouts/Sidebar";
import axios from "axios";
import { API_END_POINT } from "../../config";

import { jwtDecode } from "jwt-decode";
import { Skeleton } from "antd";

const PrivateRoute = () => {
  const { token, user, setToken } = useAuth();
  const {pathname} = useLocation()

  const auth = token["access"] ? true : false;
  const [loading, setLoading] = useState(true);

  //this refresh token implementation
  useEffect(() => {
    const refreshToken = () => {
      axios.post(`${API_END_POINT}accounts/token/refresh/`, { refresh: token.refresh }).then((res) => {
        const newAccessToken = [...response.data.access];
        setToken({ ...token, access: newAccessToken });
      }).catch((error) => {
        setLoading(false);

      })
    }

    // Check if access token is expired
    const isTokenExpired = (token) => {
      if (!token || !token.access) {
        // If token or access token is not available, consider it expired
        return true;
      }

      const decodedToken = jwtDecode(token.access);

      if (!decodedToken || !decodedToken.exp) {
        // If the token cannot be decoded or does not have an expiration time, consider it expired
        console.error('Error decoding token or token does not have an expiration time');
        return true;
      }

      const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
      const currentTime = Date.now();

      return currentTime > expirationTime; // Check if the current time is greater than the expiration time
    };


    if (isTokenExpired(token)) {
      refreshToken();
    } else {
      setLoading(false);
    }
  }, [token, setToken]);

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  const menuList = [
    { label: "Applications", id: "applications" },
    { label: "Task", id: "task" },
    { label: "Assessment", id: "assessment" },
  ];


  // Filter for student login remove the application
  const filteredMenuList = menuList.filter(
    (menuItem) => !(user.role === "Student" && menuItem.id === "applications")
  );
    
  if (loading) {
    return <div>
      <Skeleton active/>
    </div>;
  }
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
