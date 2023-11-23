import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { FORGOTPASSWORD,CHANGEPASSWORD } from "./routes/routes.jsx";
//Define your routes for APP here
import LoginScreen from "./pages/login/LoginScreen";
import AdminDashoboard from "./pages/adminDashoard/AdminDashboard";
import ForgotPassword from "./pages/forgotPage/ForgotPage.jsx";
import ResetPasswordPage from "./pages/changePasswordPage/ResetPasswordPage.jsx";

//Private Routes will be wrapped in below component
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path={FORGOTPASSWORD} element={<ForgotPassword />} />
          <Route path={CHANGEPASSWORD} element={<ResetPasswordPage />} />
          {/* Private Route, can't access without token */}
          <Route path="/batch/:id/applications" element={<PrivateRoute />}>
            <Route
              path="/batch/:id/applications"
              element={<AdminDashoboard />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
