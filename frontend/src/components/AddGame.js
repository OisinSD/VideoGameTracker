import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
import witcherThumbnail from "../assets/images/witcher-thumbnail.webp";


export default function AddGame({ show, handleClose, handleAddData }) {
  const [review, setReview] = useState("");
  const [hoursPlayed, setHoursPlayed] = useState("");
  const [rating, setRating] = useState(0);
  const [trophiesUnlocked, setTrophiesUnlocked] = useState("");


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
              </div>
            </div>
          </Modal.Header>

          <Modal.Body className="bg-dark text-light">
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <div className="d-flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => setRating(star)}
                        style={{ cursor: "pointer" }}
                    >
                  {rating >= star ? (
                      <StarFill className="fs-3 text-warning" />
                  ) : (
                      <Star className="fs-3 text-warning" />
                  )}
                </span>
                ))}
              </div>
            </Form.Group>

            {/* Review Section */}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="review">Review</Form.Label>
              <Form.Control
                  as="textarea"
                  id="review"
                  className="form-control bg-dark text-light border-secondary rounded-3"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here..."
                  rows={4}
                  required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="trophiesUnlocked">Trophies Unlocked 🏆</Form.Label>
              <Form.Control
                  type="number"
                  id="trophiesUnlocked"
                  className="form-control bg-dark text-light border-secondary rounded-3"
                  value={trophiesUnlocked}
                  onChange={(e) => setTrophiesUnlocked(e.target.value)}
                  placeholder="Enter trophies unlocked"
                  min={0}
                  step={1}
                  required
              />
            </Form.Group>



            <Form.Group className="mb-3">
              <Form.Label htmlFor="hoursPlayed">Hours Played ⏳</Form.Label>
              <Form.Control
                  type="number"
                  id="hoursPlayed"
                  className="form-control bg-dark text-light border-secondary rounded-3"
                  value={hoursPlayed}
                  onChange={(e) => setHoursPlayed(e.target.value)}
                  placeholder="Enter hours played"
                  min={0}
                  step={1}
                  required
              />
            </Form.Group>

            {/* Add Button */}
            <div className="d-flex justify-content-end">
              <Button
                  type="submit"
                  className="btn btn-lg w-100"
                  style={{
                    background: "linear-gradient(90deg, #7f57f5, #e157f5)",
                    border: "none",
                  }}
              >
                Add Game
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
  );
}
