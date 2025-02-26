
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
import XenonLogo from "../images/Xenon.png";

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    });
    const { username, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Reset errors
        setErrors({});

        // Regular expressions for validation
        const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Username validation
        if (!usernameRegex.test(username)) {
            setErrors({
                username: [
                    "Username must be 3-15 characters long and can only include letters, numbers, and underscores.",
                ],
            });
            return;
        }

        // Password validation
        if (!passwordRegex.test(password1)) {
            setErrors({
                password1: [
                    "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.",
                ],
            });
            return;
        }

        // Confirm password validation
        if (password1 !== password2) {
            setErrors({ password2: ["Passwords do not match."] });
            return;
        }

        // Store user in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.find((user) => user.username === username)) {
            setErrors({ username: ["Username already exists."] });
            return;
        }

        users.push({ username, password: password1 });
        localStorage.setItem("users", JSON.stringify(users));
        navigate("/signin");
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
            {/* Logo */}
            <Image
                src={XenonLogo}
                alt="Xenon Logo"
                className="mb-4"
                style={{
                    height: "350px",
                    maxWidth: "100%",
                    objectFit: "contain",
                }}
            />
            {/* Sign Up Form */}
            <Row className="w-100" style={{ maxWidth: "400px" }}>
                <Col className="text-center">
                    <h1 className="mb-4">Sign Up</h1>
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
                            <Form.Text className="text-muted small">
                                <Form.Text className="text-muted small">
                                    3-15 chars, letters, numbers & underscores only.
                                </Form.Text>
                            </Form.Text>
                            {errors.username?.map((message, idx) => (
                                <Alert key={idx} variant="warning" className="mt-2">
                                    {message}
                                </Alert>
                            ))}
                        </Form.Group>

                        <Form.Group controlId="password1" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password1"
                                value={password1}
                                onChange={handleChange}
                                required
                            />
                            <Form.Text className="text-muted" style={{ fontSize: "0.75rem" }}>
                                Min 8 chars, incl 1 uppercase, 1 lowercase, 1 number & 1 special
                                char.
                            </Form.Text>

                            {errors.password1?.map((message, idx) => (
                                <Alert key={idx} variant="warning" className="mt-2">
                                    {message}
                                </Alert>
                            ))}
                        </Form.Group>

                        <Form.Group controlId="password2" className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                name="password2"
                                value={password2}
                                onChange={handleChange}
                                required
                            />
                            {errors.password2?.map((message, idx) => (
                                <Alert key={idx} variant="warning" className="mt-2">
                                    {message}
                                </Alert>
                            ))}
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mb-3">
                            Sign Up
                        </Button>
                    </Form>
                    <Link to="/signin">Already have an account? Sign In</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpForm;
