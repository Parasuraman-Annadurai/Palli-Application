
import axios from "axios"

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
      const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', userData);
      return response.data;

   
    } catch (err) {
      throw err;
    }
  },
};
