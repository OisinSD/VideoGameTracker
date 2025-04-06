import React, { useState } from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import "../assets/styles/NewSearch.css";
import { fetchGames } from "../API/api";

export const NewSearchBar = ({ setResults, results, triggerGameInfo }) => {
  const [input, setInput] = useState("");

  const handleChange = async (value) => {
    setInput(value);
    if (value.trim() !== "") {
      const results = await fetchGames(value);
      setResults(results);
    } else {
      setResults([]);
    }
  };

  /* This is a test - if input is null results should be null */
  // const myInput = document.getElementById("GameInput").innerHTML;
  //     if(myInput.length === 0){
  //         results.value = []; // if this does not work - change to "result"
  //     }

  const clearInput = () => {
    setInput("");
    setResults([]);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (input.trim() === "") return;

      const firstGame = results[0];
      triggerGameInfo(firstGame);
    }
  };

  return (
    <div className="input-wrapper">
      <SearchOutlined id="search-icon" />
      <input
        className="my-input"
        id="GameInput"
        placeholder="Search Game..."
        autoComplete="off"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <CloseOutlined onClick={clearInput} id="search-icon2" />
    </div>
  );
};
