import "./assets/styles/App.css";
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
import ProfilePage from "./components/ProfilePage.jsx";
import Footer from "./components/Footer";

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

  return (
    <Router>
      <div className="App">

        {loggedIn ? (
          <>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
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

          </>
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
