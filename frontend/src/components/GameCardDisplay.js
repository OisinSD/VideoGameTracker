import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../authentication/firebaseConfig";
import { fetchGames as fetchRawgGames } from "../API/api";
import GameList from "./GameList";

const GameCardDisplay = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the currently logged-in user
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
          console.error("No user is logged in.");
          return;
        }

        // Use the current user's UID as the document ID in "gameReviews"
        const docRef = doc(db, "gameReviews", user.uid);
        const docSnap = await getDoc(docRef);

        let firestoreRating = 0;
        if (docSnap.exists()) {
          const data = docSnap.data();
          // We'll only take the "rating" from Firestore
          firestoreRating = data.rating || 0;
        } else {
          console.log("No game review document found for this user.");
        }

        // Fetch RAWG data (an array of games)
        const rawgData = await fetchRawgGames();

        // Map RAWG data to our schema, but override the rating on the FIRST RAWG game with Firestore's value.
        const mappedGames = rawgData.map((rawgGame, index) => {
          const rating = index === 0 ? firestoreRating : rawgGame.rating || 0;
          return {
            id: rawgGame.id,
            title: rawgGame.name,
            category:
              rawgGame.genres && rawgGame.genres.length > 0
                ? rawgGame.genres[0].name
                : "Unknown",
            rating: rating,
            trophies: rawgGame.trophies || 0,
            poster: rawgGame.background_image || null, // Use the RAWG background image as the poster
          };
        });

        // Only display the first 6 games
        const sixGames = mappedGames.slice(0, 6);

        setGames(sixGames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <GameList games={games} />;
};

export default GameCardDisplay;
