import axios from "axios";
import { makeNetworkRequest } from "../utils/makeNetworkRequest";
import { API_END_POINT } from "../../config";
export default {
  getUser: async function () {
    try {
      //perform api request and return the data here
    } catch (err) {
      throw err;
    }
  },
  postUser:  function (userData) {
    makeNetworkRequest(`${API_END_POINT}/api/accounts/login/`,"POST",userData)
  },

  //later implement the logout

  // userLogout: async function (token) {

  //   const headers = {
  //     Authorization: `Bearer ${token.access}`
  //   }
  //   try {    
  //     const response = await axios.post(`${API_END_POINT}/api/accounts/logout/`, token, {
  //       headers: headers,
  //     });
  //     return response;
  //   } catch (err) {
  //     throw err;
  //   }
  // },
};
