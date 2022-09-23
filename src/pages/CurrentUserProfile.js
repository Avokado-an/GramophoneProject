import { useEffect } from "react";
import React from 'react';
import axios from 'axios';
import './../common/style/common-styles.css'
import './../common/style/common-element-styles.css'
import SideBar from '../common/navigation/SideBar'
import UserProfile from '../common/entity/user/UserProfile'

const CurrentUserProfile = () => {
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = localStorage.getItem('token');
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )

    useEffect(() => {
        
    }, [])

    return (
        <div>
            <SideBar />
            <UserProfile isCurrentUser={true}/>
        </div>
    )
}

export default CurrentUserProfile;