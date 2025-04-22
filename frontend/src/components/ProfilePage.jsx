import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { auth, db } from "../authentication/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import gamerAvatar from "../assets/images/gamer-avatar.jpg";
import { doc, getDoc } from "firebase/firestore";

const ProfilePage = ({ show, handleClose, refreshTrigger }) => {
  const [user, setUser] = useState(null);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [totalAchievements, setTotalAchievements] = useState(0);
  const [achievementCompletion, setAchievementCompletion] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        const docRef = doc(db, "userProfil", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setGamesPlayed(data.gamesPlayed || 0);
          setTotalAchievements(data.totalAchievements || 0);
          setAchievementCompletion(data.achievementCompletion || 0);
        } else {
          console.log("No profile data found.");
        }
      }
    });

    return () => unsubscribe();
  }, [refreshTrigger]);

  if (!user) return null;

  return (
    <div
      className="text-light"
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        padding: "4rem",
        display: "flex",
        justifyContent: "center",
        paddingTop: "2rem",
        marginTop: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "4rem",
          flexWrap: "wrap",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        {/* Left: Large Profile Image */}
        <div>
          <img
            src={gamerAvatar}
            alt="Profile"
            className="rounded-circle"
            style={{
              width: "600px",
              height: "600px",
              objectFit: "cover",
              border: "4px solid #7f57f5",
            }}
          />
        </div>

        {/* Right: Text Info */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          {/* Username (Main heading - white color) */}
          <h1
            className="fw-bold mb-4"
            style={{ color: "white", fontSize: "3rem" }} // Original size
          >
            {user.displayName || user.email}
          </h1>

          {/* Subheading Section */}
          <div className="mb-4">
            <h4
              className="fw-bold mb-1"
              style={{
                fontSize: "1.5rem", // Original size
                color: "rgb(127, 87, 245)", // Purple color
              }}
            >
              Username
            </h4>
            <p style={{ fontSize: "1.5rem" }}>
              {user.displayName || "Not Set"}
            </p>
          </div>

          <div className="mb-4">
            <h4
              className="fw-bold mb-1"
              style={{
                fontSize: "1.5rem", // Original size
                color: "rgb(127, 87, 245)", // Purple color
              }}
            >
              Email
            </h4>
            <p style={{ fontSize: "1.5rem" }}>{user.email}</p>
          </div>

          <div className="mb-4">
            <h4
              className="fw-bold mb-1"
              style={{
                fontSize: "1.5rem", // Original size
                color: "rgb(127, 87, 245)", // Purple color
              }}
            >
              Games Played 🎮
            </h4>
            <p style={{ fontSize: "1.5rem" }}>{gamesPlayed}</p>
          </div>

          <div className="mb-4">
            <h4
              className="fw-bold mb-1"
              style={{
                fontSize: "1.5rem", // Original size
                color: "rgb(127, 87, 245)", // Purple color
              }}
            >
              Total Achievements 🏆
            </h4>
            <p style={{ fontSize: "1.5rem" }}>{totalAchievements}</p>
          </div>

          <div className="mb-4">
            <h4
              className="fw-bold mb-1"
              style={{
                fontSize: "1.5rem", // Original size
                color: "rgb(127, 87, 245)", // Purple color
              }}
            >
              Achievement Completion 📈
            </h4>
            <p style={{ fontSize: "1.5rem" }}>{achievementCompletion}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
