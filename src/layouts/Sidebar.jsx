import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";

import { Button, Modal, Input, DatePicker, Skeleton, notification } from "antd";

import axios from "axios";
import { Dropdown, Tooltip } from "antd";

import { DASHBOARD } from "../routes/routes";
import { useAuth } from "../context/AuthContext";

import AddBatch from "../components/AddBatchModule/AddBatch";

import { API_END_POINT } from "../../config";

const Sidebar = ({ menuList, activeMenuItem }) => {
  const navigate = useNavigate();
  const { id: batchId } = useParams();

  const { token, user } = useAuth();

  const currentPath = useLocation().pathname;
  const isDashboardPage = currentPath.includes(DASHBOARD);

  const [active, setActive] = useState(activeMenuItem);
  const [showSwitchBatch, setShowSwitchBatch] = useState(false);
  const [batchList, setBatchList] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(null);


  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };

  useEffect(() => {
    if (user.role !== "Students") {
      if (batchId) {
        // On Batch, setting Applications as default page
        const activeMenuItem = menuList.find((menu) =>
          currentPath.includes(menu.id)
        );
        setActive(activeMenuItem.id);

        axios
          .get(`${API_END_POINT}/api/list/batch/`, { headers })
          .then((res) => {
            const batchListData = res.data.data;
            setBatchList(
              batchListData.filter((batch) => batch.id !== Number(batchId))
            );
            setCurrentBatch(
              batchListData.find((batch) => batch.id === Number(batchId))
            );
          })
          .catch((err) => console.log(err));
      }
    }
  }, [batchId]);

  const handleLogout = () => {
    axios
      .post(`${API_END_POINT}/api/accounts/logout/`, token, { headers })
      .then((res) => {
        navigate("/login");
      });
  };
  const items = [
    {
      label: (
        <button className="btn primary-medium" onClick={handleLogout}>
          Logout
        </button>
      ),
      key: "0",
    },
  ];

  const listBatchLists = batchList.filter(
    (batch) => batch.id !== currentBatch?.id
  );

  return (
    <>
      <nav className="side-nav-container flex">
        <div className="logo" style={{ cursor: "pointer" }}>
          <Link to="/dashboard">
            <img src="/images/dckap_palli_logo_sm.svg" alt="DCKAP Palli logo" />
          </Link>
        </div>

        {!isDashboardPage && (
          <div
            className="batch-switch-container flex"
            onClick={user.role !== "Student" && showDrawer}
            style={{ cursor: user.role === "Student" ? "default" : "pointer" }}
          >
            <div className="batch-content-container flex">
              <div className="batch-logo">
                <p>
                  {currentBatch?.batch_name
                    .split(" ")
                    .map((word, index, array) => {
                      if (array.length === 1) {
                        return word.slice(0, 2).toUpperCase();
                      } else if (index < 2) {
                        return word.slice(0, 1).toUpperCase();
                      } else {
                        return "";
                      }
                    })
                    .join("")}
                </p>
              </div>
              <div className="batch-name">
                {currentBatch?.batch_name.length > 9 ? (
                  <Tooltip title={currentBatch?.batch_name}>
                    <p>
                      {currentBatch?.batch_name.length > 9
                        ? `${currentBatch?.batch_name.slice(0, 9)}...`
                        : currentBatch?.batch_name}
                    </p>
                  </Tooltip>
                ) : (
                  <p>{currentBatch?.batch_name}</p>
                )}
                
                <span>
                  {currentBatch?.start_date?.slice(0, 4)}-
                  {currentBatch?.end_date?.slice(0, 4)}
                </span>
              </div>
            </div>
            <div className="switch-icon">
              <img src="/icons/dropdown.svg" alt="" />
            </div>
          </div>
        )}
        <div className="nav-links">
          <ul>
         
            {menuList &&
              menuList.map((menu, index) => {
               

                return (
                  <li
                    key={index}
                    onClick={() => setActive(menu.id)}
                    className={`main-link ${
                      menu.id === active ? "main-active" : ""
                    }`}
                  >
                    <Link
                      to={
                        isDashboardPage
                          ? "/dashboard"
                          : `/batch/${batchId}/${menu.id}`
                      }
                      className="flex"
                    >
                      <img src="/icons/application.svg" alt={menu.label} />
                      <span>{menu.label}</span>
                    </Link>
                  </li>
                ) 
              })}
          </ul>
        </div>

        <div className="user-profile flex">
          <div className="profile-img">
            <img src="/icons/profile.svg" alt="" />
          </div>

          <Dropdown
            menu={{
              items,
            }}
          >
            <div className="user-details">
              <p>{user.last_name}</p>
              <span>
                {" "}
                {user.role === "Student"
                  ? "Student"
                  : user.role === "Admin"
                  ? "Admin"
                  : user.role}
              </span>
            </div>
          </Dropdown>
        </div>
      </nav>

      <AddBatch
        showSwitchBatch={showSwitchBatch}
        batchList={listBatchLists}
        setShowSwitchBatch={setShowSwitchBatch}
        setBatchList={setBatchList}
        open={open}
        setOpen={setOpen}
        showDrawer={showDrawer}
        onClose={onClose}
      />
    </>
  );
};

export default Sidebar;
