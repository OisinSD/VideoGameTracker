import { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
import { getAuth } from "firebase/auth";
import { db } from "../authentication/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import witcherThumbnail from "../assets/images/witcher-thumbnail.webp";

export default function EditGameModal({
                                          show,
                                          handleClose,
                                          game,
                                          setRefreshGames,
                                      }) {
    const [review, setReview] = useState("");
    const [hoursPlayed, setHoursPlayed] = useState("");
    const [rating, setRating] = useState(0);
    const [trophiesUnlocked, setTrophiesUnlocked] = useState("");
    const [buttonConfirmed, setButtonConfirmed] = useState(false);

    useEffect(() => {
        if (game) {
            setReview(game.review || "");
            setHoursPlayed(game.hoursPlayed || "");
            setRating(game.rating || 0);
            setTrophiesUnlocked(game.trophiesUnlocked || "");
        }
    }, [game]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const userGameRef = doc(db, "userGames", user.uid);
        const docSnap = await getDoc(userGameRef);
        const games = docSnap.data().games;

        const index = games.findIndex((g) => g.title === game.title);
        games[index] = {
            ...games[index],
            review,
            hoursPlayed: parseInt(hoursPlayed),
            rating,
            trophiesUnlocked: parseInt(trophiesUnlocked),
        };

        await updateDoc(userGameRef, { games });

        setButtonConfirmed(true);

        setTimeout(() => {
            setButtonConfirmed(false);
            setRefreshGames((prev) => !prev);
            handleClose();
        }, 1500);
    };

    if (!game) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <style>{`.btn-close { filter: invert(1); }`}</style>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton className="bg-dark text-light">
                    <div className="d-flex align-items-center gap-3">
                        <img
                            src={game?.poster || game?.background_image || witcherThumbnail}
                            alt="Game Thumbnail"
                            className="img-fluid rounded"
                            style={{ width: "100px", height: "150px", objectFit: "cover" }}
                        />
                        <div className="d-flex flex-column text-center">
                            <h2 className="fw-bold m-0">{game?.title || game?.name}</h2>
                            <h6 className="text-secondary">
                                Genre: {game?.category || "Unknown"}
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

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="review">Review</Form.Label>
                        <Form.Control
                            as="textarea"
                            id="review"
                            className="form-control bg-dark text-light border-secondary rounded-3"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Update your review here..."
                            rows={4}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="trophiesUnlocked">
                            Trophies Unlocked 🏆
                        </Form.Label>
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

                    <div className="d-flex justify-content-end">
                        <Button
                            type="submit"
                            className="btn btn-lg w-100"
                            style={{
                                background: buttonConfirmed
                                    ? "linear-gradient(90deg, #28a745, #57f58b)"
                                    : "linear-gradient(90deg, #7f57f5, #e157f5)",
                                border: "none",
                            }}
                            disabled={buttonConfirmed}
                        >
                            {buttonConfirmed ? "✔️ Game Updated!" : "Save Changes"}
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
}
