import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GameCardNoButtons from "./GameCardNoButtons";
import "bootstrap-icons/font/bootstrap-icons.css";
import GameInfo from "./GameInfo";
import AddGame from "./AddGame"; //
import { getAuth } from "firebase/auth";
import { db } from "../authentication/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const API_KEY = "e784bf5f8e30437686ea67247443042d";

const GameRecommendationsCarousel = ({ setRefreshGames }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAddGameModal, setShowAddGameModal] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-added&dates=2025-01-01,2025-12-31&page_size=10`
        );
        if (!response.ok) throw new Error("Failed to fetch recommendations");

        const data = await response.json();
        const formatted = data.results.map((game) => ({
          id: game.id,
          title: game.name,
          rating: game.rating || 0,
          poster: game.background_image,
          trophiesUnlocked: 0,
        }));
        setRecommendations(formatted);
      } catch (error) {
        console.error("Error fetching recommended games:", error);
      }
    };

    fetchRecommendations();
  }, []);

  const handleGameSelect = async (gameId) => {
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`
      );
      const data = await res.json();
      setSelectedGame({
        id: data.id,
        name: data.name,
        rating: data.rating,
        background_image: data.background_image,
        description: data.description_raw || "No description available.",
        metacritic: data.metacritic || "N/A",
        parent_platforms: data.parent_platforms || [],
        publishers: data.publishers || [],
        genres: data.genres || [],
        released: data.released || "Unknown",
        parent_achievements_count: data.achievements_count || 0,
      });
      setShowInfoModal(true);
    } catch (error) {
      console.error("Failed to fetch game details:", error);
    }
  };

  const handleAddToLibrary = async ({
    review,
    rating,
    hoursPlayed,
    trophiesUnlocked,
  }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first.");
      return;
    }

    const gameData = {
      title: selectedGame.name,
      poster: selectedGame.background_image,
      category: selectedGame.genres?.[0]?.name ?? "Unknown",
      rating,
      review,
      trophiesUnlocked: parseInt(trophiesUnlocked, 10),
      hoursPlayed: parseInt(hoursPlayed, 10),
      addedAt: new Date(),
      currentlyPlaying: false,
      gameID: selectedGame.id,
    };

    const userGamesRef = doc(db, "userGames", user.uid);
    const snap = await getDoc(userGamesRef);
    let existingGames = snap.exists() ? snap.data().games || [] : [];

    const idx = existingGames.findIndex((g) => g.title === gameData.title);
    let isNewGame = true;
    if (idx !== -1) {
      existingGames[idx] = gameData;
      await updateDoc(userGamesRef, { games: existingGames });
      isNewGame = false;
    } else {
      if (snap.exists()) {
        await updateDoc(userGamesRef, {
          games: [...existingGames, gameData],
        });
      } else {
        await setDoc(userGamesRef, { games: [gameData] });
      }
    }

    if (isNewGame) {
      const userProfilRef = doc(db, "userProfil", user.uid);
      const profSnap = await getDoc(userProfilRef);
      let totalAchievements = parseInt(trophiesUnlocked, 10);
      let gamesPlayed = 1;
      if (profSnap.exists()) {
        const data = profSnap.data();
        totalAchievements += data.totalAchievements ?? 0;
        gamesPlayed += data.gamesPlayed ?? 0;
      }
      const maxTrophies = 100 * gamesPlayed;
      const achievementCompletion = Math.round(
        (totalAchievements / maxTrophies) * 100
      );
      await setDoc(userProfilRef, {
        gamesPlayed,
        totalAchievements,
        achievementCompletion,
      });
    }

    alert("Added to Library!");
    setRefreshGames((prev) => !prev);
    setShowInfoModal(false);
    setShowAddGameModal(false);
  };

  if (!recommendations.length) return null;

  return (
    <>
      <div className="bg-dark text-white py-4 text-center shadow-sm border-bottom">
        <h2
          className="fw-semibold text-capitalize m-0"
          style={{ letterSpacing: "0.5px", fontSize: "1.75rem" }}
        >
          <i className="bi bi-controller me-2"></i>Game Recommendations
        </h2>
      </div>

      <div className="container py-4">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2500}
          slidesToSlide={1}
          arrows={true}
          keyBoardControl={true}
          showDots={false}
          pauseOnHover={false}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-20-px"
        >
          {recommendations.map((game, index) => (
            <GameCardNoButtons
              key={index}
              game={game}
              onClick={() => handleGameSelect(game.id)}
            />
          ))}
        </Carousel>
      </div>

      {/* Game Info Modal */}
      {selectedGame && (
        <GameInfo
          show={showInfoModal}
          game={selectedGame}
          handleClose={() => setShowInfoModal(false)}
          setRefreshGames={setRefreshGames}
          triggerAddGame={() => setShowAddGameModal(true)}
        />
      )}

      {/* AddGame Modal */}
      {showAddGameModal && selectedGame && (
        <AddGame
          game={selectedGame}
          show={showAddGameModal}
          handleClose={() => setShowAddGameModal(false)}
          handleAddData={handleAddToLibrary}
          setRefreshGames={setRefreshGames}
          fromSearch={false}
        />
      )}
    </>
  );
};

export default GameRecommendationsCarousel;
