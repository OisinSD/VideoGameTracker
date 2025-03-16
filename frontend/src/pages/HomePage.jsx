import React, { useState } from "react";
import "./HomePage.css";
import SearchBar from "./components/SearchBar";
import GameList from "./components/GameList";
import "./components/NewSearch.css";
import { NewSearchBar } from "./components/NewSearchbar";
import { SearchResults } from "./components/SearchResults";


const gamesData = [
  { title: "Overwatch", category: "Hero Shooter", rating: 4.5, trophies: 15 },
  { title: "Call of Duty", category: "FPS", rating: 4.9, trophies: 13 },
  { title: "BattleField 1", category: "WW1 FPS", rating: 5.0, trophies: 11 },
  { title: "Fortnite", category: "Battle Royale", rating: 4.8, trophies: 9 },
];

const HomePage = () => {
  const [filteredGames, setFilteredGames] = useState(gamesData);

  const [results, setResults] = useState([]);

  const handleSearch = (query) => {
    console.log("Search Query:", query);
    const filtered = gamesData.filter((game) =>
      game.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log("Filtered Results:", filtered);
    setFilteredGames(filtered);
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>Home Page</h1>
        {/* <SearchBar onSearch={handleSearch} games={gamesData} /> {} */}
         <div className="search-bar-container">
                <NewSearchBar setResults={setResults} />
                <SearchResults results={results} /> 
            </div>
      </header>
      <GameList games={filteredGames} />
    </div>
  );
};

export default HomePage;
