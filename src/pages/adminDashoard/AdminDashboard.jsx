import React from 'react'


import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import Content from './components/content';



const AdminDashoboard = () => {
    return ( 
        <div className="app">
        <Sidebar />
        <div className="main">
            <Navbar />
          <Content />
        </div>
        </div>
    );
}
 
export default AdminDashoboard;