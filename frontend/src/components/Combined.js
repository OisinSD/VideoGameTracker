import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

export default function Combined({
     show,
     handleClose,
     handleAddData,
     triggerAddGame,
     game,
     onEdit,
     handleDelete,
     fulldata,
 }) {
  const [review] = useState(game?.review || "");
  const [hoursPlayed] = useState(game?.hoursPlayed || "");
  const [rating] = useState(game?.rating || 0);
  const [libraryGameInfo, setLibraryGameInfo] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!game) return null;

  function handleSubmit(e) {
    e.preventDefault();
    // Optional: save logic
  }




console.log("full data", fulldata);


const removeHTML = (htmlString) => {
  let tmp = document.createElement("div");
  tmp.innerHTML = htmlString;
  return tmp.textContent || tmp.innerText || "";
};
const cleanedDescription = fulldata.description
      ? removeHTML(fulldata.description)
      : "No description available.";
  const shortDescription =
      cleanedDescription.length > 500
          ? cleanedDescription.slice(0, 500) + "... "
          : cleanedDescription;


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
                  Publisher:{" "}
                  {fulldata.publishers 
                  ? fulldata.publishers.map((p) => p.name).join(", ")
                   : "Unknown"}
                </h6>
                <h6 className="text-secondary">
                  Genre: {game.category || game.genre || "Unknown"}
                </h6>
                <h6 className="text-secondary">
                  Platform: {" "} 
                  {fulldata.platforms ? 
                  fulldata.parent_platforms.map((m) => m.platform.name).join(", ") : "Unknown"}
                </h6>
                <h6 className="text-secondary">
                  Release Date: {fulldata.released || game.releaseDate || "Unknown"}
                </h6>
              </div>
            </div>
          </Modal.Header>

          <Modal.Body className="bg-dark text-light">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="review">Game Summary</Form.Label>
              {/* <p>{fulldata.description_raw || "No summary available."}</p> */}
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