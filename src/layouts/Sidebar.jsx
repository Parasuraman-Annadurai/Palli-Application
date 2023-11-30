import React from "react";
import dckapLogo from "../../public/images/dckap_palli_logo_sm.svg";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
const Sidebar = ({ menuList }) => {
  const [active, setActive] = useState("applications");
  const { id: batchId } = useParams();

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={dckapLogo} alt="dckap-logo-sm" />
      </div>

      <div className="menus">
        {menuList.map((menu, index) => (
          <Link to={`/batch/${batchId}/${menu.id}`} key={index}>
            <div
              className={`${menu.id}-container  menu-container ${
                active === menu.id ? "active" : ""
              }`}
              onClick={() => setActive(menu.id)}
            >
              <div className="applicants flex">
                <span className="material-symbols-outlined">view_list</span>
                <p>{menu.label}</p>
              </div>
            </div>
          </Link>
        ))}
        {/* <Link to={"/dashboard"}>
          <div className={`application-container  menu-container `}>
            <div className="applicants flex">
              <span className="material-symbols-outlined">view_list</span>
              <p>Back to Dasboard</p>
            </div>
          </div>
        </Link>

        <Link to={`/batch/${batchId}/applications`}>
          <div
            className={`application-container  menu-container ${
              active === "application" ? "active" : ""
            }`}
            onClick={() => setActive("application")}
          >
            <div className="applicants flex">
              <span className="material-symbols-outlined">view_list</span>
              <p>Application</p>
            </div>
          </div>
        </Link> */}

        {/* <Link to={`/batch/${batchId}/module`}>
          <div
            className={`test-container menu-container ${
              active === "task" ? "active" : ""
            }`}
            onClick={() => setActive("task")}
          >
            <div className="task flex">
              <span className="material-symbols-outlined">inventory</span>
              <p>Module</p>
            </div>
          </div>
        </Link> */}
      </div>
      <div className="setting flex">
        <span className="material-symbols-outlined">settings</span>
        <a>Settings</a>
      </div>
    </div>
  );
};

export default Sidebar;
