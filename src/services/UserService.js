import { makeNetworkRequest } from "../utils/makeNetworkRequest";
import { API_END_POINT } from "../../config";
export default {
  getUser: async function () {
    try {
      //perform api request and return the data here
      let endpoint = `${API_END_POINT}/api/accounts/get/user_info/`
      let responce = await makeNetworkRequest({endpoint,method:"GET",requiresAuth:true})
      console.log(responce);
    } catch (err) {
      throw err;
    }
  },
  authedicateUser: async function (userData) {
    try {
      let endPoint = `${API_END_POINT}/api/accounts/login/`;
      let responce = await makeNetworkRequest({endPoint, method:"POST",payload:userData});
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
  getApplicants: async function () {
    //applicant/1/list/applicants/
    try{
      let endPoint = `${API_END_POINT}/api/applicant/1/list/applicants/`;
      let responce = await makeNetworkRequest({endPoint,method:"GET",requiresAuth:true});
      return responce;
    }
    catch(error){
      throw error;
    }
    
    

  },
};
