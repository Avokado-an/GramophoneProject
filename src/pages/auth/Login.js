import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router-dom";
import './auth-styles.css'
import './../../common/style/common-styles.css'

const Login = () => {
    const userRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userError, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setError('')
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let loginPayload = {
            email: email,//'test1@gmail.com'
            password: password//'123456789'
        }

        axios.post("http://localhost:8100/auth/login", loginPayload).then(response => {
            const token = response.data;
            localStorage.setItem("token", `Bearer_${token}`);
            if (response.status == 200) {
                setSuccess(true)
                navigate("/profile")
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
                        Login
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="login-form">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                id="setEmail"
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

                            <button class="bg-black white-text">Sign In</button>
                        </div>
                    </form>


                    <p>
                        Create new account:
                        <span className="line">
                            <a href="/register"> Register </a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;
