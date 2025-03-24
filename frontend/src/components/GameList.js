import React from "react";
import GameCard from "./GameCard";

const GameList = ({ games }) => {
  return (
    <section className="game-section">
        <div className="bg-secondary text-white py-3 w-100 text-center mt-4">
            <h2 className="fw-bold text-uppercase">🎮 Game Library</h2>
        </div>

        <div className="game-container">
            {games.map((game, index) => (
                <GameCard key={index} game={game}/>
            ))}
        </div>
    </section>
  );
};

export default GameList;
