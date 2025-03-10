import React from "react";
import "../App.css";
// import "./SearchResults.css"

export const SearchResults = ({ results, input, value }) => {
    
    if(input && results.length === 0){
        return <div>No Results Found</div>;
    }


    return (
        <div className="results-list">
            {results.map((result, id) => {
            return(
                 <div key={id}>
                    {result.name}
                </div>
            );
        })}
        </div>
    );
};