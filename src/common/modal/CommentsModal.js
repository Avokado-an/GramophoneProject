import React from 'react';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import Modal from 'react-modal'
import axios from 'axios';
import Comment from '../entity/comment/Comment'


const CommentsModal = (props) => {
    const [isOpen, setOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('')

    useEffect(() => {
        setCommentText('');
        axios.get('http://localhost:8100/profile/posts/' + props.postId + '/comments').then(res => {
            setComments(res.data);
        })
    }, [isOpen])

    const toggleModal = () => {
        setOpen(!isOpen);
    }

    const createComment = () => {
        const commentData = {
            text: commentText
        }
        axios.post("http://localhost:8100/profile/posts/" + props.postId + "/comments", commentData).then(response => {
            setComments(response.data);
        })
        setCommentText('');
    }

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            createComment();
            setCommentText('');
        }
    }

    return ( 
        <div>
            <Button className="margin-bot-20" onClick={toggleModal}>Comments</Button>
            <Modal 
                    className="modal"
                    isOpen={isOpen}
                    onClose={toggleModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
            >
                <div class="flex-start flex-column max-height-500 scrollable">
                    <h1 class="margin-bot-70">Comments</h1>
                    {comments.map((comment) => (
                        <div class="margin-bot-20">
                            <Comment 
                                comment = {comment}
                            />
                        </div>
                    ))}
                    <input class="width-600 height-30 margin-bot-40"
                        type="text"
                        id="setCommentText"
                        autoComplete="off"
                        onChange={(e) => setCommentText(e.target.value)}
                        value={commentText}
                        onKeyPress={handleEnterKey}
                        required
                    />
                    <div class="flex-space-between width-590 padding-left-10 margin-bot-20">
                        <Button className="dark-button" onClick={toggleModal}>Close</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CommentsModal;