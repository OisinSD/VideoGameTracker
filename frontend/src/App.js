import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import SignUpForm from "./authentication/SignUpForm";
import SignInForm from "./authentication/SignInForm";

function App() {
  const isInitiallyLoggedIn = () => window.localStorage.getItem("loggedIn") === "true";
  const [loggedIn, setLoggedIn] = useState(isInitiallyLoggedIn());

  const handleLogin = () => {
    setLoggedIn(true);
    window.localStorage.setItem("loggedIn", "true");
  };

  useEffect(() => {
    const handleLogout = () => {
      setLoggedIn(false);
      localStorage.removeItem("loggedIn");
    };

    window.addEventListener('beforeunload', handleLogout);

    return () => {
      window.removeEventListener('beforeunload', handleLogout);
    };
  }, []);

  return (
      <Router> 
        <div className="App">
          {loggedIn ? (
              <>
                <h1>You are logged in!</h1>
                <button onClick={() => {
                  setLoggedIn(false);
                  localStorage.removeItem("loggedIn");
                }}>
                  Logout
                </button>
              </>
          ) : (
              <>
                <Routes>
                  <Route path="/signup" element={<SignUpForm />} />
                  <Route path="/signin" element={<SignInForm onLogin={handleLogin} />} />
                  <Route path="*" element={<Navigate to="/signin" />} />
                </Routes>
                <Link to="/signup">

                </Link>
              </>
          )}
        </div>
      </Router>
  );
}

export default App;
