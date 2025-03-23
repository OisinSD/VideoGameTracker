import React from "react";
import "../assets/styles/NewSearch.css";

export const SearchResults = ({ results, input, value }) => {
  let MyClass = "";
  if (results.length > 0) {
    MyClass = "results-list";
  } else {
    MyClass = "NOresults-list";
  }

  const shortenText = (text, maxLen) => {
    if (text.length <= maxLen) {
      return text;
    }
    return text.slice(0, maxLen) + "...";
  };

  return (
    <div className={MyClass}>
      {results.map((result, id) => {
        return (
          <div key={id} className="results-game-card">
            {result.background_image && (
              <img
                src={result.background_image}
                alt={results.name}
                className="game-image"
              />
            )}
            <h3 className="game-name-info">{shortenText(result.name, 20)}</h3>
            {/* <h3 className="game-info">{result.rating}/5</h3> */}
          </div>
        );
      })}
    </div>
  );
};
