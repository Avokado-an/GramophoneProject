import { useState, useEffect } from "react";
import React from 'react';
import axios from 'axios';
import '../../style/common-styles.css'
import '../../style/common-element-styles.css'
import Posts from '../post/Posts'
import SideBar from '../../navigation/SideBar'
import UpdateProfile from '../../modal/UpdateProfileModal'
import InstrumentsListPlaceholder from '../instrument/InstrumentsPlaceholder'
import CreatePost from '../../modal/CreatePostModal'
import Subscribe from './Subscribe'
import Subs from './Subs'
import { useParams } from "react-router-dom";

const UserProfile = (props) => {
    axios.interceptors.request.use(
        config => {
            config.headers.authorization = localStorage.getItem('token');
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )

    const saveCurrentUserIdInStorage = (currentUserId) =>{
        localStorage.setItem('id', currentUserId);
    }

    const [instruments, setInstruments] = useState([])
    const [userPosts, setUserPosts] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState('');
    const [canEditInstruments, setCanEditInstruments] = useState(true)
    const [subscribers, setSubscribers] = useState([])
    const [subscriptions, setSubscriptions] = useState([])

    let { id } = useParams()

    const fetchUserProfile = () => {
        let userCallUrl = "http://localhost:8100/profile";
        if(id) {
            userCallUrl += "/" + id;
            setCanEditInstruments(false);
        }
        axios.get(userCallUrl).then(res => {
            setFirstName(res.data.firstName)
            setLastName(res.data.lastName)
            setStatus(res.data.status)
            setInstruments(res.data.instruments);
        });
        axios.get("http://localhost:8100/profile/principal-id").then(res => {
            saveCurrentUserIdInStorage(res.data);
        })
        axios.get(userCallUrl + "/posts").then(res => {
            setUserPosts(res.data)
        })
        axios.get(userCallUrl + "/subscribers").then(res => {
            setSubscribers(res.data);
        })
        axios.get(userCallUrl + "/subscriptions").then(res => {
            setSubscriptions(res.data);
        })
    }

    const handleProfileUpdate = updatedData => {
        setFirstName(updatedData.firstName);
        setLastName(updatedData.lastName);
        setStatus(updatedData.status);
    }

    const handlePostCreation = () => {
        axios.get("http://localhost:8100/newsFeed").then(res => {
            setUserPosts(res.data);
        })
    }

    const handleInstrumentsEdited = instrumentsList => {
        setInstruments(instrumentsList)
    }

    useEffect(() => {
        fetchUserProfile();
    }, [id])

    return (
        <div>
            <SideBar />
            <div class="margin-left-350">
                <div class="username">{firstName} {lastName}</div>
                <div class="flex-space-between width-630">
                    <div class="padding-right-30">
                        {status}
                    </div>
                    <InstrumentsListPlaceholder instruments={instruments} isEditingEnabled={canEditInstruments}
                        handleUpdate={handleInstrumentsEdited}/> 
                </div>
                {!id && 
                    <UpdateProfile 
                    firstName={firstName}
                    lastName={lastName}
                    status={status}
                    handleUpdate={handleProfileUpdate}
                />
                }
                {id &&
                <Subscribe userId={id} />
                }            
                <div class="flex-row width-200 margin-top-25">
                    <Subs 
                        buttonName='Subscribers'
                        subsLabel='Subscribers'
                        userProfiles={subscribers}
                    />
                    <Subs 
                        buttonName='Subscriptions'
                        subsLabel='Subscriptions'
                        userProfiles={subscriptions}
                    />
                </div>
                <Posts posts={userPosts}/>
                {!id && <CreatePost handleCreation={handlePostCreation}/>}
            </div>
        </div>

    )
}

export default UserProfile;