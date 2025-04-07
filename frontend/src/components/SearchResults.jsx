import React, { useState } from "react";
import "../assets/styles/NewSearch.css";
import GameInfo from "./GameInfo";
import AddGame from "../components/AddGame";

export const SearchResults = ({ results, onSelectGame }) => {
  const shortenText = (text, maxLen) => {
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen) + "...";
  };

  const API_KEY = "e784bf5f8e30437686ea67247443042d";

  const handleGameClick = async (gameId) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch game details");
      const fullGameData = await response.json();

      onSelectGame(fullGameData);
    } catch (error) {
      console.error("Error fetching full game details:", error);
    }
  };

  const MyClass = results.length > 0 ? "results-list" : "NOresults-list";

  return (
    <div className={MyClass}>
      {results.map((result, id) => (
        <div key={id} className="results-game-card">
          {result.background_image && (
            <img
              src={result.background_image}
              alt={result.name}
              className="game-image"
            />
          )}
          <h3
            className="game-name-info"
            onClick={() => handleGameClick(result.id)}
          >
            {shortenText(result.name, 25)}
          </h3>
        </div>
      ))}
    </div>
  );
};
