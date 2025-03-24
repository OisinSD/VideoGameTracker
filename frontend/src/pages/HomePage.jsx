import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { SearchResults } from "../components/SearchResults";
import GameList from "../components/GameList";
import AddGame from "../components/AddGame";
import { NewSearchBar } from "../components/NewSearchbar";
import "../assets/styles/HomePage.css";
import { signOut } from "firebase/auth";
import { auth } from "../authentication/firebaseConfig";

const gamesData = [
  { title: "Overwatch", category: "Hero Shooter", rating: 4.5, trophies: 15 },
  { title: "Call of Duty", category: "FPS", rating: 4.9, trophies: 13 },
  { title: "BattleField 1", category: "WW1 FPS", rating: 5.0, trophies: 11 },
  { title: "Fortnite", category: "Battle Royale", rating: 4.8, trophies: 9 },
  { title: "The Witcher 3", category: "RPG", rating: 4.8, trophies: 9 },
  { title: "FIFA 25", category: "Sports", rating: 4.8, trophies: 9 },

];

const HomePage = () => {
  const [filteredGames, setFilteredGames] = useState(gamesData);
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal state

  const handleSearch = (query) => {
    console.log("Search Query:", query);
    const filtered = gamesData.filter((game) =>
        game.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log("Filtered Results:", filtered);
    setFilteredGames(filtered);
  };

  function handleAddData(data) {
    console.log("New Data:", data);
  }

  return (
      <div className="home-page">
        <header className="position-relative">
          {/* Banner image */}
          <div className="banner-wrapper">
            <img
                src="/VideoGameCharacters-JuegoStudioBackground.png"
                alt="Banner"
                className="banner-image"
            />

            {/* Profile button */}
            <div className="position-absolute top-0 start-0 m-3">
              <Link to="/profile">
                <Button
                    className="btn btn-lg"
                    style={{
                      background: "linear-gradient(90deg, #7f57f5, #e157f5)",
                      border: "none",
                    }}
                >
                  Profile
                </Button>
              </Link>
            </div>

            {/* Top-right corner: Add Game + Logout */}
            <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
              <Button
                  variant="primary"
                  onClick={() => setShowModal(true)}
                  className="btn btn-lg"
                  style={{
                    background: "linear-gradient(90deg, #7f57f5, #e157f5)",
                    border: "none",
                    whiteSpace: "nowrap",
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
          <div className="search-bar-container d-flex align-items-center justify-content-center mt-4">
            <NewSearchBar setResults={setResults} />
            <SearchResults results={results} />
          </div>
        </header>

        <GameList games={filteredGames} />

        {/* AddGame Modal */}
        <AddGame
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleAddData={handleAddData}
        />
      </div>
  );
};

export default HomePage;