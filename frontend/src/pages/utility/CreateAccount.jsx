import React, { useState } from "react";
import { fetchData } from "../../utility/fetchData";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Button from "../../components/button/Button";

export default function CreateAccount() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            username,
            password,
            firstName,
            lastName,
        };

        fetchData(
            "http://localhost:3001/create-account",
            "POST",
            formData
        ).then((successData) => {
            navigate("/login");
        });
    };

    return (
        <main className="center-main">
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="login-input"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        className="login-input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        className="login-input"
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        className="login-input"
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <Button type="submit" className="primary-btn">
                    Create Account
                </Button>
            </form>
        </main>
    );
}
