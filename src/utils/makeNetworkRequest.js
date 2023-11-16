import axios from "axios";

export  let  makeNetworkRequest = async (endPoint,method,payload)=>{

    try {
        let response = await axios({
          url: endPoint,
          method: method,
          data: payload, 
        });

        if(response.data.message === "Success" && response.status===200){
          
            //please implement the error boundaries
            console.log(response);
        }
        

      } catch (err) {
            //please implement the error boundaries
      }
}

