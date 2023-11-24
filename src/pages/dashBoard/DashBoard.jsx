import React from 'react'
import Sidebar from './components/sidebar';
import Content from './components/content';
import "./index.css"
const DashBoard = () => {
    return (
        <div className="app">
        <Sidebar />
        <div className="main">
          <Content />
        </div>
      </div>
    );
}
 
export default DashBoard;