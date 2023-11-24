// Sidebar.js
import React from "react";
import logo from "../../../../public/images/dckap_palli_logo_sm.png";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <div className="menus">
        <Link to="">
          <div className="dasboard-cntainer menu-container active">
            <div className="dashboard flex">
              <span className="material-symbols-outlined">dashboard</span>

              <li>Dashboard</li>
            </div>
          </div>
        </Link>
      </div>
      <div className="setting flex">
        <span className="material-symbols-outlined">settings</span>

        <li>Settings</li>
      </div>
    </div>
  );
};

export default Sidebar;
