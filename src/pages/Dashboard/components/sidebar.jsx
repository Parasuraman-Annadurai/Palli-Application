// Sidebar.js
import React from 'react';
import logo from "../../../assests/images/dckap_palli_logo.png";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <div className="menus">
        {/* daasboard commanted */}
        <a href="">
        <div className="dasboard-cntainer menu-container active">
        <div className="dashboard flex">
          <span className="material-symbols-outlined">dashboard</span>
          <a>Dashboard</a>
        </div>
        </div>
        </a>
      </div>
      <div className="setting flex">
      <span className="material-symbols-outlined">settings</span>
        <a>Settings</a>
      </div>
    </div>
  );
};

export default Sidebar;
