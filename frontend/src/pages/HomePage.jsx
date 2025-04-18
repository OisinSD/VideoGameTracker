import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { List } from "react-bootstrap-icons";

import { SearchResults } from "../components/SearchResults";
import AddGame from "../components/AddGame";
import GameInfo from "../components/GameInfo";
import ProfilePage from "../components/ProfilePage";
import { NewSearchBar } from "../components/NewSearchbar";
import "../assets/styles/HomePage.css";
import { signOut } from "firebase/auth";
import { auth } from "../authentication/firebaseConfig";
import GameCardDisplay from "../components/GameCardDisplay";
import GameRecommendationsCarousel from "../components/GameRecommendationsCarousel";
import PixelRunner from "../components/PixelRunner";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [addGameData, setAddGameData] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshGames, setRefreshGames] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);

  const triggerGameInfo = (game) => {
    setSelectedGame(game);
    setShowInfoModal(true);
  };

  function handleAddData(data) {
    console.log("New Data:", data);
  }

  const handleGameSelectFromSearch = (game) => {
    setSelectedGame(game);
    setShowInfoModal(true);
  };

  const triggerAddGame = (extraData) => {
    setAddGameData(extraData);
    setShowInfoModal(false);
    setShowAddModal(true);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleToggleSidebar = () => {
    setSidebarVisible((prevVisible) => {
      const newVisible = !prevVisible;
      if (!prevVisible) {
        setTimeout(() => {
          if (sidebarRef.current) {
            const sidebarTop =
              sidebarRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: sidebarTop - 20,
              behavior: "smooth",
            });
          }
        }, 100);
      }
      return newVisible;
    });
  };

  return (
    <div className="home-page">
      {/* Banner and search bar */}
      <header className="position-relative">
        <div className="banner-wrapper">
          <div className="banner">
            {/* Sidebar toggle */}
            <div className="position-absolute top-0 start-0 m-3">
              <Button
                variant="light"
                onClick={handleToggleSidebar}
                style={{
                  opacity: 0.7,
                  backgroundColor: "white",
                  border: "none",
                }}
              >
                <List size={30} />
              </Button>
            </div>

            {/* Profile button - hide for now
            <div className="position-absolute top-0 end-0 m-3">
              <button
                onClick={() => setShowProfileModal(true)}
                className="btn btn-lg"
                style={{
                  background: "linear-gradient(90deg, #7f57f5, #e157f5)",
                  border: "none",
                }}
              >
                Profile
              </button>
            </div> */}

            {/* ⬇️ Add PixelRunner here */}
            <PixelRunner />

            {/* Search bar only*/}
            <div className="search-bar-container">
              <NewSearchBar
                setResults={setResults}
                results={results}
                triggerGameInfo={handleGameSelectFromSearch}
              />
              <SearchResults
                results={results}
                onSelectGame={handleGameSelectFromSearch}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar and main content */}
      {sidebarVisible && (
        <Sidebar
          ref={sidebarRef}
          onLogout={handleLogout}
          onSelectSection={setActiveSection}
        />
      )}

      <div
        style={{
          marginLeft: sidebarVisible ? "220px" : "0px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
        }}
      >
        {activeSection === "home" && (
          <>
            <GameRecommendationsCarousel />
            <GameCardDisplay
              refreshTrigger={refreshGames}
              viewSection="playing"
            />
            <GameCardDisplay
              refreshTrigger={refreshGames}
              viewSection="library"
            />
          </>
        )}
        {activeSection === "playing" && (
          <GameCardDisplay
            refreshTrigger={refreshGames}
            viewSection="playing"
          />
        )}
        {activeSection === "library" && (
          <GameCardDisplay
            refreshTrigger={refreshGames}
            viewSection="library"
          />
        )}
      </div>

      {/* Modals */}
      <ProfilePage
        show={showProfileModal}
        handleClose={() => setShowProfileModal(false)}
        refreshTrigger={refreshGames}
      />
      <AddGame
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleAddData={handleAddData}
        game={selectedGame}
        extraData={addGameData}
        setRefreshGames={setRefreshGames}
      />
      <GameInfo
        show={showInfoModal}
        handleClose={() => setShowInfoModal(false)}
        handleAddData={handleAddData}
        triggerAddGame={triggerAddGame}
        game={selectedGame}
        setRefreshGames={setRefreshGames}
      />
    </div>
  );
};

export default HomePage;
