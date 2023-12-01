import React from "react";
import { Button, Popover, Breadcrumb } from "antd";
import { useAuth } from "../context/AuthContext";
import useAPI from "../hooks/useAPI";
import { API_END_POINT } from "../../config";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
const Navbar = ({ item }) => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { id: batchId } = useParams();
  const { pathname } = useLocation();

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
        <strong>Username</strong>
        <br />
        {user.email}
      </p>
      <Button type="link" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );

  console.log(batchId);
  return (
    <div className="navbar">
      <div>
        {!batchId ? (
          <h2>
            Welcome to {user.first_name} {user.last_name}
          </h2>
        ) : (
          batchId &&
          item && (
            <Breadcrumb separator=" / ">
              {item.map((breadcrumbItem, index) => (
                <Breadcrumb.Item key={index}>
                  <Link to={breadcrumbItem.link}>{breadcrumbItem.label}</Link>
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          )
        )}
      </div>
      <div className="avatar__container">
        <Popover content={content} placement="bottomRight" trigger="click">
          <div className="avatar__logo">
            <span className="material-symbols-outlined">account_circle</span>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
