import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../authentication/firebaseConfig"; 
import { onAuthStateChanged } from "firebase/auth"; 
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [totalAchievements, setTotalAchievements] = useState(0);
  const [achievementCompletion, setAchievementCompletion] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        setGamesPlayed(4);
        setTotalAchievements(48);
        setAchievementCompletion(80);
      } else {
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  return (
    <Container className="mt-5">
      <Card className="bg-dark text-light p-4 rounded-4 shadow-lg">
        <h1 className="fw-bold text-center">Profile</h1>
        <p className="fs-5 text-center">Welcome, {user.displayName || user.email}!</p>

        <div className="text-center mb-4">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"} 
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: "150px", height: "150px" }}
          />
        </div>

        <div className="mb-3">
          <strong>Username: </strong>{user.displayName || "Not Set"}
        </div>
        <div className="mb-3">
          <strong>Email: </strong>{user.email}
        </div>
        <div className="mb-3">
          <strong>Games Played: </strong>{gamesPlayed}
        </div>
        <div className="mb-3">
          <strong>Total Achievements: </strong>{totalAchievements}
        </div>
        <div className="mb-3">
          <strong>Achievement Completion: </strong>{achievementCompletion}%
        </div>

        <Link to="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </Card>
    </Container>
  );
};

export default ProfilePage;