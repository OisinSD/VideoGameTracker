import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { auth } from "../authentication/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import gamerAvatar from "../assets/images/gamer-avatar.jpg";

const ProfilePage = ({ show, handleClose }) => {
  const [user, setUser] = useState(null);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [totalAchievements, setTotalAchievements] = useState(0);
  const [achievementCompletion, setAchievementCompletion] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setGamesPlayed(4);
        setTotalAchievements(48);
        setAchievementCompletion(80);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-light">
        <h2 className="fw-bold m-0">Profile</h2>
      </Modal.Header>

      <Modal.Body className="bg-dark text-light">
        <div className="text-center mb-4">
          <img
            src={gamerAvatar}
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <h5>{user.displayName || user.email}</h5>
        </div>

        <div className="mb-3">
          <h6 className="text-secondary mb-1">Username</h6>
          <p className="m-0">{user.displayName || "Not Set"}</p>
        </div>

        <div className="mb-3">
          <h6 className="text-secondary mb-1">Email</h6>
          <p className="m-0">{user.email}</p>
        </div>

        <div className="mb-3">
          <h6 className="text-secondary mb-1">Games Played 🎮</h6>
          <p className="m-0">{gamesPlayed}</p>
        </div>

        <div className="mb-3">
          <h6 className="text-secondary mb-1">Total Achievements 🏆</h6>
          <p className="m-0">{totalAchievements}</p>
        </div>

        <div className="mb-4">
          <h6 className="text-secondary mb-1">Achievement Completion 📈</h6>
          <p className="m-0">{achievementCompletion}%</p>
        </div>

        <Button
          onClick={handleClose}
          className="w-100"
          style={{
            background: "linear-gradient(90deg, #7f57f5, #e157f5)",
            border: "none",
          }}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ProfilePage;
