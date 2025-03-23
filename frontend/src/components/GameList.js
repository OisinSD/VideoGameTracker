import React from "react";
import GameCard from "./GameCard";

const GameList = ({ games }) => {
  return (
    <section className="game-section">
      <h2>Your Games</h2>
      <div className="game-container">
        {games.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>
    </section>
  );
};

export default GameList;
