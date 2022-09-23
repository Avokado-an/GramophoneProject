import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";
import './auth-styles.css'
import Select from 'react-select';

const Registration = () => {
    const userRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')

    const [userError, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const genders = [
        {
            label: 'Male',
            value: 'MALE'
        },
        {
            label: 'Female',
            value: 'Female'
        },
        {
            label: 'Nigga',
            value: 'NIGGA'
        },
        {
            label: 'Not Specified',
            value: 'NOT_SPECIFIED'
        }
    ]

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setError('')
    }, [email, password, repeatedPassword, firstName, lastName, gender]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registrationPayload = {
            email: email,
            password: password,
            repeatedPassword: repeatedPassword,
            firstName: firstName,
            lastName: lastName,
            gender: gender
        }

        axios.post("http://localhost:8100/auth/registration", registrationPayload).then(response => {
            if (response.status === 200) {
                setSuccess(true)
                navigate("/")
            }
        })

        if (!success) {
            setError("Invalid credentials, try again");
        }
    }

    return (
        <div class="flex-center bg-black full-screen">
            <div class="padding-left-45 login-form-wrapper">
                <div class="login-form-wrapper">
                    <p ref={errorRef} className={userError ? "error-msg" : "none"} aria-live="assertive">
                        {userError}
                    </p>

                    <h1>
                        Register
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="registration-form">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />

                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />

                            <label htmlFor="repeatedPassword"> Repeated Password:</label>
                            <input
                                type="password"
                                id="repeatedPassword"
                                onChange={(e) => setRepeatedPassword(e.target.value)}
                                value={repeatedPassword}
                                required
                            />

                            <label htmlFor="password">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                required
                            />

                            <label htmlFor="password">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                required
                            />

                            <label htmlFor="password">Gender:</label>
                            <Select
                                options={genders}
                                onChange={(e) => setGender(e.value)}
                                id="gender"
                                placeholder=""
                                value={{value: gender, label: gender}}
                                label={gender}
                            />

                            <button class="bg-black white-text">Register</button>
                        </div>
                    </form>


                    <p>
                        Sign into existing account:
                        <span className="line">
                            <a href="/"> Login </a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Registration;
