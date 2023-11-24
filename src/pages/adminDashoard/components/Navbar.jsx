import React from 'react';
import Profile from './Profile';
import { useAuth } from '../../../context/AuthContext';
const Navbar = () => {  
  const {user} = useAuth();
  return (
    <div className="navbar">
      <div>
      <h2>Welcome,{`Guest`}</h2>
      </div>
      <Profile/>
    </div>
  );
};

export default Navbar;
