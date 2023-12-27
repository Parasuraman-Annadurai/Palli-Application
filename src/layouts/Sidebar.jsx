import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate, NavLink } from "react-router-dom";

import { Button, Modal, List, Avatar, Tooltip } from "antd";
import axios from "axios";

import { useAuth } from "../context/AuthContext";

import { API_END_POINT } from "../../config";

const Sidebar = ({ menu, activeMenuItem }) => {
  const navigate = useNavigate();
  const { id: batchId } = useParams();
  const { token } = useAuth();

  const currentPath = useLocation().pathname;
  const isDashboardPage = currentPath === "/dashboard";

  // const handleSwitch = (id, batchName) => {
  //   Modal.confirm({
  //     title: `Confirm Swith to ${batchName}`,
  //     content: "Are you sure you want to Switch this Batch?",
  //     onOk: () => {
  //       navigate(`/batch/${id}/applications`);
  //       setIsModalOpen(false);
  //       window.location.reload();
  //     },
  //   });
  // };
  // useEffect(() => {
  //   const headers = {
  //     Authorization: `Bearer ${token.access}`,
  //     "Content-type": "application/json",
  //   };
  //   axios.get(`${API_END_POINT}/api/list/batch/`, { headers }).then((res) => {
  //     setBatches(res.data.data);
  //   });
  // }, []);

  const [activeState, setActiveState] = useState({ main: null, sub: null });

  const [showSwitchBatch, setShowSwitchBatch] = useState(false);
  const [batchList, setBatchList] = useState([]);
  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  useEffect(() => {
    axios.get(`${API_END_POINT}/api/list/batch/`, { headers }).then((res) => {
      setBatchList(res.data.data);
    });
  }, []);

  console.log(activeState);
  const handleMainLinkClick = (menuList) => {
    setActiveState({ main: menuList.id, sub: null });
  };

  const handleSubLinkClick = (subLinkId) => {
    setActiveState({ ...activeState, sub: subLinkId });
  };
  return (
    <>
      <nav className="side-nav-container flex">
        <div className="logo">
          <img src="/images/dckap_palli_logo_sm.svg" alt="DCKAP Palli logo" />
        </div>
        <div
          className="batch-switch-container flex"
          onClick={() => setShowSwitchBatch(!showSwitchBatch)}
        >
          <div className="batch-content-container flex">
            <div className="batch-logo">
              <p>B1</p>
            </div>
            <div className="batch-name">
              <p>Batch 1</p>
              <span>2023-2024</span>
            </div>
          </div>
          <div className="switch-icon">
            <img src="/icons/dropdown.svg" alt="" />
          </div>
        </div>

        <div className="nav-links">
          <ul>
            <li className={`main-link ${activeState.main === "home" ? "main-active" : ""}`}>
              <a
                href="#"
                className="flex"
                onClick={() => handleMainLinkClick("home")}
              >
                <img src="/icons/home.svg" alt="home icon" />
                <span>Home</span>
              </a>
            </li>
            {!isDashboardPage && (
              <>
                <ul>
                  {menu.map((menuList) => (
                    <li
                      key={menuList.id}
                      className={`main-link ${
                        activeState.main === menuList.id ? "main-active" : ""
                      }`}
                    >
                      <a
                        href={`/batch/${batchId}${menuList.id}`}
                        className="flex"
                        onClick={() => handleMainLinkClick(menuList)}
                      >
                        <img src="/icons/application.svg" alt="home icon" />
                        <span>{menuList.label}</span>
                      </a>
                      {menuList.id === "module" && (
                        <ul
                          className={`sub-links ${
                            activeState.main === "module" ? "open" : ""
                          }`}
                        >
                          <li
                            className={`sub-link ${
                              activeState.sub === "task" ? "sub-active" : ""
                            }`}
                          >
                            <a href={`/batch/${batchId}/module/task`}>Task</a>
                          </li>
                          <li
                            className={`sub-link ${
                              activeState.sub === "assessment"
                                ? "sub-active"
                                : ""
                            }`}
                            onClick={() => handleSubLinkClick("assessment")}
                          >
                            <a href={`/batch/${batchId}/module/assessment`}>
                              Assessment
                            </a>
                          </li>
                          <li
                            className={`sub-link ${
                              activeState.sub === "quiz" ? "sub-active" : ""
                            }`}
                          >
                            <a href="#">Quiz</a>
                          </li>
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </ul>
        </div>

        <div className="user-profile flex">
          <div className="profile-img">
            <img src="/icons/profile.svg" alt="" />
          </div>
          <div className="user-details">
            <p>Kate Bishop</p>
            <span>Trainer</span>
          </div>
        </div>
      </nav>

      {showSwitchBatch && (
        <div className="popup-container">
          <div className="popup-content">
            <div className="inner-content flex">
              <h3>Switch Batch</h3>
              <div className="close-icon">
                <img
                  src="/public/icons/Cancel.svg"
                  className="cancel-btn"
                  alt=""
                  onClick={() => setShowSwitchBatch(false)}
                />
              </div>
            </div>
            <div className="add-batch">
              <button className="add-batch-btn">
                <span>+</span> Add New Batch
              </button>
            </div>
          </div>
          <div className="switch-batch-list-container">
            {batchList.map((batch, index) => {
              console.log(batch);
              return (
                <div className="switch-batch-card flex" key={index}>
                  <div className="batch-left-side flex">
                    <div className="batch-name-year">
                      <h4>{batch.batch_name}</h4>
                      <p>
                        {batch.start_date.slice(0, 4)} -{" "}
                        {batch.end_date.slice(0, 4)}{" "}
                      </p>
                    </div>
                    <div className="tag">
                      <span>Internship</span>
                    </div>
                  </div>
                  <div className="batch-right-side">
                    <img src="/public/icons/edit-pencil.svg" alt="" />
                  </div>
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

/*

 {!isDashboardPage && (
              <>
                <li
                  className={`main-link ${
                    isActive.application ? "main-active" : ""
                  }`}
                >
                  <a
                    href={`/batch/${batchId}/applications`}
                    className="flex"
                    onClick={() => handleMainLinkClick("application")}
                  >
                    <img src="/icons/application.svg" alt="home icon" />
                    <span>Application</span>
                  </a>
                </li>
                <li
                  className={`main-link ${
                    isActive.session ? "main-active" : ""
                  }`}
                >
                  <a
                    href="#"
                    className="flex"
                    onClick={() => handleMainLinkClick("session")}
                  >
                    <img src="/icons/application.svg" alt="home icon" />
                    <span>Session</span>
                  </a>
                </li>
                <li
                  className={`main-link ${
                    isActive.module ? "main-active" : ""
                  }`}
                >
                  <a
                    href="#"
                    className="flex"
                    onClick={() => handleMainLinkClick("module")}
                  >
                    <img src="/icons/application.svg" alt="home icon" />
                    <span>Module</span>
                  </a>
                  {isModuleActive && (
                    <ul className="sub-links">
                      <li
                        className={`sub-link ${
                          isSubActive.task ? "sub-active" : ""
                        }`}
                        onClick={() => {
                          handleSubLinkClick("task");
                        }}
                      >
                        <a
                          href={`/batch/${batchId}/module/task`}
                          onClick={() => isModuleActive(true)}
                        >
                          Task
                        </a>
                      </li>
                      <li
                        className={`sub-link ${
                          isSubActive.assessment ? "sub-active" : ""
                        }`}
                        onClick={() => handleSubLinkClick("assessment")}
                      >
                        <a
                          href={`/batch/${batchId}/module/assessment`}
                          onClick={() => isModuleActive(true)}
                        >
                          Assessment
                        </a>
                      </li>
                      <li
                        className={`sub-link ${
                          isSubActive.quiz ? "sub-active" : ""
                        }`}
                        onClick={() => handleSubLinkClick("quiz")}
                      >
                        <a href="#" onClick={() => isModuleActive(true)}>
                          Quiz
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  className={`main-link ${
                    isActive.settings ? "main-active" : ""
                  }`}
                >
                  <a
                    href="#"
                    className="flex"
                    onClick={() => handleMainLinkClick("settings")}
                  >
                    <img src="/icons/application.svg" alt="home icon" />
                    <span>Settings</span>
                  </a>
                </li>
              </>
            )}

*/
