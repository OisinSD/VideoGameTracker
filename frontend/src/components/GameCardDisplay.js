import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../authentication/firebaseConfig";
import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import Combined from "../components/Combined";
import "bootstrap-icons/font/bootstrap-icons.css";

const GameCardDisplay = ({ refreshTrigger }) => {
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [showModal, setShowModal] = useState(false);

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
    }, [refreshTrigger]);

    const playingGames = games.filter((game) => game.currentlyPlaying);
    const libraryGames = games.filter((game) => !game.currentlyPlaying);

    const handleCardClick = (game) => {
        setSelectedGame(game);
        setShowModal(true);
    };

    return (
        <section className="game-section">

            {/* Currently Playing Header */}
            <div className="bg-dark text-white py-4 text-center shadow-sm border-bottom mt-4">
                <h2 className="fw-semibold text-capitalize m-0" style={{ letterSpacing: "0.5px", fontSize: "1.75rem" }}>
                    <i className="bi bi-hourglass-split me-2"></i>Currently Playing
                </h2>
            </div>

            <div className="game-container">
                {playingGames.length > 0 ? (
                    playingGames.map((game, index) => (
                        <GameCard key={index} game={game} onClick={() => handleCardClick(game)} />
                    ))
                ) : (
                    <p className="text-light text-center">No games in progress</p>
                )}
            </div>

            {/* Game Library Header */}
            <div className="bg-dark text-white py-4 text-center shadow-sm border-bottom mt-4">
                <h2 className="fw-semibold text-capitalize m-0" style={{ letterSpacing: "0.5px", fontSize: "1.75rem" }}>
                    <i className="bi bi-collection me-2"></i>Game Library
                </h2>
            </div>

            <div className="game-container">
                {libraryGames.length > 0 ? (
                    libraryGames.map((game, index) => (
                        <GameCard key={index} game={game} onClick={() => handleCardClick(game)} />
                    ))
                ) : (
                    <p className="text-light text-center">No games finished yet</p>
                )}
            </div>

            {/* Modal for Game Info */}
            <Combined
                show={showModal}
                handleClose={() => setShowModal(false)}
                game={selectedGame}
            />
        </section>
    );
};

export default GameCardDisplay;
