import React from 'react';
import { Link } from 'react-router-dom';

const Post = (props) => {
    const defineProfilePath = (id) => {
        let currentUserId = localStorage.getItem('id');
        console.log("currentId - " + currentUserId);
        if (id == currentUserId) {
            return '';
        }
        return id;
    }

    return (
        <div class="post padding-15">
            <Link to={'/profile/' + defineProfilePath(props.comment.ownerId)}>
                {props.comment.ownerFullName}
            </Link>
            <div class='line-break width-550'>{props.comment.text}</div>
            <div class="flex-start">
                <div>Date: {
                    new Date(props.comment.creationTime).getDate() + '/' +
                    new Date(props.comment.creationTime).getMonth() + '/' +
                    new Date(props.comment.creationTime).getFullYear()
                }</div>
                <div>-{
                    new Date(props.comment.creationTime).getHours() + ':' +
                    new Date(props.comment.creationTime).getMinutes()
                }</div>
                <div class="margin-left-20">Likes: {props.comment.likes}</div>
            </div>
        </div>
    )
}

export default Post;