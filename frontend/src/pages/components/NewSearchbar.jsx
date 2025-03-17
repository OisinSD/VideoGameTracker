import React, { useState } from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import "./NewSearch.css";
import { fetchGames } from "../../API/api"; // Import the function


export const NewSearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");


    const handleChange = async (value) => {
        setInput(value);
        if (value.trim() !== "") {
            const results = await fetchGames(value);
            setResults(results); // Store the game results
        } else {
            setResults([]); // Clear results if input is empty
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
    }


    return (
        <div className="input-wrapper">
            <SearchOutlined id="search-icon" />
            <input className="my-input" id="GameInput"
                placeholder="Search Game..." 
                value={input} 
                onChange={(e) => handleChange(e.target.value)}
            />
            <CloseOutlined onClick={clearInput} id="search-icon2" />
        </div>
    );
};