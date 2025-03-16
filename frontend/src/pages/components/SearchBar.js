// import React, { useState } from "react";
// import "../HomePage.css";

// const SearchBar = ({ onSearch, games = [] }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     onSearch(value);

//     console.log("Search Term:", value);
//     console.log("Games Data:", games);

//     if (!games || games.length === 0) {
//       console.warn("Warning: games is undefined or empty!");
//       setSearchResults([]);
//       return;
//     }

//     if (value.trim() === "") {
//       setSearchResults([]);
//     } else {
//       const filtered = games.filter((game) =>
//         game.title.toLowerCase().includes(value.toLowerCase())
//       );
//       console.log("Filtered Games:", filtered);
//       setSearchResults(filtered);
//     }
//   };

//   return (
//     <div className="search-container">
//       <input
//         type="text"
//         placeholder="Game Name"
//         value={searchTerm}
//         onChange={handleInputChange}
//       />
//       <button className="search-btn">Search</button>
//       {searchResults.length > 0 && (
//         <ul className="search-results">
//           {searchResults.map((game, index) => (
//             <li key={index} onClick={() => setSearchTerm(game.title)}>
//               {game.title}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchBar;
