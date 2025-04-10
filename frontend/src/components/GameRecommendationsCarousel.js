import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import GameCard from "./GameCard";

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const API_KEY = "e784bf5f8e30437686ea67247443042d";

const GameRecommendationsCarousel = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetch(
                    `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-rating&page_size=10`
                );
                if (!response.ok) throw new Error("Failed to fetch recommendations");

                const data = await response.json();

                const formatted = data.results.map((game) => ({
                    title: game.name,
                    genre: game.genres?.[0]?.name || "Unknown",
                    rating: Math.round(game.rating),
                    trophies: 0,
                    poster: game.background_image,
                }));

                setRecommendations(formatted);
            } catch (error) {
                console.error("Error fetching recommended games:", error);
            }
        };

        fetchRecommendations();
    }, []);

    if (!recommendations.length) return null;

    return (
        <div className="container-fluid px-0">
            <div className="bg-secondary text-white py-3 w-100 text-center">
                <h2 className="fw-bold text-uppercase">🎯 Game Recommendations</h2>
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
                    itemClass="carousel-item-padding-20-px"  // 👈 add this class!
                >

                {recommendations.map((game, index) => (
                        <GameCard key={index} game={game} />
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default GameRecommendationsCarousel;
