import axios from "axios";
import { notification } from "antd";

export let makeNetworkRequest = async ({ endPoint, method = "GET", payload = null, requiresAuth = false}) => {
  try {
    let headers = {};
    if (requiresAuth) {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        headers.Authorization = `Bearer ${token.access}`;
      } else {
        notification.error({
          message: "Unauthorized",
          description: "User is not authenticated",
        });
        return;
      }
    }

    let response = await axios({
      url: endPoint,
      method: method,
      data: payload,
      headers: headers,
    });

    
    
    const { message, status, ...apiData } = response.data;
    if (message === "Success" && status === 200) {
      return apiData;
    } else {
      notification.error({
        message: message,
        description: message,
      });
    }
  } catch (err) {
    notification.error({
      message: "Internal Error",
      description: "Something went wrong",
    });
  }
};
