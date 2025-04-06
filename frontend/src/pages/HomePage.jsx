import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { SearchResults } from "../components/SearchResults";
import AddGame from "../components/AddGame";
import GameInfo from "../components/GameInfo";
import ProfilePage from "../components/ProfilePage";
import { NewSearchBar } from "../components/NewSearchbar";
import "../assets/styles/HomePage.css";
import { signOut } from "firebase/auth";
import { auth } from "../authentication/firebaseConfig";
import GameCardDisplay from "../components/GameCardDisplay";

const HomePage = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [results, setResults] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const triggerGameInfo = (game) => {
    setSelectedGame(game);
    setShowInfoModal(true);
  };

  function handleAddData(data) {
    console.log("New Data:", data);
  }

  return (
    <div className="home-page">
      <header className="position-relative">
        <div className="banner-wrapper">
          {/* <img
            src="/VideoGameCharacters-JuegoStudioBackground.png"
            alt="Banner"
            className="banner-image"
            style={{height:"30vh"}}
          /> */}

          <div className="banner">
            {/* Profile button */}
            <div className="position-absolute top-0 start-0 m-3">
              <Button
                onClick={() => setShowProfileModal(true)}
                className="btn btn-lg"
                style={{
                  background: "linear-gradient(90deg, #7f57f5, #e157f5)",
                  border: "none",
                }}
              >
                Profile
              </Button>
            </div>

            {/* Top-right corner: Add Game + Logout */}
            <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
              <Button
                variant="primary"
                onClick={() => setShowAddModal(true)} // 👈 open AddGame instead
                className="btn btn-lg w-30"
                style={{
                  background: "linear-gradient(90deg, #7f57f5, #e157f5)",
                  border: "none",
                }}
              >
                <Plus size={20} /> Add Game
              </Button>

              <Button
                className="btn btn-lg"
                style={{
                  background: "linear-gradient(90deg, #7f57f5, #e157f5)",
                  border: "none",
                }}
                onClick={() => signOut(auth)}
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Search bar only */}
          <div className="search-bar-container">
            <NewSearchBar
              setResults={setResults}
              results={results}
              triggerGameInfo={triggerGameInfo}
            />
            <SearchResults results={results} />
          </div>
        </div>
      </header>

      <GameCardDisplay />

      {/* Modals */}
      <ProfilePage
        show={showProfileModal}
        handleClose={() => setShowProfileModal(false)}
      />
      <AddGame
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleAddData={handleAddData}
      />
      <GameInfo
        show={showInfoModal}
        handleClose={() => setShowInfoModal(false)}
        handleAddData={handleAddData}
        triggerAddGame={() => {
          setShowInfoModal(false);
          setShowAddModal(true);
        }}
        game={selectedGame}
      />
    </div>
  );
};

export default HomePage;
