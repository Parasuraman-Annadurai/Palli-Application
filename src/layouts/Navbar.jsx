import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Popover, Avatar } from "antd";
import axios from "axios";

import { useAuth } from "../context/AuthContext";

import { API_END_POINT } from "../../config";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { id: batchId } = useParams();
  const handleLogout = () => {
    const headers = {
      Authorization: `Bearer ${token.access}`,
      "Content-type": "application/json",
    };
    axios
      .post(`${API_END_POINT}/api/accounts/logout/`, token, { headers })
      .then((res) => {
        console.log("Logout Successfully");
      });
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
        <Breadcrumbs />
        {!batchId && (
          <h1>
            welcome {user.first_name} {user.last_name}
          </h1>
        )}
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
