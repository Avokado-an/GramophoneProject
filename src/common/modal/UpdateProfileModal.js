import React from 'react';
import { Button } from 'react-bootstrap';
import { useRef, useState, useEffect } from "react";
import Modal from 'react-modal'
import axios from 'axios';

const UpdateProfile = (props) => {
    const [firstName, setFirstName] = useState('');
    const [isOpen, setOpen] = useState(false);
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        setFirstName(props.firstName);
        setLastName(props.lastName);
        setStatus(props.status);
    }, [isOpen])

    const toggleProfileModal = () => {
        setOpen(!isOpen);
    }

    const updateProfile = () => {
        const profileData = {
            firstName: firstName,
            lastName: lastName,
            status: status
        }
        axios.put("http://localhost:8100/profile", profileData).then(response => {
            props.handleUpdate(response.data);
        })
        toggleProfileModal();
    }

    return (
        <div>
            <Button className="margin-top-25" onClick={toggleProfileModal}>Update Info</Button>
                <Modal 
                    className="modal"
                    isOpen={isOpen}
                    onClose={toggleProfileModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div class="flex-start flex-column">
                        <h1>Profile</h1>
                        <label class="padding-5" htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required
                            class="padding-5"
                        />
                        <label class="padding-5" htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required
                            class="padding-5"
                        />
                        <label class="padding-5" htmlFor="status">Status:</label>
                        <textarea class="width-600 height-100 margin-bot-40 padding-5"
                            placeholder="My status..."
                            type="textarea"
                            id="status"
                            autoComplete="off"
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                            required
                        />
                        
                        <div class="flex-space-between width-590 padding-left-10 margin-bot-20">
                            <Button className="dark-button" onClick={updateProfile}>Update</Button>
                            <Button className="dark-button" onClick={toggleProfileModal}>Cancel</Button>
                        </div>
                    </div>
                </Modal>
        </div>
    )
}

export default UpdateProfile;