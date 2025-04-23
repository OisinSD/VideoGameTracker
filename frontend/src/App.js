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

import PrivacyModal from "./components/PrivacyModal";
import TermsModal from "./components/TermsModal";
import AboutModal from "./components/AboutModal";
import ContactModal from "./components/ContactModal";
import GameLoadingScreen from "./components/GameLoadingScreen";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSplashActive, setIsSplashActive] = useState(false);


  const [modalState, setModalState] = useState({
    privacy: false,
    terms: false,
    about: false,
    contact: false,
  });

  const [darkMode, setDarkMode] = useState(true);
  const themeClass = darkMode ? "dark-mode" : "light-mode";

  useEffect(() => {
    document.body.className = darkMode ? 'bg-dark text-light' : 'bg-light text-dark';
  }, [darkMode] );

  const openModal = (key) => {
    setModalState((prev) => ({ ...prev, [key]: true }));
  };

  const closeModal = (key) => {
    setModalState((prev) => ({ ...prev, [key]: false }));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSplashActive(true);   // 👈 Show splash first
        setLoggedIn(true);
        setTimeout(() => {
          setIsSplashActive(false); // 👈 Then show homepage
        }, 2500); // 2.5 seconds
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  return (
      <Router>
        <div className={`App ${themeClass}`}>

          <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="btn btn-sm btn-secondary position-absolute top-0 end-0 m-3 z-3"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <Routes>
            {isSplashActive ? (
                <Route path="*" element={<GameLoadingScreen />} />
            ) : loggedIn ? (
                <>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
            ) : (
                <>
                  <Route path="/signup" element={<SignUpForm />} />
                  <Route path="/signin" element={<SignInForm />} />
                  <Route path="*" element={<Navigate to="/signin" />} />
                </>
            )}
          </Routes>



          <Footer
              onPrivacyClick={() => openModal("privacy")}
              onTermsClick={() => openModal("terms")}
              onAboutClick={() => openModal("about")}
              onContactClick={() => openModal("contact")}
          />
          <PrivacyModal show={modalState.privacy} handleClose={() => closeModal("privacy")} />
          <TermsModal show={modalState.terms} handleClose={() => closeModal("terms")} />
          <AboutModal show={modalState.about} handleClose={() => closeModal("about")} />
          <ContactModal show={modalState.contact} handleClose={() => closeModal("contact")} />
        </div>
      </Router>
  );
}

export default App;
