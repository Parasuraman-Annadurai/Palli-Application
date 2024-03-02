import axios from 'axios'
import React, { useState } from 'react'
import { API_END_POINT } from '../../../config'
import { useAuth } from '../../context/AuthContext';
import { validateNewpassword } from '../../utils/validate';
import { Popover, notification } from 'antd';
import GetPasswordPopover from '../../components/PasswordRequirement/PasswordRequirement';

function Settings() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState({});
    const { user, token } = useAuth();
    const headers = {
        Authorization: `Bearer ${token.access}`,
        "Content-type": "application/json",
    };
    const handleChangePassword = (e) => {

        e.preventDefault();
        const validateField = validateNewpassword(
            { newPassword, confirmPassword },
            setPasswordError
        );

        if (validateField) {
            axios.post(`${API_END_POINT}/api/accounts/reset/password/`, { password: confirmPassword }, { headers }).then((res) => {
                if (res.status == 200) {
                    notification.success({
                        message: "Success",
                        description: res?.data?.message,
                        duration: 1
                    });
                    setNewPassword("");
                    setConfirmPassword("");
                }
            }).catch((error) => {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
            })

        }
    }

    return (
        <>
            <section className="listing-container">
                <div className="user-info-container">
                    <div className="user-image-container">
                        <img src="" alt="" />
                        <p>{user?.first_name?.[0]}{user?.last_name?.[0]}</p>
                    </div>
                    <div className="name-and-email-info">
                        <p>{user?.first_name}{user?.last_name}</p>
                        <p className="email">{user?.email}</p>
                    </div>
                </div>
                <div className="settings-menu-list-container">
                    <div className="menu-list">
                        <ul>
                            <li>Change Password</li>
                            {/* icon here */}
                        </ul>
                    </div>
                </div>
            </section>
            <div className="main-container">
                <div className="change-password-menu-container">
                    <div className="menu-title">
                        <p> Change Password</p>
                        <img src="" alt="" />
                        {/* icon here */}
                    </div>
                    <form action="" onSubmit={handleChangePassword}>
                        <div className="inputs-section">
                            <div className="new-password-input-section">
                                <label htmlFor="">New Password</label>
                                <Popover
                                    placement='left'
                                    trigger={"focus"}
                                    content={<GetPasswordPopover password={newPassword} />}
                                >
                                    <input className={`input-field ${passwordError.newPassword ? "error-notify " : ""
                                        }`} value={newPassword} type={showNewPassword ? "text" : "password"} name='newPassword' style={{ border: "1px solid gray" }} onChange={(e) => {
                                            if (passwordError[e.target.name]) {
                                                delete passwordError[e.target.name]
                                            }
                                            setNewPassword(e.target.value)
                                        }} />
                                </Popover>
                                <img src={showNewPassword ? "/icons/eye-open.svg" : "/icons/eye-close.svg"} style={{ width: "16px" }} onClick={() => setShowNewPassword(!showNewPassword)} />
                                <p className="error-message">
                                    {passwordError.newPassword ? passwordError.newPassword : ""}
                                </p>
                            </div>
                            <div className="confirm-password-input-section">
                                <label htmlFor="">Confirm Password</label>
                                <input className={`input-field ${passwordError.confirmPassword ? "error-notify " : ""
                                    }`} value={confirmPassword} type={showConfirmPassword ? "text" : "password"} name='confirmPassword' style={{ border: "1px solid gray" }} onChange={(e) => {
                                        if (passwordError[e.target.name]) {
                                            delete passwordError[e.target.name]
                                        }
                                        setConfirmPassword(e.target.value)
                                    }} />
                                <img src={showConfirmPassword ? "/icons/eye-open.svg" : "/icons/eye-close.svg"} style={{ width: "16px" }} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                                <p className="error-message">
                                    {passwordError.confirmPassword ? passwordError.confirmPassword : ""}
                                </p>
                            </div>
                            <div className="change-password-button-section">
                                <button className="btn" >
                                    update
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Settings
