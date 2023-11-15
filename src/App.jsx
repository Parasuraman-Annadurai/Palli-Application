import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/SampleLoginScreen";
import Forgotpassword from "./pages/ForgotScreen";
import ResetPassword from "./pages/ResetPasswordScreen";

//Define your routes for APP here

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />}></Route>
      <Route path="/forgot-password" element={<Forgotpassword />}></Route>
      <Route path="/rest-password" element={<ResetPassword />}></Route>
    </Routes>
  );
};

export default App;
