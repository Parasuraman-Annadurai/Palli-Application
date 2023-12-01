//Define all the routes here
const INDEX = "/";
const LOGIN = "/login";
const FORGOTPASSWORD = "/forgot/password";
const CHANGEPASSWORD = "/change/password";
const DASHBOARD = "/dashboard";
const APPLICATIONS = "/batch/:id/applications";
const TASK = "/batch/:id/module";
const ADDTASK = "/batch/:id/module/add/task";
const EDITTASK = "/batch/:id/module/edit/task/:taskId";
const ADDQUIZ = "/batch/:id/module/add/quiz";
const WEIGHTAGE = "/batch/:id/module/add/task/weightage";

export {
  DASHBOARD,
  LOGIN,
  APPLICATIONS,
  FORGOTPASSWORD,
  CHANGEPASSWORD,
  TASK,
  WEIGHTAGE,
  ADDTASK,
  ADDQUIZ,
  INDEX,
  EDITTASK,
};
