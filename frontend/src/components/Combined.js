import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
import witcherThumbnail from "./witcher-thumbnail.webp";

export default function Combined({
  show,
  handleClose,
  handleAddData,
  triggerAddGame,
}) {
  const [review, setReview] = useState("");
  const [hoursPlayed, setHoursPlayed] = useState("");
  const [rating, setRating] = useState(0);
  const [addedToPlaying, setAddedToPlaying] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
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
            {/* Game Thumbnail */}
            <img
              src={witcherThumbnail}
              alt="Game Thumbnail"
              className="img-fluid rounded"
              style={{ width: "100px", height: "150px", objectFit: "cover" }}
            />
            {/* Title */}
            <div className="d-flex flex-column text-center">
              <h2 className="fw-bold m-0">The Witcher 3</h2>
              <h6 className="text-secondary">Publisher: CD Projekt Red</h6>
              <h6 className="text-secondary">Genre: RPG</h6>
              <h6 className="text-secondary">
                Platform: Playstation, Xbox, PC, Nintendo
              </h6>
              <h6 className="text-secondary">Release Date: 2005</h6>
            </div>
          </div>
        </Modal.Header>

        <Modal.Body className="bg-dark text-light">
          {/* Review Section */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="review">Game Summary</Form.Label>
            <p>
              In The Witcher 3 an ancient evil stirs, awakening. An evil that
              sows terror and abducts the young. An evil whose name is spoken
              only in whispers: the Wild Hunt. Led by four wraith commanders,
              this ravenous band of phantoms is the ultimate predator and has
              been for centuries. Its quarry: humans.
            </p>
          </Form.Group>

          <Form.Group className="mb-3">
            <h6>Trophies Unlocked 🏆: 45 / 79</h6>
          </Form.Group>

          <Form.Group className="mb-3">
            <h6>Review ⭐️: </h6>
          </Form.Group>
          <Form.Group className="mb-3">
            <h6>Hours Played ⏳: </h6>
          </Form.Group>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
