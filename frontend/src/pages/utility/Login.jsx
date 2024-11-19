import React, { useState } from "react";
import { fetchData } from "../../utility/fetchData";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Button from "../../components/button/Button";

export default function Login() {
    const [username, setUsername] = useState("Test");
    const [password, setPassword] = useState("Test1234!!");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            username,
            password,
        };

        fetchData("http://localhost:3001/login", "POST", formData).then(
            (successData) => {
                navigate("/overview");
            }
        );
    };

    return (
        <main className="center-main">
            <h1>Welcome back</h1>
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
                <Button type="submit" className="primary-btn">
                    Login
                </Button>
            </form>
        </main>
    );
}
