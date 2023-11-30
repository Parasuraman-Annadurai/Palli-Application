import React from "react";
import dckapLogo from "../../public/images/dckap_palli_logo_sm.svg";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useParams, useLocation } from "react-router-dom";
const Sidebar = ({ menuList, activeMenuItem }) => {
  const [active, setActive] = useState(activeMenuItem);
  const { id: batchId } = useParams();
  const currentPath = useLocation().pathname;

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={dckapLogo} alt="dckap-logo-sm" />
      </div>

      <div className="menus">
        <div className="menus">
          {currentPath !== "/dashboard" && (
            <Link to={`/dashboard`}>
              <div className={`dashboard-container  menu-container`}>
                <div className="applicants flex">
                  <span className="material-symbols-outlined">arrow_back</span>
                  <p>DashBoard</p>
                </div>
              </div>
            </Link>
          )}
          {menuList.map((menu, index) =>
            menu.label === "/dasboard" ? (
              <Link
                to={`/dashboard`}
                key={index}
                onClick={() => setActive("dashboard")}
              >
                <div
                  className={`${menu.id}-container  menu-container ${
                    "dashboard" === active ? "active" : ""
                  }`}
                  onClick={() => setActive(menu.id)}
                >
                  <div className="applicants flex">
                    <span className="material-symbols-outlined">view_list</span>
                    <p>{"Dasboard"}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                to={`/batch/${batchId}/${menu.id}`}
                key={index}
                onClick={() => setActive(menu.id)}
              >
                <div
                  className={`${menu.id}-container  menu-container ${
                    menu.id === active ? "active" : ""
                  }`}
                  onClick={() => setActive(menu.id)}
                >
                  <div className="applicants flex">
                    <span className="material-symbols-outlined">view_list</span>
                    <p>{menu.label}</p>
                  </div>
                </div>
              </Link>
            )
          )}

          {/* Conditional rendering for "Back to Dashboard" button */}
        </div>
      </div>
      <div className="setting flex">
        <span className="material-symbols-outlined">settings</span>
        <a>Settings</a>
      </div>
    </div>
  );
};

export default Sidebar;
