import { useState } from "react";
import { Form, Modal } from "react-bootstrap";

export default function Combined({
                                   show,
                                   handleClose,
                                   handleAddData,
                                   triggerAddGame,
                                   game,
                                 }) {
  const [review] = useState(game?.review || "");
  const [hoursPlayed] = useState(game?.hoursPlayed || "");
  const [rating] = useState(game?.rating || 0);

  if (!game) return null;

  function handleSubmit(e) {
    e.preventDefault();
    // Optional: save logic
  }

  return (
      <Modal show={show} onHide={handleClose} centered>
        <style>
          {`
          .btn-close {
            filter: invert(1); 
          }
        `}
        </style>

        <Form onSubmit={handleSubmit}>
          {/* Header and Close Button */}
          <Modal.Header closeButton className="bg-dark text-light">
            <div className="d-flex align-items-center gap-3">
              <img
                  src={game.poster || game.background_image}
                  alt="Game Thumbnail"
                  className="img-fluid rounded"
                  style={{ width: "100px", height: "150px", objectFit: "cover" }}
              />
              <div className="d-flex flex-column text-center">
                <h2 className="fw-bold m-0">{game.title || game.name}</h2>
                <h6 className="text-secondary">
                  Publisher: {game.publisher || "Unknown"}
                </h6>
                <h6 className="text-secondary">
                  Genre: {game.category || game.genre || "Unknown"}
                </h6>
                <h6 className="text-secondary">
                  Platform: {game.platforms?.join(", ") || "Unknown"}
                </h6>
                <h6 className="text-secondary">
                  Release Date: {game.released || game.releaseDate || "Unknown"}
                </h6>
              </div>
            </div>
          </Modal.Header>

          <Modal.Body className="bg-dark text-light">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="review">Game Summary</Form.Label>
              <p>{game.description || "No summary available."}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <h6>
                Trophies Unlocked 🏆: {game.trophiesUnlocked ?? 0} /{" "}
                {game.totalTrophies ?? "?"}
              </h6>
            </Form.Group>

            <Form.Group className="mb-3">
              <h6>Review ⭐️: {game.review || "No review added"}</h6>
            </Form.Group>

            <Form.Group className="mb-3">
              <h6>Hours Played ⏳: {game.hoursPlayed || "Not logged"}</h6>
            </Form.Group>
          </Modal.Body>
        </Form>
      </Modal>
  );
}
