import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { TASK } from "./routes/routes.jsx";
//Define your routes for APP here
import LoginScreen from "./pages/login/LoginScreen";
import AdminDashoboard from "./pages/adminDashoard/AdminDashboard";
import ChangePassword from "./pages/ChangePasswordPage/ResetPasswordPage";
import ForgotPassword from "./pages/ForgotPage/ForgotPage";
import TaskModule from "./pages/taskModule/TaskModule.jsx";
//Private Routes will be wrapped in below component
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route path="/change/password" element={<ChangePassword />} />
          
          {/* Private Route, can't access without token */}
          <Route path="/batch/:id/applications" element={<PrivateRoute />}>
            <Route path="/batch/:id/applications" element={<AdminDashoboard />} />
          </Route>
        
          <Route path={`/batch/:id${TASK}`} element={<PrivateRoute />}>
             <Route path={`/batch/:id${TASK}`} element={<TaskModule />} />
          </Route>
         
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
