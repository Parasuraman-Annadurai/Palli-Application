import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/login/LoginScreen";


import AdminDashoboard from './pages/adminDashoard/AdminDashboard';
import ChangePassword from "./pages/ChangePasswordPage/ResetPasswordPage";
//Define your routes for APP here

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />}></Route>
      <Route path="/home" element={<AdminDashoboard />}></Route>
      <Route path="/change/password" element={<ChangePassword />}></Route>
    </Routes>
  );
};

export default App;
