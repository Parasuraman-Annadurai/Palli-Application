import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/SampleLoginScreen";
import ForgotPassword from "../src/pages/ForgotPage/ForgotScreen";
import ChangePassword from "../src/pages/ChangePasswordPage/ResetPasswordScreen";

//Define your routes for APP here

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />}></Route>
      <Route path="/forgot/password" element={<ForgotPassword />}></Route>
      <Route path="/change/password" element={<ChangePassword />}></Route>
    </Routes>
  );
};

export default App;
