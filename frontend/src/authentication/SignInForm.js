import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Alert, Button, Container, Card, Image } from "react-bootstrap";
import BalatroLogo from "../assets/images/Video_game_char.jpg";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig.js"; // Import firebase config

const SignInForm = ({ onLogin }) => {
  //NOTE:Modify log in with userName to log in with email address
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const { email, password } = signInData;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignInData({ ...signInData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrors({});
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(true);
      //NOTE: Redirect to landing page
      navigate("/");

    } catch (err) {
      setErrors({ general: err.message });
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: ` url(${BalatroLogo})`,
        backgroundSize: "contain, cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        className="bg-dark text-light p-4 rounded-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h1 className="fw-bold text-center">Quest Log</h1>
        <h2 className="fs-4 fw-semibold text-center">WELCOME GAMERS! 🎮</h2>
        <p className="small text-secondary text-center">
          Enter your email address and password to use the application
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              className="form-control bg-dark text-light border-secondary rounded-3"
            />
            {errors.email?.map((msg, idx) => (
              <Alert key={idx} variant="danger" className="mt-2">
                {msg}
              </Alert>
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
              <Alert key={idx} variant="danger" className="mt-2">
                {msg}
              </Alert>
            ))}
          </Form.Group>



          <Button
            type="submit"
            className="btn btn-lg w-100"
            style={{
              background: "linear-gradient(90deg, #7f57f5, #e157f5)",
              border: "none",
            }}
          >
            SIGN IN
          </Button>
          <Link
            to="/signup"
            className="d-block mt-3 text-decoration-none text-light fw-bold text-center"
          >
            Don't have an Account? SIGN UP
          </Link>
        </Form>
      </Card>
    </Container>
  );
};

export default SignInForm;
