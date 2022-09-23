import React from 'react';
import { useState, useEffect } from "react";
import './../../style/common-styles.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import '../../style/common-styles.css'

const Subscribe = (props) => {
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [buttonName, setButtonName] = useState('Unsubscribe');

    useEffect(() => {
        axios.get("http://localhost:8100/profile/" + props.userId + "/is-subscriber").then(res => {
            setIsSubscribed(res.data);
        })
        if(isSubscribed) {
            setButtonName('Unsubscribe');
        } else {
            setButtonName('Subscribe');
        }
    }, [])

    useEffect(() => {
        if(isSubscribed) {
            setButtonName('Unsubscribe');
        } else {
            setButtonName('Subscribe');
        }
    }, [isSubscribed]);

    const onClick = () => {
        let subscribeUrl = 'http://localhost:8100/profile/' + props.userId;
        if(isSubscribed) {
            axios.delete(subscribeUrl).then(res => {
                setIsSubscribed(false);
            })
        } else {
            axios.post(subscribeUrl).then(res => {
                setIsSubscribed(true);
            })
        }
    }

    return (
        <div>
            <Button className='margin-top-25' onClick={onClick}>{buttonName}</Button>
        </div>
    )
}

export default Subscribe;