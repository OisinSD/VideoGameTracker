import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; /*import AppWithHomePage from "./pages/AppWithHomePage";   Change to run home page*/
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />); /*Change App to AppWithHomePage to run home page*/
