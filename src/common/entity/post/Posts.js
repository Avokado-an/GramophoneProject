import React from 'react';
import Post from './Post'
import '../../style/common-styles.css'

const Posts = (props) => {
    return (
        <div class="padding-top-25">
            {props.posts.map((post) => (
                <div class="margin-bot-20">
                    <Post 
                        post = {post}
                    />
                </div>
            ))}
        </div>
    )
}

export default Posts;