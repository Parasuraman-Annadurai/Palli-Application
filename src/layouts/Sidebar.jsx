import React from 'react';
import dckapLogo from "../../public/images/dckap_palli_logo_sm.svg"
import { useState } from 'react';
const Sidebar = () => {
  const [active,setActive] = useState("application");
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={dckapLogo} alt="dckap-logo-sm" />
      </div>

      <div className="menus">
        <div className={`application-container  menu-container ${active==="application" ? "active":""}`} onClick={()=>setActive("application")}>
        <div className="applicants flex">
          <span className="material-symbols-outlined">view_list</span>
          <p>Application</p>
        </div>
        </div>

        <div className={`session-container menu-container ${active=== "session" ? "active":""}`} onClick={()=>setActive("session")}>
        <div className="session flex">
          <span className="material-symbols-outlined">view_list</span>
          <p>Session</p>
        </div>
        </div>
      
        <div className={`test-container menu-container ${active==="task" ? "active":""}`} onClick={()=>setActive("task")}>
        <div className="task flex">
        <span className="material-symbols-outlined">inventory</span>
        <p>Task</p>
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
