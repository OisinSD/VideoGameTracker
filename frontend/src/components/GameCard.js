import React from "react";

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <div className="game-header">
        {game.poster ? (
          <img
            src={game.poster}
            alt={`${game.title} Poster`}
            className="game-logo"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ) : (
          <div className="game-logo">Logo</div>
        )}
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
          <strong>{game.trophiesUnlocked || 0} Trophies</strong>
        </p>
      </div>
    </div>
  );
};

export default GameCard;
