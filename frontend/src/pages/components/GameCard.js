import React from "react";

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <div className="game-header">
        <div className="game-logo">Logo</div>
        <div className="game-info">
          <p className="game-category">{game.category}</p>
          <h2 className="game-title">{game.title}</h2>
        </div>
        <i className="material-icons bookmark-icon">bookmark_border</i>
      </div>
      <div className="game-footer">
        <p className="game-rating">
          <i className="material-icons">place</i> Rating: {game.rating}/5
        </p>
        <p className="game-trophies">
          <strong>{game.trophies} Trophies</strong>
        </p>
      </div>
    </div>
  );
};

export default GameCard;
