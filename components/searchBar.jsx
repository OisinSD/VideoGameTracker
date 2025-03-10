import React, {useState} from "react";
import {SearchOutlined} from "@ant-design/icons";
import "../App.css";


export const SearchBar = ({ setResults }) => {

    const [input, setInput] = useState("");

    /* this is making a request to the api *///this is a fake api for now  (async)
    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
            const results = json.filter((user) => {
                return value && 
                user && 
                user.name && 
                user.name.toLowerCase().includes(value.toLowerCase());
            });
            console.log(results);
            setResults(results);
        });
    };

    /* when a new input is made by a user this will reset the setInput Value and call make a request function*/ 
    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    };


//     const getAccessToken = async () => {
//         const clientId = "buahygeby7imyd1ge2fjm0jkhpwc90"; // Replace with your actual Client ID
//         const clientSecret = "izwvo1i50mi5mf0l88928alo90lqwn"; // Replace with your actual Client Secret
    
//         const response = await fetch(`https://id.twitch.tv/oauth2/token`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: new URLSearchParams({
//                 client_id: clientId,
//                 client_secret: clientSecret,
//                 grant_type: "client_credentials",
//             }),
//         });
//         const data = await response.json();
//     return data.access_token; // This is the token you need for IGDB requests
// };


    return (
        <div className="input-wrapper">
            <SearchOutlined id="search-icon" />
            <input 
            placeholder="Search Game..." 
            value={input} 
            onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};