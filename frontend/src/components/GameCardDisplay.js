import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../authentication/firebaseConfig";
import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import Combined from "../components/Combined";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { updateDoc } from "firebase/firestore";
import EditGameModal from "./EditGameModal";

const GameCardDisplay = ({ refreshTrigger }) => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [gameBeingEdited, setGameBeingEdited] = useState(null);
  const [refreshGames, setRefreshGames] = useState(false);
  const handleCloseAllModals = () => {
    setShowEditModal(false);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchUserGames = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.log("No user is logged in.");
        return;
      }

      const userGamesRef = doc(db, "userGames", user.uid);
      const docSnap = await getDoc(userGamesRef);

      if (docSnap.exists()) {
        const userGames = docSnap.data().games || [];
        setGames(userGames);
      } else {
        console.log("No games found for this user.");
        setGames([]);
      }
    };

    fetchUserGames();
  }, [refreshTrigger, refreshGames]);

  const playingGames = games.filter((game) => game.currentlyPlaying);
  const libraryGames = games.filter((game) => !game.currentlyPlaying);

  const handleCardClick = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const handleDeleteGame = async (gameToDelete) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${gameToDelete.title}"?`
    );
    if (!confirmed) return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userGamesRef = doc(db, "userGames", user.uid);
    const updatedGames = games.filter(
      (game) =>
        !(
          game.title === gameToDelete.title &&
          game.category === gameToDelete.category &&
          game.rating === gameToDelete.rating
        )
    );

    try {
      await updateDoc(userGamesRef, {
        games: updatedGames,
      });
      setGames(updatedGames);
    } catch (error) {
      console.error("Failed to delete game:", error);
    }
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleSaveEditedGame = async (updatedGame) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const userGamesRef = doc(db, "userGames", user.uid);
    const updatedGames = games.map((g) =>
      g.title === updatedGame.title && g.category === updatedGame.category
        ? updatedGame
        : g
    );

    try {
      await updateDoc(userGamesRef, {
        games: updatedGames,
      });
      setGames(updatedGames); // UI update
      setSelectedGame(updatedGame);
    } catch (error) {
      console.error("Failed to update game:", error);
    }
  };

  return (
    <>
      <section className="game-section">
        {/* {!showLibraryOnly && ( */}
        <>
          <div className="bg-dark text-white py-4 text-center shadow-sm border-bottom mt-4">
            <h2
              className="fw-semibold text-capitalize m-0"
              style={{ letterSpacing: "0.5px", fontSize: "1.75rem" }}
            >
              <i className="bi bi-hourglass-split me-2"></i>Currently Playing
            </h2>
          </div>

          <div className="game-container">
            {libraryGames.length > 0 ? (
              libraryGames.map((game, index) => (
                <GameCard
                  key={index}
                  game={game}
                  onClick={() => handleCardClick(game)}
                  onDelete={handleDeleteGame}
                  onEdit={handleEditClick}
                />
              ))
            ) : (
              <p className="text-light text-center">No games finished yet</p>
            )}
          </div>
        </>
        )}
      </section>

      {/* Modal for Game Info */}
      <Combined
        show={showModal}
        handleClose={() => setShowModal(false)}
        game={selectedGame}
        handleDelete={handleDeleteGame}
        onEdit={() => {
          setGameBeingEdited(selectedGame);
          handleEditClick();
        }}
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
