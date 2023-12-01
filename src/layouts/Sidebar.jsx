import React from "react";
import dckapLogo from "../../public/images/dckap_palli_logo_sm.svg";
import { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Tooltip } from "antd";

const Sidebar = ({ menuList, activeMenuItem }) => {
  const [active, setActive] = useState(activeMenuItem);
  const { id: batchId } = useParams();
  const currentPath = useLocation().pathname;

  const isDashboardPage = currentPath === "/dashboard";

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={dckapLogo} alt="dckap-logo-sm" />
      </div>

      <div className="menus">
        {!isDashboardPage && (
          <Link to="/dashboard">
           <Tooltip title="Dashboard" placement="right" color={"#223F64"}>
           <div className="dashboard-container menu-container">
              <div className="applicants flex">
                <span className="material-symbols-outlined">arrow_back</span>
                <p>Back Dashboard</p>
              </div>
            </div>
           </Tooltip>
          </Link>
        )}

        {menuList.map((menu, index) => (
          <Link
            to={isDashboardPage ? "/dashboard" : `/batch/${batchId}/${menu.id}`}
            key={index}
            onClick={() => setActive(menu.id)}
          >
            <Tooltip title={menu.label} placement="right" color={"#223F64"}>
            <div
              className={`${menu.id}-container menu-container ${
                menu.id === active ? "active" : ""
              }`}
              onClick={() => setActive(menu.id)}
            >
              <div className="applicants flex">
                <span className="material-symbols-outlined">view_list</span>
                <p>{menu.label}</p>
              </div>
            </div>
            </Tooltip>
          </Link>
        ))}
      </div>
      <div className="setting flex">
        <span className="material-symbols-outlined">settings</span>
        <a>Settings</a>
      </div>
    </div>
  );
};

export default Sidebar;
