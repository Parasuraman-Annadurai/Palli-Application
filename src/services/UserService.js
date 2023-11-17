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
  authedicateUser: async function (userData) {
    try {
      let endPoint = `${API_END_POINT}/api/accounts/login/`;
      let responce = await makeNetworkRequest(endPoint, "POST", userData);
      if(Object.keys(responce).length > 0){
        const {data:token} = responce;
        localStorage.setItem("token",JSON.stringify(token))
        return responce;
      }
    } catch (error) {
      // Handle error, if needed
      throw error;
    }
  },

  userLogout: async function () {},
};
