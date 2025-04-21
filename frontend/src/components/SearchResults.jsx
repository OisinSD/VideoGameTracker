// import React, { useState } from "react";
// import "../assets/styles/NewSearch.css";
// import GameInfo from "./GameInfo";
// import AddGame from "../components/AddGame";

// export const SearchResults = ({ results, onSelectGame }) => {
//   const shortenText = (text, maxLen) => {
//     if (text.length <= maxLen) return text;
//     return text.slice(0, maxLen) + "...";
//   };

//   const API_KEY = "e784bf5f8e30437686ea67247443042d";

//   const handleGameClick = async (gameId) => {
//     try {
//       const response = await fetch(
//         `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`
//       );
//       if (!response.ok) throw new Error("Failed to fetch game details");
//       const fullGameData = await response.json();

//       onSelectGame(fullGameData);
//     } catch (error) {
//       console.error("Error fetching full game details:", error);
//     }
//   };

//   const MyClass = results.length > 0 ? "results-list" : "NOresults-list";

//   return (
//     <div className={MyClass}>
//       {results.map((result, id) => (
//         <div key={id} className="results-game-card">
//           {result.background_image && (
//             <img
//               src={result.background_image}
//               alt={result.name}
//               className="game-image"
//             />
//           )}
//           <h3
//             className="game-name-info"
//             onClick={() => handleGameClick(result.id)}
//           >
//             {shortenText(result.name, 25)}
//           </h3>
//         </div>
//       ))}
//     </div>
//   );
// };

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/NewSearch.css"

export const SearchResults = ({ results, onSelectGame }) => {
  const shortenText = (text, maxLen) =>
    text.length <= maxLen ? text : text.slice(0, maxLen) + "...";

  const API_KEY = "e784bf5f8e30437686ea67247443042d";

  const handleGameClick = async (gameId) => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
      if (!response.ok) throw new Error("Failed to fetch game details");
      const fullGameData = await response.json();
      console.log("full game info", fullGameData);
      onSelectGame(fullGameData);
    } catch (error) {
      console.error("Error fetching full game details:", error);
    }
  };

  if (results.length === 0) return null;


  
  return (
    <div className="d-flex justify-content-center mt-5 position-relative">
      <div
        className="rounded shadow-sm"
        style={{
          width: "50%",
          maxHeight: "170px",
          overflowY: "auto",
          background: "rgba(255, 255, 255, 0.8)",
          zIndex: 9999,
          position: "absolute",
        }}
        >
        {results.map((result, id) => (
          <div
          key={id}
          className="d-flex align-items-center px-3 py-2 border-bottom"
          style={{ cursor: "pointer" }}
          onClick={() => handleGameClick(result.id)}
          >
            {result.background_image && (
              <img
              src={result.background_image}
              alt={result.name}
              className="me-3 rounded"
              style={{ width: "50px", height: "60px", objectFit: "cover" }}
              />
            )}
            
            <span className="text-dark">{shortenText(result.name, 25)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
