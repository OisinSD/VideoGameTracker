import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Alert, Button, Container, Card } from "react-bootstrap";
import BalatroLogo from "../images/video-game-characters.jpg";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig.js"; // Import firebase config

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    //NOTE:Add email option to register user's information
    email: "",
    password1: "",
    password2: "",
  });
  const { username, email, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrors({});

      const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!usernameRegex.test(username)) {
        setErrors({
          username: [
            "Username must be 3-15 characters long and can only include letters, numbers, and underscores.",
          ],
        });
        return;
      }

      if (!passwordRegex.test(password1)) {
        setErrors({
          password1: [
            "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.",
          ],
        });
        return;
      }

      if (password1 !== password2) {
        setErrors({ password2: ["Passwords do not match."] });
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password1);
      navigate("/signin");
      //NOTE:Remove localStorage on user's information
      // const users = JSON.parse(localStorage.getItem("users")) || [];
      // if (users.find((user) => user.username === username)) {
      //   setErrors({ username: ["Username already exists."] });
      //   return;
      // }

      // users.push({ username, password: password1 });
      // localStorage.setItem("users", JSON.stringify(users));
      // navigate("/signin");
    } catch (err) {
      setErrors({ general: err.message });
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: `url(${BalatroLogo})`,
        backgroundSize: "cover",
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
          Sign up with a username and password to get started.
        </p>

        {errors.general && <Alert variant="danger">{errors.general}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* NOTE:Add email to let user register with */}
          <Form.Group controlId="email" className="mb-3">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control
              type="email"
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
              <Alert key={idx} variant="danger" className="mt-2">
                {msg}
              </Alert>
            ))}
          </Form.Group>
          <Form.Group controlId="password1" className="mb-3">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password1"
              value={password1}
              onChange={handleChange}
              required
              className="form-control bg-dark text-light border-secondary rounded-3"
            />
            {errors.password1?.map((msg, idx) => (
              <Alert key={idx} variant="danger" className="mt-2">
                {msg}
              </Alert>
            ))}
          </Form.Group>
          <Form.Group controlId="password2" className="mb-3">
            <Form.Label className="fw-semibold">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="password2"
              value={password2}
              onChange={handleChange}
              required
              className="form-control bg-dark text-light border-secondary rounded-3"
            />
            {errors.password2?.map((msg, idx) => (
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
            SIGN UP
          </Button>
          <Link
            to="/signin"
            className="d-block mt-3 text-decoration-none text-light fw-bold text-center"
          >
            Already have an account? SIGN IN
          </Link>
        </Form>
      </Card>
    </Container>
  );
};

export default SignUpForm;
