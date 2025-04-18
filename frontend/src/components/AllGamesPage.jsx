import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Joystick } from "react-bootstrap-icons";
import GameCard from "./GameCard";

const API_KEY = "e784bf5f8e30437686ea67247443042d";

const AllGamesPage = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchGames = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${pageNum}`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setGames((prevGames) => [...prevGames, ...data.results]);
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
      const scrollBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200;

      if (scrollBottom && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="home-page">
      <Container fluid className="mt-4 px-4">
        {/* Title */}
        <div className="d-flex align-items-center justify-content-center bg-dark py-3 mb-4 border-bottom border-light">
          <Joystick className="me-2" size={24} color="white" />
          <h2
            className="fw-semibold text-capitalize m-0"
            style={{ fontSize: "1.75rem" }}
          >
            All Games
          </h2>
        </div>

        {/* Gamecard display */}
        <div className="game-container">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={{
                id: game.id,
                title: game.name,
                rating: game.rating || 0,
                poster: game.background_image,
                trophiesUnlocked: 0,
              }}
              onClick={() => console.log("Clicked:", game.name)}
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
    </div>
  );
};

export default AllGamesPage;
