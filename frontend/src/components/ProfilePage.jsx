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
            className="text-light d-flex justify-content-center"
            style={{
                //backgroundColor: "#121212",
                minHeight: "100vh",
                padding: "2rem",
                marginTop: "2rem",
            }}
        >
            <div className="container">
                <div className="row justify-content-center align-items-start gx-4 gy-4">
                    {/* Left Column: Profile Image */}
                    <div className="col-md-5 d-flex justify-content-center">
                        <img
                            src={gamerAvatar}
                            alt="Profile"
                            className="rounded-circle img-fluid"
                            style={{
                                width: "100%",
                                maxWidth: "300px",
                                aspectRatio: "1/1",
                                objectFit: "cover",
                                border: "3px solid #7f57f5",
                            }}
                        />
                    </div>

                    {/* Right Column: Profile Info */}
                    <div className="col-md-7">
                        <h1
                            className="fw-bold mb-3"
                            style={{ color: "white", fontSize: "2rem" }}
                        >
                            {user.displayName || user.email}
                        </h1>

                        <div className="mb-3">
                            <h4
                                className="fw-bold mb-1"
                                style={{
                                    fontSize: "1.2rem",
                                    color: "rgb(127, 87, 245)",
                                }}
                            >
                                Username
                            </h4>
                            <p style={{ fontSize: "1.2rem" }}>
                                {user.displayName || "Not Set"}
                            </p>
                        </div>

                        <div className="mb-3">
                            <h4
                                className="fw-bold mb-1"
                                style={{
                                    fontSize: "1.2rem",
                                    color: "rgb(127, 87, 245)",
                                }}
                            >
                                Email
                            </h4>
                            <p style={{ fontSize: "1.2rem" }}>{user.email}</p>
                        </div>

                        <div className="mb-3">
                            <h4
                                className="fw-bold mb-1"
                                style={{
                                    fontSize: "1.2rem",
                                    color: "rgb(127, 87, 245)",
                                }}
                            >
                                Games Played 🎮
                            </h4>
                            <p style={{ fontSize: "1.2rem" }}>{gamesPlayed}</p>
                        </div>

                        <div className="mb-3">
                            <h4
                                className="fw-bold mb-1"
                                style={{
                                    fontSize: "1.2rem",
                                    color: "rgb(127, 87, 245)",
                                }}
                            >
                                Total Achievements 🏆
                            </h4>
                            <p style={{ fontSize: "1.2rem" }}>{totalAchievements}</p>
                        </div>

                        <div className="mb-3">
                            <h4
                                className="fw-bold mb-1"
                                style={{
                                    fontSize: "1.2rem",
                                    color: "rgb(127, 87, 245)",
                                }}
                            >
                                Achievement Completion 📈
                            </h4>
                            <p style={{ fontSize: "1.2rem" }}>{achievementCompletion}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
