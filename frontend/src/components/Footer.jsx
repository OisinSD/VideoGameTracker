import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ onPrivacyClick, onTermsClick, onAboutClick, onContactClick }) => {
  return (
    <footer
      style={{ backgroundColor: "#121212" }}
      className="text-light py-2 mt-auto"
    >
      <div className="container text-center">
        <p className="mb-2">© 2025 Quest Log. All rights reserved.</p>

        <div className="d-flex justify-content-center gap-3 mb-3">
        <button onClick={onPrivacyClick} className="btn btn-link text-light text-decoration-none p-0">
            Privacy
          </button>
          <button onClick={onTermsClick} className="btn btn-link text-light text-decoration-none p-0">
            Terms
          </button>
          <button onClick={onAboutClick} className="btn btn-link text-light text-decoration-none p-0">
            About
          </button>
          <button onClick={onContactClick} className="btn btn-link text-light text-decoration-none p-0">
            Contact
          </button>
        </div>

        <div className="d-flex justify-content-center gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-light fs-5"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-light fs-5"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-light fs-5"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
