import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CommentsModal from '../../modal/CommentsModal'

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
            <Link to={'/profile/' + defineProfilePath(props.post.ownerId)}>
                {props.post.ownerFullName}
            </Link>
            <div>Content: {props.post.text}</div>
            <div class="flex-start">
                <div>Date: {
                    new Date(props.post.creationDateTime).getDate() + '/' +
                    new Date(props.post.creationDateTime).getMonth() + '/' +
                    new Date(props.post.creationDateTime).getFullYear()
                }</div>
                <div>-{
                    new Date(props.post.creationDateTime).getHours() + ':' +
                    new Date(props.post.creationDateTime).getMinutes()
                }</div>
                <div class="margin-left-20">Likes: {props.post.likes}</div>
            </div>
            <CommentsModal postId={props.post.id}/>
        </div>
    )
}

export default Post;