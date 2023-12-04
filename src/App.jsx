import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import {
  LOGIN,
  APPLICATIONS,
  DASHBOARD,
  FORGOTPASSWORD,
  CHANGEPASSWORD,
  TASK,
  ADDTASK,
  ADDQUIZ,
  INDEX,
  EDITTASK,
  WEIGHTAGE
} from "./routes/routes.jsx";
//Define your routes for APP here
import Login from "./pages/login/Login.jsx";
import ChangePassword from "./pages/changePasswordPage/ResetPasswordPage";
import ForgotPassword from "./pages/forgotPage/ForgotPage";
import Applicantions from "./pages/applications/Applications.jsx";
import DashBoard from "./pages/dashBoard/DashBoard.jsx";
import TaskModule from "./pages/taskModule/TaskModule.jsx";

import AddTask from "./pages/addTaskPage/AddTask.jsx";
import AddQuiz from "./pages/addQuiz/AddQuizz.jsx";
import Weightage from "./pages/addTaskPage/weightage/WeightAge.jsx";

import ErrorPage from "./pages/errorPage/ErrorPage.jsx";
//Private Routes will be wrapped in below component
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={INDEX} element={<Navigate to="/login" replace />} />

          <Route path={LOGIN} element={<Login />} />
          <Route path={FORGOTPASSWORD} element={<ForgotPassword />} />
          <Route path={CHANGEPASSWORD} element={<ChangePassword />} />

          <Route path={DASHBOARD} element={<PrivateRoute />}>
            <Route path={DASHBOARD} element={<DashBoard />} />
          </Route>
          {/* Private Route, can't access without token */}
          <Route path={APPLICATIONS} element={<PrivateRoute />}>
            <Route path={APPLICATIONS} element={<Applicantions />} />
          </Route>

          <Route path={TASK} element={<PrivateRoute />}>
            <Route path={TASK} element={<TaskModule />} />
          </Route>

          <Route path={ADDTASK} element={<PrivateRoute />}>
            <Route path={ADDTASK} element={<AddTask />} />
          </Route>
          <Route path={ADDQUIZ} element={<PrivateRoute />}>
            <Route path={ADDQUIZ} element={<AddQuiz />} />
          </Route>

          <Route path={EDITTASK} element={<PrivateRoute />}>
            <Route path={EDITTASK} element={<AddTask />} />
          </Route>
          <Route path={WEIGHTAGE} element={<PrivateRoute />}>
             <Route path={WEIGHTAGE} element={<Weightage/>} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
