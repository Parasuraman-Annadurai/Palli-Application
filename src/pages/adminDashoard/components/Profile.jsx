import React, { useState } from 'react';
import { Popover, Button } from 'antd';

const Profile = () => {

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
    <div className='avatar__container'>
       <Popover content={content} placement="bottomRight" trigger="click">
          <div className='avatar__logo'>
           <span className="material-symbols-outlined">account_circle</span>
          </div>
        </Popover>
    </div>
  );
};

export default Profile;
