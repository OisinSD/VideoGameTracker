import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Joystick } from "react-bootstrap-icons";
import GameCardNoButtons from "./GameCardNoButtons";
import GameInfo from "./GameInfo";

const API_KEY = "e784bf5f8e30437686ea67247443042d";

const AllGamesPage = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const [sortOrder, setSortOrder] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");

  const handleCardClick = async (gameId) => {
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

  const fetchGames = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${pageNum}`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setGames((prev) => [...prev, ...data.results]);
        setHasMore(Boolean(data.next));
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching games:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (bottomReached && !loading && hasMore) {
        setPage((p) => p + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  let displayed = [...games];
  if (platformFilter) {
    displayed = displayed.filter((g) =>
      g.parent_platforms?.some((p) =>
        p.platform.name.toLowerCase().includes(platformFilter.toLowerCase())
      )
    );
  }
  if (sortOrder === "newest") {
    displayed.sort((a, b) => new Date(b.released) - new Date(a.released));
  } else if (sortOrder === "oldest") {
    displayed.sort((a, b) => new Date(a.released) - new Date(b.released));
  }

  return (
    <div className="home-page">
      <Container fluid className="mt-4 px-4">
        {/* Title */}
        <div className="d-flex align-items-center justify-content-center bg-dark py-3 mb-3 border-bottom border-light">
          <Joystick className="me-2" size={24} color="white" />
          <h2
            className="fw-semibold text-capitalize m-0"
            style={{ fontSize: "1.75rem" }}
          >
            All Games
          </h2>
        </div>

        {/* Sort & Filter Controls */}
        <div className="d-flex gap-3 justify-content-end mb-4">
          <select
            className="form-select bg-dark text-white border-light"
            style={{ width: "180px" }}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Release date</option>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>

          <select
            className="form-select bg-dark text-white border-light"
            style={{ width: "180px" }}
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
          >
            <option value="">Platforms</option>
            <option value="pc">PC</option>
            <option value="playstation">PlayStation</option>
            <option value="xbox">Xbox</option>
          </select>
        </div>

        {/* Gamecard display */}
        <div className="game-container">
          {displayed.map((game) => (
            <GameCardNoButtons
              key={game.id}
              game={{
                id: game.id,
                title: game.name,
                rating: game.rating || 0,
                poster: game.background_image,
                trophiesUnlocked: 0,
              }}
              onClick={() => handleCardClick(game.id)}
            />
          ))}
        </div>

        {/* loading... */}
        {loading && (
          <div className="text-center text-light my-4">
            <Spinner animation="border" variant="light" />
            <div>Loading more games...</div>
          </div>
        )}
      </Container>

      {/* Game Info Modal */}
      <GameInfo
        show={showInfoModal}
        handleClose={() => setShowInfoModal(false)}
        game={selectedGame}
      />
    </div>
  );
};

export default AllGamesPage;
