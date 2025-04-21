import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { List } from "react-bootstrap-icons";

import { SearchResults } from "../components/SearchResults";
import AddGame from "../components/AddGame";
import GameInfo from "../components/GameInfo";
import ProfilePage from "../components/ProfilePage";
import { NewSearchBar } from "../components/NewSearchbar";
import "../assets/styles/HomePage.css";
import { signOut } from "firebase/auth";
import { auth } from "../authentication/firebaseConfig";
import GameCardDisplay from "../components/GameCardDisplay";
import GameRecommendationsCarousel from "../components/GameRecommendationsCarousel";
import PixelRunner from "../components/PixelRunner";
import Sidebar from "../components/Sidebar";
import AllGamesPage from "../components/AllGamesPage";
import { motion, AnimatePresence } from "framer-motion";

const HomePage = () => {
    const [results, setResults] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [addGameData, setAddGameData] = useState(null);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [refreshGames, setRefreshGames] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const sidebarRef = useRef(null);
    const [toastMessage, setToastMessage] = useState("");

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(""), 3000);
    };

    const triggerGameInfo = (game) => {
        setSelectedGame(game);
        setShowInfoModal(true);
    };

    const triggerAddGame = (extraData) => {
        setAddGameData(extraData);
        setShowInfoModal(false);
        setShowAddModal(true);
    };

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <motion.div
            className="home-page"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <header className="position-relative">
                <div className="banner-wrapper">
                    <div className="banner">
                        <div className="position-absolute top-0 start-0 m-3">
                            <Button
                                variant="light"
                                onClick={() => setSidebarVisible((v) => !v)}
                                style={{ opacity: 0.7, backgroundColor: "white", border: "none" }}
                            >
                                <List size={30} />
                            </Button>
                        </div>
                        <PixelRunner />
                        <div className="search-bar-container">
                            <NewSearchBar
                                setResults={setResults}
                                results={results}
                                triggerGameInfo={triggerGameInfo}
                            />
                            <SearchResults
                                results={results}
                                onSelectGame={triggerGameInfo}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {sidebarVisible && (
                <Sidebar
                    ref={sidebarRef}
                    onLogout={handleLogout}
                    onSelectSection={setActiveSection}
                />
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        marginLeft: sidebarVisible ? "220px" : "0px",
                        transition: "margin-left 0.3s ease",
                        padding: "20px",
                    }}
                >
                    {activeSection === "home" && (
                        <>
                            <GameRecommendationsCarousel />
                            <GameCardDisplay
                                refreshTrigger={refreshGames}
                                viewSection="playing"
                                showToast={showToast}
                            />
                            <GameCardDisplay
                                refreshTrigger={refreshGames}
                                viewSection="library"
                                showToast={showToast}
                            />
                        </>
                    )}
                    {activeSection === "playing" && (
                        <GameCardDisplay
                            refreshTrigger={refreshGames}
                            viewSection="playing"
                            showToast={showToast}
                        />
                    )}
                    {activeSection === "library" && (
                        <GameCardDisplay
                            refreshTrigger={refreshGames}
                            viewSection="library"
                            showToast={showToast}
                        />
                    )}
                    {activeSection === "allGames" && <AllGamesPage />}
                    {activeSection === "profile" && (
                        <ProfilePage refreshTrigger={refreshGames} />
                    )}
                </motion.div>
            </AnimatePresence>


            <AddGame
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                game={selectedGame}
                extraData={addGameData}
                setRefreshGames={setRefreshGames}
            />
            <GameInfo
                show={showInfoModal}
                handleClose={() => setShowInfoModal(false)}
                triggerAddGame={triggerAddGame}
                game={selectedGame}
                setRefreshGames={setRefreshGames}
            />

            {toastMessage && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        backgroundColor: "#28a745",
                        color: "white",
                        padding: "12px 20px",
                        borderRadius: "8px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                        zIndex: 9999,
                        fontWeight: "bold",
                        fontSize: "1rem",
                    }}
                >
                    {toastMessage}
                </div>
            )}
        </motion.div>
    );
};

export default HomePage;
