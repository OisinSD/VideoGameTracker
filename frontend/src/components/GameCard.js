import React from "react";

const GameCard = ({ game }) => {
    return (
        <div className="card shadow-sm rounded p-3 text-white" style={{ backgroundColor: "#333", minWidth: "250px", maxWidth: "300px", margin: "0 auto" }}>
            <div className="d-flex align-items-center mb-3">
                {game.poster ? (
                    <img
                        src={game.poster}
                        alt={`${game.title} Poster`}
                        className="me-3"
                        style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "10px" }}
                    />
                ) : (
                    <div className="bg-light text-dark d-flex align-items-center justify-content-center rounded" style={{ width: "60px", height: "60px" }}>
                        Logo
                    </div>
                )}
                <div>
                    <p className="mb-0 small text-muted">{game.genre}</p>
                    <h5 className="mb-0">{game.title}</h5>
                </div>
                <i className="material-icons ms-auto">bookmark_border</i>
            </div>

            <div>
                <p className="mb-1">
                    <i className="material-icons me-1" style={{ verticalAlign: "middle" }}>place</i>
                    Rating: {game.rating}/5
                </p>
                <p className="mb-0"><strong>{game.trophies || 0} Trophies</strong></p>
            </div>
        </div>
    );
};


export default GameCard;
