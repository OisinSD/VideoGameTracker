import React from "react";
import { Card } from "react-bootstrap";

const GameCard = ({ game, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className="text-white bg-dark h-100"
      style={{ borderRadius: "12px", cursor: "pointer" }}
    >
      <Card.Img
        variant="top"
        src={game.poster}
        alt={`${game.title} Poster`}
        style={{
          height: "200px",
          objectFit: "cover",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          width: "100%",
          objectPosition: "center",
        }}
      />

      <Card.Body>
        <Card.Title className="fw-semibold fs-5">{game.title}</Card.Title>
        <Card.Text className="text-light mb-2">
          <i className="bi bi-geo-alt-fill me-2"></i>
          Rating: {game.rating}/5
        </Card.Text>
        <Card.Text className="text-light">
          <strong>{game.trophiesUnlocked || 0} Trophies</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
