import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate, NavLink } from "react-router-dom";

import { Button, Modal, Input, DatePicker, Skeleton, notification } from "antd";

import axios from "axios";
import { Dropdown } from "antd";

import { DASHBOARD } from "../routes/routes";
import { useAuth } from "../context/AuthContext";

import { API_END_POINT } from "../../config";

const Sidebar = ({ menuList, activeMenuItem }) => {
  const navigate = useNavigate();
  const { id: batchId } = useParams();
  const { token, user } = useAuth();

  const currentPath = useLocation().pathname;
  const isDashboardPage = currentPath.includes(DASHBOARD);

  const [activeState, setActiveState] = useState({ main: null, sub: null });
  const [active, setActive] = useState(activeMenuItem);
  const [showSwitchBatch, setShowSwitchBatch] = useState(false);

  const [batchList, setBatchList] = useState([]);
  const showSwitchBatchRef = useRef(null);
  const showSwitchBatchRefIcon = useRef(null);
  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  useEffect(() => {
    axios.get(`${API_END_POINT}/api/list/batch/`, { headers }).then((res) => {
      setBatchList(res.data.data);
    });
    const closeonoutsideclick = (e) => {
      if (
        showSwitchBatch &&
        showSwitchBatchRef.current &&
        !showSwitchBatchRef.current.contains(e.target) &&
        !showSwitchBatchRefIcon.current.contains(e.target)
      ) {
        setShowSwitchBatch(false);
        // console.log(123);
      }
    };
    window.addEventListener("click", closeonoutsideclick);
    return () => {
      window.removeEventListener("click", closeonoutsideclick);
    };
  }, [showSwitchBatch]);

  const handleMainLinkClick = (menuList) => {
    setActiveState({ main: menuList.id, sub: null });
  };

  const handleSubLinkClick = (subLinkId) => {
    setActiveState({ ...activeState, sub: subLinkId });
  };

  useEffect(() => {
    axios.get(`${API_END_POINT}/api/list/batch/`, { headers }).then((res) => {
      setBatchList(res.data.data);
    });
  }, []);

  const [showInputFields, setShowInputFields] = useState(false);

  const [isAddingBatch, setIsAddingBatch] = useState(false); // New state for switching text

  const handleSwitch = (id, batchName) => {
    Modal.confirm({
      title: `Confirm Switch to ${batchName}`,
      content: "Are you sure you want to Switch this Batch?",
      onOk: () => {
        navigate(`/batch/${id}/applications`);
        window.location.reload();
      },
    });
  };

  const currentBatch = batchList?.filter((a) => a.id === Number(batchId));
  const {
    batch_name: batchName,
    start_date: startDate,
    end_date: endDate,
  } = currentBatch[0] || [];

  const handleLogout = () => {
    axios
      .post(`${API_END_POINT}/api/accounts/logout/`, token, { headers })
      .then((res) => {
        navigate("/login");
        console.log(res);
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
        <div className="logo">
          <img src="/images/dckap_palli_logo_sm.svg" alt="DCKAP Palli logo" />
        </div>

        {!isDashboardPage && (
          <div
            className="batch-switch-container flex"
            // ref={showSwitchBatchRefIcon}
            ref={(ref) => (showSwitchBatchRefIcon.current = ref)}
            onClick={() => setShowSwitchBatch(!showSwitchBatch)}
          >
            <div className="batch-content-container flex">
              <div className="batch-logo">
                <p>B1</p>
              </div>
              <div className="batch-name">
                <p>{batchName ? batchName : ""}</p>
                <span>
                  {startDate ? startDate.slice(0, 4) : ""}-
                  {endDate ? endDate.slice(0, 4) : ""}
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
            {!isDashboardPage && (
              <li className={`main-link`}>
                <a href={"/dashboard"} className="flex">
                  <img src="/icons/backIcon.svg" alt={"Back to Dashboard"} />
                  <span>{"Back to Dashboard"}</span>
                </a>
              </li>
            )}
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
                    <a
                      href={
                        isDashboardPage
                          ? "/dashboard"
                          : `/batch/${batchId}/${menu.id}`
                      }
                      className="flex"
                    >
                      <img
                        src="/public/icons/application.svg"
                        alt={menu.label}
                      />
                      <span>{menu.label}</span>
                    </a>
                  </li>
                );
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
              <span>Admin</span>
            </div>
          </Dropdown>
        </div>
      </nav>
      {showSwitchBatch && (
        <div className="popup-container" ref={showSwitchBatchRef}>
          <div className="popup-content">
            <div className="inner-content flex">
              <h3>{isAddingBatch ? "Add Batch" : "Switch Batch"}</h3>
              <div className="close-icon">
                <img
                  src="/public/icons/Cancel.svg"
                  className="cancel-btn"
                  alt=""
                  onClick={() => setShowSwitchBatch(false)}
                />
              </div>
            </div>
          </div>
          <div className="switch-batch-list-container">
            {batchList.map((batch, index) => {
              // console.log(batch);
              return (
                <div
                  className="switch-batch-card flex"
                  onClick={() => handleSwitch(batch.id, batch.batch_name)}
                  key={index}
                >
                  <div className="batch-left-side flex">
                    <div className="batch-name-year">
                      <h4>{batch.batch_name}</h4>
                      <p>
                        {batch.start_date.slice(0, 4)} -{" "}
                        {batch.end_date.slice(0, 4)}{" "}
                      </p>
                    </div>
                    {/* <div className="tag">
                      <span>Internship</span>
                    </div> */}
                  </div>
                  {/* <div className="batch-right-side">
                    <img
                      src="/public/icons/edit-pencil.svg"
                      alt=""
                      // handleEditClick={handleEditClick}
                    />
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
