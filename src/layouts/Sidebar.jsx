import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";

import axios from "axios";
import { Dropdown, Tooltip } from "antd";

import { DASHBOARD } from "../routes/routes";
import { useAuth } from "../context/AuthContext";

import AddBatch from "../components/AddBatchModule/AddBatch";

import { API_END_POINT } from "../../config";
import { getPermission } from '../utils/validate';

const Sidebar = ({ menuList, activeMenuItem }) => {
  const navigate = useNavigate();
  const { id: batchId } = useParams();

  const { token, user } = useAuth();

  const currentPath = useLocation().pathname;
  const isDashboardPage = currentPath.includes(DASHBOARD);

  const [active, setActive] = useState(activeMenuItem);
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
      if (batchId) {
        // On Batch, setting Applications as default page
        const activeMenuItem = menuList.find((menu) =>
        currentPath.includes(menu.id)
      );
      setActive(activeMenuItem.id);
      const batchListData = user?.batch;
      console.log(batchListData);
      setBatchList(
        batchListData.filter((batch) => batch.id !== Number(batchId))
      );
      setCurrentBatch(
        batchListData.find((batch) => batch.id === Number(batchId))
      );

      }
  }, [batchId]);


  const handleLogout = () => {
    axios
      .post(`${API_END_POINT}/api/accounts/logout/`, token, { headers })
      .then((res) => {
        navigate("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

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
            onClick={getPermission(user.permissions,"Batch","read") && showDrawer}
            style={{ cursor: getPermission(user.permissions,"Batch","read") ?  "pointer" : "default"}}
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
             {getPermission(user.permissions,"Batch","read") && <img src="/icons/dropdown.svg" alt="" /> }
            </div>
          </div>
        )}
        <div className="nav-links">
          <ul>
            {menuList.map((menu, index) => {
              // Check if the menu id is "applications" and the user has permission related to "Applicant"
              if (menu.id === "applications" && getPermission(user.permissions, "Applicant", "create")) {
                return (
                  <li
                    key={index}
                    onClick={() => setActive(menu.id)}
                    className={`main-link ${menu.id === active ? "main-active" : ""}`}
                  >
                    <Link
                      to={isDashboardPage ? "/dashboard" : `/batch/${batchId}/${menu.id}`}
                      className="flex"
                    >
                      <img src="/icons/application.svg" alt={menu.label} />
                      <span>{menu.label}</span>
                    </Link>
                  </li>
                );
              } else if (menu.id === "task" || menu.id === "assessment" || menu.id == "permissions") {
                // Render the remaining menu items only if the user has permission to read Task
                const hasReadPermissionForTask = getPermission(user.permissions, "Task", "read");
                if (hasReadPermissionForTask) {
                  return (
                    <li
                      key={index}
                      onClick={() => setActive(menu.id)}
                      className={`main-link ${menu.id === active ? "main-active" : ""}`}
                    >
                      <Link
                        to={isDashboardPage ? "/dashboard" : `/batch/${batchId}/${menu.id}`}
                        className="flex"
                      >
                        <img src="/icons/application.svg" alt={menu.label} />
                        <span>{menu.label}</span>
                      </Link>
                    </li>
                  );
                } else {
                  return null; // Skip rendering Task and Assessment if user doesn't have read permission for Task
                }
              } else {
                return null; // Skip rendering other menu items
              }
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
              <p>{user.first_name} {user.last_name}</p>
              <span>
                {" "}
                {user.role}
              </span>
            </div>
          </Dropdown>
        </div>
      </nav>
      <AddBatch
        batchList={batchList} //all batches
        setBatchList={setBatchList} // for setting all batches 
        open={open} // drawer open
        setOpen={setOpen} // set drawer open state
        onClose={onClose}
      />
    </>
  );
};

export default Sidebar;
