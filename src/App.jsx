import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import DashBoard from "./pages/dashBoard/DashBoardPage";

//Define your routes for APP here

const App = () => {
  return (
    <Routes>
      <Route path="/login"  element={<LoginPage />}></Route>
      <Route path="/dashboard"  element={<DashBoard />}></Route>
    </Routes>
  );
};

export default App;
