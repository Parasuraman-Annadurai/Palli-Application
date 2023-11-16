import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/login/LoginScreen";

import React from "react";
//Define your routes for APP here

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />}></Route>
    </Routes>
  );
};

export default App;
