
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Row,
    Col,
    Form,
    Alert,
    Button,
    Container,
    Image,
} from "react-bootstrap";

import BalatroLogo from "../images/video-game-characters.jpg";

const SignInForm = ({ onLogin }) => {
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = signInData;

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Reset errors
        setErrors({});

        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((user) => user.username === username);

        if (!user) {
            setErrors({ username: ["User does not exist."] });
            return;
        }

        if (user.password !== password) {
            setErrors({ password: ["Incorrect password."] });
            return;
        }

        // Login successful
        localStorage.setItem("loggedIn", true);
        onLogin(true);
        navigate("/");
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
            {/* Logo */}
            <Image
                src={BalatroLogo}
                alt="Xenon Logo"
                className="mb-4"
                style={{
                    height: "350px",
                    maxWidth: "100%",
                    objectFit: "contain",
                }}
            />
            {/* Sign In Form */}
            <Row className="w-100" style={{ maxWidth: "400px" }}>
                <Col className="text-center">
                    <h1 className="mb-4">Sign In</h1>
                    <Form onSubmit={handleSubmit} className="text-start">
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                                required
                            />
                            {errors.username?.map((message, idx) => (
                                <Alert key={idx} variant="warning" className="mt-2">
                                    {message}
                                </Alert>
                            ))}
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password?.map((message, idx) => (
                                <Alert key={idx} variant="warning" className="mt-2">
                                    {message}
                                </Alert>
                            ))}
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mb-3">
                            Sign In
                        </Button>
                    </Form>
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default SignInForm;
