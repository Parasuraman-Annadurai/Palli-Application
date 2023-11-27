// Sidebar.js
import React from 'react';
import dckapLogo from "../../public/images/dckap_palli_logo_sm.svg"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={dckapLogo} alt="dckap-logo-sm" />
      </div>

      <div className="menus">
        {/* daasboard commanted */}
        {/* <a href="">
        <div className="dasboard-cntainer menu-container ">
        <div className="dashboard flex">
          <span className="material-symbols-outlined">dashboard</span>
          <a>Dashboard</a>
        </div>
        </div>
        </a> */}

        <div className="application-container  menu-container active">
        <div className="applicants flex">
          <span className="material-symbols-outlined">view_list</span>
          <p>Application</p>
        </div>
        </div>

        <div className="session-container menu-container">
        <div className="session flex">
          <span className="material-symbols-outlined">view_list</span>
          <p>Session</p>
        </div>
        </div>
      
        <div className="test-container menu-container">
        <div className="task flex">
        <span className="material-symbols-outlined">inventory</span>
        <p>Task</p>
        </div>
        </div>
       
       <div className="test-container menu-container">
       <div className="applicants flex">
       <span className="material-symbols-outlined">insert_chart</span>
        <p>Test</p>
        </div>
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
