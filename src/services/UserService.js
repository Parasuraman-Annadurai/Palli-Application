import axios from "axios";
import { notification } from "antd";

export default {
  getUser: async function () {
    try {
      //perform api request and return the data here
    } catch (err) {
      throw err;
    }
  },
  postUser: async function (userData) {
    try {
      //perform api request and return the data here
      const response = await axios.post(
        `http://13.232.90.154:8000/api/accounts/login/`,
        userData
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },

  userLogout: async function (token) {

    const headers = {
      Authorization: `Bearer ${token.access}`
    }
    try {    
      const response = await axios.post('http://13.232.90.154:8000/api/accounts/logout/', token, {
        headers: headers,
      });
      return response;
    } catch (err) {
      throw err;
    }
  },
};
