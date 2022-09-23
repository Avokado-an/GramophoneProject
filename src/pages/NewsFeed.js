import { useEffect, useState } from "react";
import React from 'react';
import axios from 'axios';
import Posts from '../common/entity/post/Posts'
import SideBar from '../common/navigation/SideBar'

const NewsFeed = () => {
    
    const [userPosts, setUserPosts] = useState([]);

    axios.interceptors.request.use(
        config => {
            config.headers.authorization = localStorage.getItem('token');
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )

    const fetchUserNewsFeed = () => {
        axios.get("http://localhost:8100/newsFeed").then(res => {
            setUserPosts(res.data);
        })
    }

    useEffect(() => {
        fetchUserNewsFeed();
    }, [])

    return (
        <div>
            <SideBar />
            <div class="margin-left-350">
                <Posts posts={userPosts}/>
            </div>
        </div>
    )
}

export default NewsFeed;