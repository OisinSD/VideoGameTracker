import React, { useState } from "react";
import "./HomePage.css";
//import SearchBar from "./components/SearchBar";
import GameList from "./components/GameList";
import "./components/NewSearch.css";
import { NewSearchBar } from "./components/NewSearchbar";
import { SearchResults } from "./components/SearchResults";
import { Link } from "react-router-dom";
import AddGame from "./AddGame";
import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

const gamesData = [
    { title: "Overwatch", category: "Hero Shooter", rating: 4.5, trophies: 15 },
    { title: "Call of Duty", category: "FPS", rating: 4.9, trophies: 13 },
    { title: "BattleField 1", category: "WW1 FPS", rating: 5.0, trophies: 11 },
    { title: "Fortnite", category: "Battle Royale", rating: 4.8, trophies: 9 },
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
            <header className="header">
                <h1>Home Page</h1>
                <Link to="/profile" className="btn btn-primary"> Go to Profile</Link>

                {/* Search Bar + Add Game Button */}
                <div className="search-bar-container d-flex align-items-center">
                    <NewSearchBar setResults={setResults} />
                    <SearchResults results={results} />

                    {/* Add Game Button */}
                    <Button
                        variant="primary"
                        onClick={() => setShowModal(true)}
                        className="btn btn-lg ms-3"
                        style={{
                            background: "linear-gradient(90deg, #7f57f5, #e157f5)",
                            border: "none",
                        }}
                    >
                        <Plus size={20} /> Add Game
                    </Button>
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
