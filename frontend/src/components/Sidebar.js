import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Sidebar.css";

import {
  House,
  CollectionPlay,
  BoxArrowRight,
  HourglassSplit,
} from "react-bootstrap-icons";

const Sidebar = ({ onLogout, onSelectSection }) => {
  return (
    <div className="sidebar">
      <button className="sidebar-link" onClick={() => onSelectSection("home")}>
        <House className="icon" />
        <span>Home</span>
      </button>

      <button
        className="sidebar-link"
        onClick={() => onSelectSection("playing")}
      >
        <HourglassSplit className="icon" />
        <span>Currently Playing</span>
      </button>

      <button
        className="sidebar-link"
        onClick={() => onSelectSection("library")}
      >
        <CollectionPlay className="icon" />
        <span>Library</span>
      </button>

      <button className="sidebar-link" onClick={onLogout}>
        <BoxArrowRight className="icon" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
