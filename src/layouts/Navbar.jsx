import React from "react";
import { useNavigate, useParams } from "react-router-dom";
//External package paste here
import { Popover,Avatar } from "antd";
//Context paste here
import { useAuth } from "../context/AuthContext";
//Custom hook paste here
import useAPI from "../hooks/useAPI";
//API endpoint paste here
import { API_END_POINT } from "../../config";
//Our component paste here
import Breadcrumbs from "../components/BreadCrumbs"

const Navbar = ({ item }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id: batchId } = useParams();
  const { makeNetworkRequest } = useAPI();

  const handleLogout = () => {
    makeNetworkRequest(`${API_END_POINT}/api/accounts/logout/`, "POST",null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const content = (
    <div>
      <p>
        <strong>Email Id</strong>
        <br />
        {user.email}
      </p>
      <button className="btn logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
  const getRandomColor = () => {
    const colors = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="navbar">
      <div>
        <Breadcrumbs/>
        {!batchId && <h1>welcome {user.first_name} {user.last_name}</h1>}
      </div>
      <div className="avatar__container">
        <Popover content={content} placement="bottomRight" trigger="click">
          <div className="avatar__logo">
            <Avatar
              style={{ backgroundColor: getRandomColor() }}
            >{`${user.first_name.charAt(0).toUpperCase()}${user.last_name
              .charAt(0)
              .toUpperCase()}`}</Avatar>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
