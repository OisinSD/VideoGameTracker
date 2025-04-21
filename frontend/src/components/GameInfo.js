import { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { db } from "../authentication/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default function GameInfo({
  show,
  handleClose,
  handleAddData,
  triggerAddGame,
  game,
  setRefreshGames,
}) {
  const [review, setReview] = useState("");
  const [hoursPlayed, setHoursPlayed] = useState("");
  const [rating, setRating] = useState(0);
  const [addedToPlaying, setAddedToPlaying] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const checkIfGameAdded = async () => {
      setAddedToPlaying(false);
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user || !game) return;

      const userGameRef = doc(db, "userGames", user.uid);
      const docSnap = await getDoc(userGameRef);

      if (docSnap.exists()) {
        const existingGames = docSnap.data().games || [];
        const alreadyExists = existingGames.some(
          (existingGame) => existingGame.title === game.name
        );
        if (alreadyExists) {
          setAddedToPlaying(true);
        }
      }
    };

    checkIfGameAdded();
  }, [game]);

  if (!game) return null;

  const removeHTML = (htmlString) => {
    let tmp = document.createElement("div");
    tmp.innerHTML = htmlString;
    return tmp.textContent || tmp.innerText || "";
  };

  const cleanedDescription = game.description
    ? removeHTML(game.description)
    : "No description available.";
  const shortDescription =
    cleanedDescription.length > 500
      ? cleanedDescription.slice(0, 500) + "... "
      : cleanedDescription;

  const handleAddToPlaying = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const gameData = {
      title: game?.name || "Unknown Game",
      poster: game?.background_image || "",
      category: game?.genres?.[0]?.name || "Unknown",
      rating: 0,
      review: "",
      trophiesUnlocked: 0,
      hoursPlayed: 0,
      currentlyPlaying: true,
      addedAt: new Date(),
    };

    try {
      const userGameRef = doc(db, "userGames", user.uid);
      const docSnap = await getDoc(userGameRef);

      let existingGames = [];

      if (docSnap.exists()) {
        existingGames = docSnap.data().games || [];

        const alreadyExists = existingGames.some(
          (existingGame) => existingGame.title === gameData.title
        );

        if (alreadyExists) {
          return;
        }
      }

      await setDoc(userGameRef, {
        games: [...existingGames, gameData],
      });

      const userProfilRef = doc(db, "userProfil", user.uid);
      const userProfilSnap = await getDoc(userProfilRef);

      let newTotalAchievements = 0;
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

      setAddedToPlaying(true);
      setRefreshGames((prev) => !prev);
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <style>
        {`
          .btn-close {
            filter: invert(1); 
          }
        `}
      </style>

      <Form>
        <Modal.Header closeButton className="bg-dark text-light">
          <div className="d-flex align-items-center gap-3">
            <img
              src={game.background_image}
              alt="Game Thumbnail"
              className="img-fluid rounded"
              style={{ width: "100px", height: "150px", objectFit: "cover" }}
            />
            <div className="d-flex flex-column text-center">
              <h2 className="fw-bold m-0">{game.name}</h2>
              <h6 className="text-secondary">
                Publisher:{" "}
                {game.publishers
                  ? game.publishers.map((p) => p.name).join(", ")
                  : "Unknown"}
              </h6>
              <h6 className="text-secondary">
                Genre:{" "}
                {game.genres
                  ? game.genres.map((g) => g.name).join(", ")
                  : "Unknown"}
              </h6>
              <h6 className="text-secondary">
                Platform:{" "}
                {game.parent_platforms
                  ? game.parent_platforms
                      .map((pp) => pp.platform.name)
                      .join(", ")
                  : "Unknown"}
              </h6>
              <h6 className="text-secondary">Release Date: {game.released}</h6>
            </div>
          </div>
        </Modal.Header>

        <Modal.Body className="bg-dark text-light">
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
            <h6>
              Metacritic Score 📈: {game.metacritic ? game.metacritic : "N/A"}
            </h6>
          </Form.Group>

          <div className="d-flex justify-content-between gap-3">
            <Button
              type="button"
              className="btn btn-lg w-100 d-flex justify-content-center align-items-center gap-2"
              style={{
                background: addedToPlaying
                  ? "linear-gradient(90deg, #28a745, #28a745)"
                  : "linear-gradient(90deg, #7f57f5, #e157f5)",
                border: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (!addedToPlaying)
                  e.currentTarget.style.background =
                    "linear-gradient(90deg, #9357f5, #f157f5)";
              }}
              onMouseLeave={(e) => {
                if (!addedToPlaying)
                  e.currentTarget.style.background =
                    "linear-gradient(90deg, #7f57f5, #e157f5)";
              }}
              onClick={handleAddToPlaying}
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
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #9357f5, #f157f5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #7f57f5, #e157f5)";
              }}
              onClick={() => {
                triggerAddGame({
                  review,
                  rating,
                  hoursPlayed,
                  trophiesUnlocked: game.parent_achievements_count || 0,
                });
              }}
            >
              Add to Finished
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
