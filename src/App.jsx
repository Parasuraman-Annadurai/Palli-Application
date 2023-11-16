import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/login/LoginScreen";
import HomeScreen from "./pages/home/HomeScreen";

import React from "react";
//Define your routes for APP here

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />}></Route>
      <Route path="/home/page" element={<HomeScreen />}></Route>
    </Routes>
  );
};

export default App;
