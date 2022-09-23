import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserSearchProfile = (props) => {
    const [fullName, setFullName] = useState('');
    const [id, setId] = useState(-1);

    useEffect(() => {
        setFullName(props.userProfile.firstName + " " + props.userProfile.lastName);
        setId(props.userProfile.id);
    }, []);

    const defineProfilePath = () => {
        let currentUserId = localStorage.getItem('id');
        console.log("currentId - " + currentUserId);
        if (id == currentUserId) {
            return '';
        }
        return id;
    }
    
    return (
        <div class="post padding-15">
            <Link to={'/profile/' + defineProfilePath()}>
                {fullName}
            </Link>
        </div>
    )
}

export default UserSearchProfile;