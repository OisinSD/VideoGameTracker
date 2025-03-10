import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Alert, Button, Container, Card, Image } from "react-bootstrap";
import BalatroLogo from "../images/video-game-characters.jpg";

const SignInForm = ({ onLogin }) => {
    const [signInData, setSignInData] = useState({ username: "", password: "" });
    const { username, password } = signInData;
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSignInData({ ...signInData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});

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

        localStorage.setItem("loggedIn", true);
        onLogin(true);
        navigate("/");
    };

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center min-vh-100"
            style={{ backgroundImage: `url(${BalatroLogo})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
            <Card className="bg-dark text-light p-4 rounded-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
                <h1 className="fw-bold text-center">Quest Log</h1>
                <h2 className="fs-4 fw-semibold text-center">WELCOME GAMERS! 🎮</h2>
                <p className="small text-secondary text-center">Enter your email address and password to use the application</p>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username" className="mb-3">
                        <Form.Label className="fw-semibold">Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            required
                            className="form-control bg-dark text-light border-secondary rounded-3"
                        />
                        {errors.username?.map((msg, idx) => (
                            <Alert key={idx} variant="danger" className="mt-2">{msg}</Alert>
                        ))}
                    </Form.Group>

                    <Form.Group controlId="password" className="mb-3">
                        <Form.Label className="fw-semibold">Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                            className="form-control bg-dark text-light border-secondary rounded-3"
                        />
                        {errors.password?.map((msg, idx) => (
                            <Alert key={idx} variant="danger" className="mt-2">{msg}</Alert>
                        ))}
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Form.Check type="checkbox" label="Remember Me" className="text-secondary small" />

                        // Forgot password not fully setup yet in app
                        <Link to="/forgot-password" className="text-decoration-none text-light small">Forgot Password?</Link>
                    </div>

                    <Button type="submit" className="btn btn-lg w-100" style={{ background: "linear-gradient(90deg, #7f57f5, #e157f5)", border: "none" }}>SIGN IN</Button>
                    <Link to="/signup" className="d-block mt-3 text-decoration-none text-light fw-bold text-center">Don't have an Account? SIGN UP</Link>
                </Form>
            </Card>
        </Container>
    );
};

export default SignInForm;
