import React from 'react';
import { Button } from 'react-bootstrap';
import { useRef, useState, useEffect } from "react";
import Modal from 'react-modal'
import axios from 'axios';


const CreatePost = (props) => {
    const [isOpen, setOpen] = useState(false);
    const [postText, setPostText] = useState('')

    useEffect(() => {
    }, [isOpen])

    const toggleModal = () => {
        setOpen(!isOpen);
    }

    const createPost = () => {
        const postData = {
            text: postText
        }
        axios.post("http://localhost:8100/profile/posts", postData).then(response => {
            props.handleCreation(response.data);
        })
        toggleModal();
    }

    return ( 
        <div>
            <Button className="margin-bot-20" onClick={toggleModal}>Create Post</Button>
            <Modal 
                    className="modal"
                    isOpen={isOpen}
                    onClose={toggleModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div class="flex-start flex-column">
                        <h1 class="margin-bot-70">Create Post</h1>
                        <textarea class="width-600 height-100 margin-bot-40"
                            type="textarea"
                            id="setPostText"
                            autoComplete="off"
                            onChange={(e) => setPostText(e.target.value)}
                            value={postText}
                            required
                        />
                        <div class="flex-space-between width-590 padding-left-10 margin-bot-20">
                            <Button className="dark-button" onClick={createPost}>Add Post</Button>
                            <Button className="dark-button" onClick={toggleModal}>Cancel</Button>
                        </div>
                    </div>
                </Modal>
        </div>
    )
}

export default CreatePost;