import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import SignUpForm from "./authentication/SignUpForm";
import SignInForm from "./authentication/SignInForm";
//NOTE:Import authentication method and home page
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./authentication/firebaseConfig";
import HomePage from "./pages/HomePage.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  // const isInitiallyLoggedIn = () =>
  //   window.localStorage.getItem("loggedIn") === "true";
  // const [loggedIn, setLoggedIn] = useState(isInitiallyLoggedIn());

  // const handleLogin = () => {
  //   setLoggedIn(true);
  //   window.localStorage.setItem("loggedIn", "true");
  // };

  // useEffect(() => {
  //   const handleLogout = () => {
  //     setLoggedIn(false);
  //     localStorage.removeItem("loggedIn");
  //   };

  //   window.addEventListener("beforeunload", handleLogout);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleLogout);
  //   };
  // }, []);

  return (
    <Router>
      <div className="App">
        {/* {loggedIn ? (
          <>
            <h1>You are logged in!</h1>
            <button
              onClick={() => {
                setLoggedIn(false);
                localStorage.removeItem("loggedIn");
              }}
            >
              Logout
            </button>
          </> */}
        {loggedIn ? (
          <>
            <nav>
              <Link to="/">Home</Link>
              <button
                onClick={() => {
                  signOut(auth);
                }}
              >
                Logout
              </button>
            </nav>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="*" element={<Navigate to="/signin" />} />
            </Routes>
            <nav>
              <Link to="/signup">Sign Up</Link>
              <Link to="/signin">Sign In</Link>
            </nav>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
