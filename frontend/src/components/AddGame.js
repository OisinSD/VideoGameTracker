import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
import witcherThumbnail from "../assets/images/witcher-thumbnail.webp";

import { db } from "../authentication/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function AddGame({
  show,
  handleClose,
  handleAddData,
  game,
  setRefreshGames,
}) {
  const [review, setReview] = useState("");
  const [hoursPlayed, setHoursPlayed] = useState("");
  const [rating, setRating] = useState(0);
  const [trophiesUnlocked, setTrophiesUnlocked] = useState("");

  const [buttonAnimated, setButtonAnimated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to add games.");
      return;
    }

    const gameData = {
      title: game?.name || "Unknown Game",
      poster: game?.background_image || "",
      category: game?.genres?.[0]?.name || "Unknown",
      rating,
      review,
      trophiesUnlocked: parseInt(trophiesUnlocked),
      hoursPlayed: parseInt(hoursPlayed),
      addedAt: new Date(),
      // currentlyPlaying: false,
      currentlyPlaying: isPlaying,
      gameID: game?.id || null,
    };

    console.log("Saving to Firestore:", gameData);

    const userGameRef = doc(db, "userGames", user.uid);
    const docSnap = await getDoc(userGameRef);

    let isNewGame = true;

    if (docSnap.exists()) {
      let existingGames = docSnap.data().games || [];

      const index = existingGames.findIndex(
        (existingGame) => existingGame.title === gameData.title
      );

      if (index !== -1) {
        existingGames[index] = gameData;
        await updateDoc(userGameRef, { games: existingGames });
        isNewGame = false;
      } else {
        await updateDoc(userGameRef, {
          games: [...existingGames, gameData],
        });
      }
    } else {
      await setDoc(userGameRef, {
        games: [gameData],
      });
    }

    if (isNewGame) {
      const userProfilRef = doc(db, "userProfil", user.uid);
      const userProfilSnap = await getDoc(userProfilRef);

      let newTotalAchievements = parseInt(trophiesUnlocked);
      let newGamesPlayed = 1;

      if (userProfilSnap.exists()) {
        const existingData = userProfilSnap.data();
        newTotalAchievements += existingData.totalAchievements || 0;
        newGamesPlayed += existingData.gamesPlayed || 0;
      }

      const maxTrophies = 100 * newGamesPlayed;
      const achievementCompletion = Math.round(
        (newTotalAchievements / maxTrophies) * 100
      );

      await setDoc(userProfilRef, {
        gamesPlayed: newGamesPlayed,
        totalAchievements: newTotalAchievements,
        achievementCompletion,
      });
    }

    setRating(0);
    setReview("");
    setTrophiesUnlocked("");
    setHoursPlayed("");

    setRefreshGames((prev) => !prev);

    setButtonAnimated(true);

    setTimeout(() => {
      setButtonAnimated(false);
      handleClose();
    }, 2000);
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <style>{`.btn-close { filter: invert(1); }`}</style>

      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton className="bg-dark text-light">
          <div className="d-flex align-items-center gap-3">
            <img
              src={game?.background_image || witcherThumbnail}
              alt="Game Thumbnail"
              className="img-fluid rounded"
              style={{ width: "100px", height: "150px", objectFit: "cover" }}
            />
            <div className="d-flex flex-column text-center">
              <h2 className="fw-bold m-0">{game?.name || "Unknown Game"}</h2>
              <h6 className="text-secondary">
                Publisher:{" "}
                {game?.publishers
                  ? game.publishers.map((p) => p.name).join(", ")
                  : "Unknown"}
              </h6>
              <h6 className="text-secondary">
                Genre:{" "}
                {game?.genres
                  ? game.genres.map((g) => g.name).join(", ")
                  : "Unknown"}
              </h6>
              <h6 className="text-secondary">
                Platform:{" "}
                {game?.parent_platforms
                  ? game.parent_platforms
                      .map((pp) => pp.platform.name)
                      .join(", ")
                  : "Unknown"}
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
              placeholder="Write your review here..."
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
            <button
              type="submit"
              className="btn btn-lg w-100"
              style={{
                background: buttonAnimated
                  ? "linear-gradient(90deg, #28a745, #57f58b)"
                  : "linear-gradient(90deg, #7f57f5, #e157f5)",
                border: "none",
                color: "white",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
              disabled={buttonAnimated}
            >
              {buttonAnimated ? "✔️ Game Added!" : "Add Game"}
            </button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
