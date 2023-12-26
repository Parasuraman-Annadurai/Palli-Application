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

  const [isActive, setIsActive] = useState({
    home: false,
    application: false,
    session: false,
    module: false,
    settings: false,
  });

  const [isSubActive, setIsSubActive] = useState({
    task: false,
    assessment: false,
    quiz: false,
  });
  const [isModuleActive, setIsModuleActive] = useState(false);

  const handleMainLinkClick = (link) => {
    const updateActive = { ...isActive };
    Object.keys(updateActive).forEach((key) => {
      const checkIsActive = key === link ? true : false;
      updateActive[key] = checkIsActive;
    });
    setIsActive(updateActive);
    if (link === "module") {
      setIsModuleActive(!isModuleActive);
    }
  };

  const handleSubLinkClick = (link) => {
    const updateSubActive = { ...isSubActive };
    Object.keys(updateSubActive).forEach((key) => {
      const checkIsSubActive = key === link ? true : false;
      updateSubActive[key] = checkIsSubActive;
    });
    setIsSubActive(updateSubActive);
  };
  return (
    <nav className="side-nav-container flex">
      <div className="logo">
        <img src="/images/dckap_palli_logo_sm.svg" alt="DCKAP Palli logo" />
      </div>
      <div className="batch-switch-container flex">
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
          <li className={`main-link ${isActive.home ? "main-active" : ""}`}>
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
                className={`main-link ${isActive.session ? "main-active" : ""}`}
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
                className={`main-link ${isActive.module ? "main-active" : ""}`}
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
  );
};

export default Sidebar;
