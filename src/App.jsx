import { Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/SampleLoginScreen";
import Forgotpassword from "./pages/ForgotScreen";
import ResetPassword from "./pages/ResetPassworScreen";



//Define your routes for APP here

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />}></Route>
      <Route path="/forgotpage" element={<Forgotpassword />}></Route>
      <Route path="/restpassword" element={<ResetPassword />}></Route>
    </Routes>
  );
};

export default App;
