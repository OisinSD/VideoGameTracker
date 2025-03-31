import React, {useState} from "react";
import "../assets/styles/NewSearch.css";
import GameInfo from "./GameInfo";
import AddGame from "../components/AddGame";


export const SearchResults = ({ results }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
 
  let MyClass = results.length> 0 ? "results-list" : "NOresults-list";

  const shortenText = (text, maxLen) => {
    if (text.length <= maxLen) {
      return text;
    }
    return text.slice(0, maxLen) + "...";
  };

  function handleAddData(data) {
    console.log("New Data:", data);
  }
  const API_KEY = "e784bf5f8e30437686ea67247443042d";
  const handleGameClick = async (gameId) => {
    try {
        const apiKey = "your_api_key_here"; 
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
        
        if (!response.ok) throw new Error("Failed to fetch game details");

        const fullGameData = await response.json();
        console.log("Full Game Data:", fullGameData); // Debugging

        setSelectedGame(fullGameData); // Pass full game data to modal
        setShowInfoModal(true); // Open modal
    } catch (error) {
        console.error("Error fetching full game details:", error);
    }
};

  return (
    <div className={MyClass}>
      {results.map((result, id) => {
        return (
          <div key={id} className="results-game-card">
            {result.background_image && (
              <img
                src={result.background_image}
                alt={results.name}
                className="game-image"
              />
            )}
            <h3 
            className="game-name-info" 
            onClick={() => handleGameClick(result.id)}>
              {shortenText(result.name, 25)}</h3>
            {/* <h3 className="game-info">{result.rating}/5</h3> */}
          </div>
        );
      })}
      <GameInfo
                show={showInfoModal}
                handleClose={() => setShowInfoModal(false)}
                handleAddData={handleAddData}
                triggerAddGame={() => {
                  setShowInfoModal(false);
                  setShowAddModal(true);
                }}
                game = {selectedGame}
            />
    </div>
  );
};
