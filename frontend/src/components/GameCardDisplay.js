import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../authentication/firebaseConfig";
import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import Combined from "./Combined";
import EditGameModal from "./EditGameModal";

const GameCardDisplay = ({ refreshTrigger, viewSection, showToast, limit }) => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [gameBeingEdited, setGameBeingEdited] = useState(null);
  const [refreshGames, setRefreshGames] = useState(false);
  const [deletedCardId, setDeletedCardId] = useState(null);
  const [fullCombined, setFullCombined] = useState([]);

  const handleCloseAllModals = () => {
    setShowEditModal(false);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchUserGames = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const userGamesRef = doc(db, "userGames", user.uid);
      const docSnap = await getDoc(userGamesRef);

      if (docSnap.exists()) {
        const userGames = docSnap.data().games || [];
        setGames(userGames);
      } else {
        setGames([]);
      }
    };

    fetchUserGames();
  }, [refreshTrigger, refreshGames]);

  const playingGames = games.filter((game) => game.currentlyPlaying);
  const libraryGames = games.filter((game) => !game.currentlyPlaying);

  const handleCardClick = async (game) => {
    const API_KEY = "e784bf5f8e30437686ea67247443042d";
    try {
      console.log("gameid: ", game.gameID);
      const combinedData = await fetch(
        `https://api.rawg.io/api/games/${game.gameID}?key=${API_KEY}`
      );
      if (!combinedData.ok) throw new Error("Failed to fetch game details");
      const fullCombinedData = await combinedData.json();
      setFullCombined(fullCombinedData);
      console.log("test", fullCombinedData);
    } catch (error) {
      console.error("Error fetching full data details: ", error);
    }

    if (deletedCardId === game.title) return;
    setSelectedGame(game);
    setShowModal(true);
  };

  const handleDeleteGame = async (gameToDelete) => {
    setDeletedCardId(gameToDelete.title);

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userGamesRef = doc(db, "userGames", user.uid);
    const userProfilRef = doc(db, "userProfil", user.uid);

    const updatedGames = games.filter(
      (game) =>
        !(
          game.title === gameToDelete.title &&
          game.category === gameToDelete.category &&
          game.rating === gameToDelete.rating
        )
    );

    try {
      await updateDoc(userGamesRef, { games: updatedGames });

      const profileSnap = await getDoc(userProfilRef);
      if (profileSnap.exists()) {
        const profileData = profileSnap.data();

        const updatedGamesPlayed = Math.max(
          (profileData.gamesPlayed || 1) - 1,
          0
        );
        const updatedTotalAchievements = Math.max(
          (profileData.totalAchievements || 0) -
            (gameToDelete.trophiesUnlocked || 0),
          0
        );

        const maxTrophies = 100 * updatedGamesPlayed;
        const updatedAchievementCompletion = maxTrophies
          ? Math.round((updatedTotalAchievements / maxTrophies) * 100)
          : 0;

        await updateDoc(userProfilRef, {
          gamesPlayed: updatedGamesPlayed,
          totalAchievements: updatedTotalAchievements,
          achievementCompletion: updatedAchievementCompletion,
        });
      }

      setTimeout(() => {
        setGames(updatedGames);
        setDeletedCardId(null);
      }, 1500);
    } catch (error) {
      console.error("Failed to delete game:", error);
    }
  };

  const handleEditClick = (game) => {
    setGameBeingEdited(game);
    setShowEditModal(true);
  };

  const handleSaveEditedGame = async (updatedGame) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userGamesRef = doc(db, "userGames", user.uid);
    const userProfilRef = doc(db, "userProfil", user.uid);

    const originalGame = games.find(
      (g) =>
        g.title === updatedGame.title && g.category === updatedGame.category
    );

    const updatedGames = games.map((g) =>
      g.title === updatedGame.title && g.category === updatedGame.category
        ? updatedGame
        : g
    );

    try {
      await updateDoc(userGamesRef, { games: updatedGames });

      if (
        originalGame &&
        originalGame.trophiesUnlocked !== updatedGame.trophiesUnlocked
      ) {
        const profileSnap = await getDoc(userProfilRef);
        if (profileSnap.exists()) {
          const profileData = profileSnap.data();
          const oldTrophies = originalGame.trophiesUnlocked || 0;
          const newTrophies = updatedGame.trophiesUnlocked || 0;
          const diff = newTrophies - oldTrophies;

          const updatedTotalAchievements =
            (profileData.totalAchievements || 0) + diff;
          const gamesPlayed = profileData.gamesPlayed || updatedGames.length;
          const maxTrophies = 100 * gamesPlayed;
          const updatedAchievementCompletion = maxTrophies
            ? Math.round((updatedTotalAchievements / maxTrophies) * 100)
            : 0;

          await updateDoc(userProfilRef, {
            totalAchievements: updatedTotalAchievements,
            achievementCompletion: updatedAchievementCompletion,
          });
        }
      }

      setGames(updatedGames);
      setSelectedGame(updatedGame);
    } catch (error) {
      console.error("Failed to update game:", error);
    }
  };

  return (
    <>
      <section className="game-section">
        <div className="bg-dark text-white py-4 text-center shadow-sm border-bottom mt-4">
          <h2
            className="fw-semibold text-capitalize m-0"
            style={{ letterSpacing: "0.5px", fontSize: "1.75rem" }}
          >
            <i
              className={`bi ${
                viewSection === "playing"
                  ? "bi-hourglass-split"
                  : "bi-controller"
              } me-2`}
            ></i>
            {viewSection === "playing" ? "Currently Playing" : "Finished Games"}
          </h2>
        </div>

        <div className="game-container">
          {(viewSection === "playing" ? playingGames : libraryGames).length >
          0 ? (
            (viewSection === "playing" ? playingGames : libraryGames)
              .slice(0, limit || 999)
              .map((game, index) => (
                <GameCard
                  key={index}
                  game={game}
                  isDeleted={deletedCardId === game.title}
                  onClick={() => handleCardClick(game)}
                  onDelete={handleDeleteGame}
                  onEdit={handleEditClick}
                />
              ))
          ) : (
            <p className="text-light text-center">
              {viewSection === "playing"
                ? "No games currently being played."
                : "No games finished yet."}
            </p>
          )}
        </div>
      </section>

      <Combined
        show={showModal}
        handleClose={() => setShowModal(false)}
        game={selectedGame}
        fulldata={fullCombined}
      />
      <EditGameModal
        show={showEditModal}
        handleClose={handleCloseAllModals}
        game={gameBeingEdited}
        onSave={handleSaveEditedGame}
        setRefreshGames={setRefreshGames}
      />
    </>
  );
};

export default GameCardDisplay;
