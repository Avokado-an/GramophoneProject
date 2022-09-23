import React from 'react';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import Modal from 'react-modal'
import UserProfileLinks from './UserProfileLinks'


const Subs = (props) => {
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
    }, [isOpen])

    const toggleModal = () => {
        setOpen(!isOpen);
    }

    return ( 
        <div>
            <Button className="margin-bot-20" onClick={toggleModal}>{props.buttonName}</Button>
            <Modal 
                    className="modal"
                    isOpen={isOpen}
                    onClose={toggleModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                <div class="flex-start flex-column">
                    <h1>{props.subsLabel}</h1>
                    <UserProfileLinks userProfiles={props.userProfiles}/>
                    <div class="flex-space-between width-590 padding-left-10 margin-bot-20">
                        <Button className="dark-button" onClick={toggleModal}>Close</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Subs;