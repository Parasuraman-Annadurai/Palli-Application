import axios from "axios";
import { notification } from "antd";
export  let  makeNetworkRequest = async (endPoint,method,payload)=>{

    try {
        let response = await axios({
          url: endPoint,
          method: method,
          data: payload, 
        });

        const {message,status,...apiData}  = response.data;
        if(message === "Success" && status === 200){
          return apiData;
        }
        else{
            //succes failure
           //please implement the error boundaries

            notification.error({
                message:message,//error code
                description:message //error message
            })
        }


        

      } catch (err) {
            //please implement the error boundaries
            notification.error({
                message:message,
                description:"Internal Error"
            })
      }
}

