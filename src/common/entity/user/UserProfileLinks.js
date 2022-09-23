import React from 'react';
import UserSearchProfile from './UserSearchProfile'
import '../../style/common-styles.css'

const UserProfileLinks = (props) => {
    return (
        <div class="padding-top-25">
            {props.userProfiles.map((userProfile) => (
                <div class="margin-bot-20">
                    <UserSearchProfile 
                        userProfile={userProfile}
                    />
                </div>
            ))}
        </div>
    )
}

export default UserProfileLinks;