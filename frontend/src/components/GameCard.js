import { Card, Button } from "react-bootstrap";
import React, { useState } from "react";

const GameCard = ({ game, onClick, onDelete, onEdit, isDeleted }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [skipClick, setSkipClick] = useState(false);

    const handleCardClick = () => {
        if (!skipClick && !isDeleted) onClick();
    };

    return (
        <Card
            onClick={handleCardClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`text-white bg-dark m-1 shadow-sm ${isHovered ? "border-light" : ""}`}
            style={{
                height: "350px",
                borderRadius: "12px",
                cursor: isDeleted ? "default" : "pointer",
                transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                boxShadow: isHovered
                    ? "0 12px 24px rgba(255, 255, 255, 0.15)"
                    : "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                position: "relative",
                opacity: isDeleted ? 0.5 : 1,
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
                {isDeleted ? (
                    <Card.Text className="fw-bold fs-5" style={{ color: "#00ff99", textShadow: "0 0 6px #00ff99" }}>
                        ✔ Game Deleted
                    </Card.Text>


                ) : (
                    <>
                        <Card.Text className="text-light mb-2">
                            <i className="bi bi-geo-alt-fill me-2"></i>
                            Rating: {game.rating}/5
                        </Card.Text>
                        <Card.Text className="text-light">
                            <strong>{game.trophiesUnlocked || 0} Trophies</strong>
                        </Card.Text>
                    </>
                )}

                {isHovered && !isDeleted && (
                    <div
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <Button
                            variant="warning"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSkipClick(true);
                                onEdit(game);
                                setTimeout(() => setSkipClick(false), 100);
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSkipClick(true);
                                onDelete(game);
                                setTimeout(() => setSkipClick(false), 100);
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default GameCard;
