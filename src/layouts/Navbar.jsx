import React from "react";
import { Button, Popover, Avatar } from "antd";
import { useAuth } from "../context/AuthContext";
import useAPI from "../hooks/useAPI";
import { API_END_POINT } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../components/BreadCrumbs";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { id: batchId } = useParams();

  const { data, error, makeNetworkRequest } = useAPI();

  const handleLogout = () => {
    makeNetworkRequest(`${API_END_POINT}/api/accounts/logout/`, "POST", token, {
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-type": "application/json",
      },
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
      <Button type="link" onClick={handleLogout}>
        Logout
      </Button>
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
