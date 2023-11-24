import React from 'react';
import { Button,Popover } from 'antd';
const Navbar = () => {
  const content = (
    <div>
      <p>
        <strong>Username</strong>
        <br />
        user@example.com
      </p>
      <Button type="link" >
        Logout
      </Button>
    </div>
  );

  return (
    <div className="navbar">
      <div>
        <h2>Welcome to Vignesh Selvaraj</h2>
      </div>
      <div className='avatar__container'>
       <Popover content={content} placement="bottomRight" trigger="click">
          <div className='avatar__logo'>
           <span className="material-symbols-outlined">account_circle</span>
          </div>
        </Popover>
    </div>
    </div>
  );
};

export default Navbar;
