// import React, { useState } from "react";
// import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
// import "../assets/styles/NewSearch.css";
// import { fetchGames } from "../API/api";

// export const NewSearchBar = ({ setResults, results, triggerGameInfo, onSelectGame }) => {
//   const [input, setInput] = useState("");

//   const handleChange = async (value) => {
//     setInput(value);
//     if (value.trim() !== "") {
//       const results = await fetchGames(value);
//       setResults(results);
//     } else {
//       setResults([]);
//     }
//   };

//   const clearInput = () => {
//     setInput("");
//     setResults([]);
//   };

// const fetchGame = async (myGameID) => {
//       const API_KEY = "e784bf5f8e30437686ea67247443042d";
//       let url2 =  `https://api.rawg.io/api/games/${myGameID}?key=${API_KEY}`
      
//       try{
//          const response = await fetch(url2);
//          if(!response.ok) throw new Error("Failed to fetch game info");
//          const gameInfo = await response.json();
  
//         console.log("Full game info", gameInfo);
//         triggerGameInfo(gameInfo);
//       }catch(error){
//           console.log("Error fetching Enter button game info:", error);
//       }
//   }
  
//   const handleKeyDown = async (e) => {
//     if (e.key === "Enter") {
//       if (input.trim() === "") return;

//       const firstGame = results[0];
//       console.log("First game Data", firstGame);
//       fetchGame(firstGame.id);
//     }
//   };

//   return (
//     <div className="input-wrapper">
//       <SearchOutlined id="search-icon" />
//       <input
//         className="my-input"
//         id="GameInput"
//         placeholder="Search Game..."
//         autoComplete="off"
//         value={input}
//         onChange={(e) => handleChange(e.target.value)}
//         onKeyDown={handleKeyDown}
//       />
//       <CloseOutlined onClick={clearInput} id="search-icon2" />
//     </div>
//   );
// };

import React, { useState } from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { fetchGames } from "../API/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/NewSearch.css"

export const NewSearchBar = ({ setResults, results, triggerGameInfo }) => {
  const [input, setInput] = useState("");

  
  const clearInput = () => {
    setInput("");
    setResults([]);
  };
  
  const fetchGame = async (gameId) => {
    const API_KEY = "e784bf5f8e30437686ea67247443042d";
    const url = `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch game info");
      const gameInfo = await response.json();
      triggerGameInfo(gameInfo);
    } catch (error) {
      console.error("Error fetching game:", error);
    }
  };
  
  const handleChange = async (value) => {
    setInput(value);
    if (value.trim() !== "") {
      const results = await fetchGames(value);
      setResults(results);
    } else {
      setResults([]);
    }
  };
  
  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && input.trim() !== "" && results.length > 0) {
      fetchGame(results[0].id);
    }
  };

  return (
    <div className="search-bar-container d-flex justify-content-center ">
      <div className="input-group bg-dark rounded shadow-sm" style={{ height: "2.5rem", width: "100%" }}>
        <span className="input-group-text bg-transparent border-0 text-white">
          <SearchOutlined />
        </span>
        <input
          type="text"
          className="form-control bg-transparent border-0 text-white custom-placeholder"
          placeholder="Search Game..."
          autoComplete="off"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ color: "white"}}
        />
        {input && (
          <span
            className="input-group-text bg-transparent border-0 text-white"
            role="button"
            onClick={clearInput}
          >
            <CloseOutlined />
          </span>
        )}
      </div>
    </div>
  );
}