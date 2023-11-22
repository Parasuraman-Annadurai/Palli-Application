import React from "react";
import { Routes, Route } from "react-router-dom";
//Define your routes for APP here
import LoginScreen from "./pages/login/LoginScreen";
import AdminDashoboard from './pages/adminDashoard/AdminDashboard';


//Define your routes for APP here

import ChangePassword from "./pages/ChangePasswordPage/ResetPasswordPage";
//Define your routes for APP here

import ForgotPassword from "./pages/ForgotPage/ForgotPage";

const App = () => {

 
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />}></Route>
      <Route path="/forgot/password" element={<ForgotPassword />}></Route>
      <Route path="/home" element={<AdminDashoboard />}></Route>
      <Route path="/change/password" element={<ChangePassword />}></Route>
    </Routes>
  );
};

export default App;
