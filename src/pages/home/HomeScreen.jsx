import React from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import { notification } from 'antd';
const HomeScreen = () => {
    const navigate = useNavigate()
    let getToken = JSON.parse(localStorage.getItem("tokens"));

    const handleLogout = () =>{
        UserService.userLogout(getToken).then(res=>{
            if(res.status === 200 && res.data.message === "Success"){
                notification.success({
                    message: 'Logout Successful',
                    duration: 2
                });
                navigate("/");
                localStorage.removeItem("tokens");
            }
            
        })
    }
    return ( 
        <div>
            <h1>Welcome to Home Page</h1>
            <button onClick={handleLogout}>logout</button>
        </div> 
    );
}
 
export default HomeScreen;