import { Card } from "react-bootstrap";
import React, { useState } from "react";

const GameCard = ({ game, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`text-white bg-dark shadow-sm m-1 ${
        isHovered ? "border-light" : ""
      }`}
      style={{
        height: "350px",
        borderRadius: "12px",
        cursor: "pointer",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 12px 24px rgba(255, 255, 255, 0.15)"
          : "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
      }}
    >
      <Card.Img
        variant="top"
        src={game.poster}
        alt={`${game.title} Poster`}
        style={{
          height: "180px",
          objectFit: "cover",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          width: "100%",
          objectPosition: "center",
        }}
      />
      <Card.Body style={{ overflowY: "auto" }}>
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
