import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
import witcherThumbnail from "../assets/images/witcher-thumbnail.webp";


export default function GameInfo({show,handleClose,handleAddData,triggerAddGame,game}) {
    const [review, setReview] = useState("");
    const [hoursPlayed, setHoursPlayed] = useState("");
    const [rating, setRating] = useState(0);
    const [addedToPlaying, setAddedToPlaying] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    console.log("Game data in Modal:", game);

    if (!game  ) return null;

    function handleSubmit(e) {
        e.preventDefault();
    }

    
    const removeHTML = htmlString => {
        let tmp = document.createElement('div');
        tmp.innerHTML = htmlString;
        return tmp.textContent || tmp.innerText || '';
    }

    const cleanedDescription = game.description ? removeHTML(game.description) : "No description available.";
    const shortDescription = cleanedDescription.length > 500 ? cleanedDescription.slice(0, 500) + "... " : cleanedDescription;

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
                            src={game.background_image}
                            alt="Game Thumbnail"
                            className="img-fluid rounded"
                            style={{ width: "100px", height: "150px", objectFit: "cover" }}
                        />
                        {/* Title */}
                        <div className="d-flex flex-column text-center">
                            <h2 className="fw-bold m-0">{game.name}</h2>
                            <h6 className="text-secondary">Publisher:  {game.publishers ? game.publishers.map(p => p.name).join(", ") : "Unknown"}</h6>
                        
                            <h6 className="text-secondary">Genre: {game.genres ? game.genres.map(g => g.name).join(", ") : "Unkown"} </h6>
                            <h6 className="text-secondary">
                                Platform: {game.parent_platforms ? game.parent_platforms.map(pp => pp.platform.name).join(", ") : "Unknown"}
                            </h6>
                            <h6 className="text-secondary">Release Date: {game.released}</h6>
                        </div>
                    </div>
                </Modal.Header>

                <Modal.Body className="bg-dark text-light">
                    {/* Review Section */}
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="review">Game Summary</Form.Label>
                        <p>
                        {showFullDescription ? cleanedDescription : shortDescription}
                        {cleanedDescription.length > 500 && (
                            <Button
                                variant="link"
                                className="p-0 text-secondary"
                                
                                onClick={() => setShowFullDescription(!showFullDescription)}
                            >
                                {showFullDescription ? "Show Less" : "Read More"}
                            </Button>
                        )}
                        </p>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <h6>Number of Trophies 🏆: {game.parent_achievements_count}</h6>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <h6>Metacritic Score 📈: {game.metacritic ? game.metacritic : "N/A"} </h6>
                    </Form.Group>

                    {/* Add Button */}
                    <div className="d-flex justify-content-between gap-3">
                        <Button
                            type="button"
                            className="btn btn-lg w-100 d-flex justify-content-center align-items-center gap-2"
                            style={{
                                background: addedToPlaying
                                    ? "linear-gradient(90deg, #28a745, #28a745)" // green
                                    : "linear-gradient(90deg, #7f57f5, #e157f5)", // purple
                                border: "none",
                            }}
                            onClick={() => setAddedToPlaying(true)}
                            disabled={addedToPlaying}
                        >
                            {addedToPlaying ? (
                                <>
                                    <span className="text-white fw-bold">Added</span>
                                    <span className="fs-5">✅</span>
                                </>
                            ) : (
                                "Add to Playing"
                            )}
                        </Button>

                        <Button
                            type="button"
                            className="btn btn-lg w-100"
                            style={{
                                background: "linear-gradient(90deg, #7f57f5, #e157f5)",
                                border: "none",
                            }}
                            onClick={triggerAddGame}
                        >
                            Add to Library
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
}
