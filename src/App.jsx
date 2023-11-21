import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/login/LoginScreen";


//Define your routes for APP here

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />}></Route>
    </Routes>
  );
};

export default App;
