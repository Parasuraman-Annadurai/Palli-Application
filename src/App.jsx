import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";

//Define your routes for APP here
import LoginPage from "./pages/login/LoginPage.jsx";
import ChangePassword from "./pages/ChangePasswordPage/ResetPasswordPage";
import ForgotPassword from "./pages/ForgotPage/ForgotPage";
import Applicantions from "./pages/applications/Applications.jsx";
//Private Routes will be wrapped in below component
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route path="/change/password" element={<ChangePassword />} />
          {/* Private Route, can't access without token */}
          <Route path="/batch/:id/applications" element={<PrivateRoute />}>
            <Route path="/batch/:id/applications" element={<Applicantions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
