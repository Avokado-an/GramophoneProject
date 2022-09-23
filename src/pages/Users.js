import { useEffect, useState } from "react";
import React from 'react';
import axios from 'axios';
import UserProfileLinks from '../common/entity/user/UserProfileLinks'
import SideBar from '../common/navigation/SideBar'

const Users = () => {
    
    const [userProfiles, setUserProfiles] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(-1);

    axios.interceptors.request.use(
        config => {
            config.headers.authorization = localStorage.getItem('token');
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )

    const fetchUserProfiles = () => {
        axios.get("http://localhost:8100/users").then(res => {
            setUserProfiles(res.data);
        })
    }

    const fetchCurrentUserId = () => {
        axios.get("http://localhost:8100/profile").then(res => {
            setCurrentUserId(res.data.id);
        })
    }

    useEffect(() => {
        fetchUserProfiles();
    }, [])

    return (
        <div>
            <SideBar />
            <div class="margin-left-350">
                <UserProfileLinks userProfiles={userProfiles}/>
            </div>
        </div>
    )
}

export default Users;