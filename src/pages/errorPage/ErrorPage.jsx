import React from "react";

import { Result,Button } from "antd";

const ErrorPage = () => {

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary"><a href="/dashboard">Back To DashBoard</a></Button>}
    />
   
  );
};

export default ErrorPage;
