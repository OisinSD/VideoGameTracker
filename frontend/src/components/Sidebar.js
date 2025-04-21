import React, { forwardRef } from "react";
// import { Link } from "react-router-dom";
import "../assets/styles/Sidebar.css";



import {
  House,
  CollectionPlay,
  BoxArrowRight,
  HourglassSplit,
  PersonCircle,
  Joystick,
} from "react-bootstrap-icons";

const Sidebar = forwardRef(({ onLogout, onSelectSection }, ref) => {
  return (
      <div className="sidebar" ref={ref}>

          <button className="sidebar-link" onClick={() => onSelectSection("home")}>
              <House className="icon"/>
              <span>Home</span>
          </button>

          <button
              className="sidebar-link"
              onClick={() => onSelectSection("playing")}
          >
              <HourglassSplit className="icon"/>
              <span>Currently Playing</span>
          </button>

          <button
              className="sidebar-link"
              onClick={() => onSelectSection("library")}
          >
              <CollectionPlay className="icon"/>
              <span>Finished Games</span>
          </button>

          <button
              className="sidebar-link"
              onClick={() => onSelectSection("allGames")}
          >
              <Joystick className="icon"/>
              <span>All Games</span>
          </button>

          <button
              className="sidebar-link"
              onClick={() => onSelectSection("profile")}
          >
              <PersonCircle className="icon"/>
              <span>Profile</span>
          </button>

          <button className="sidebar-link" onClick={onLogout}>
              <BoxArrowRight className="icon"/>
              <span>Logout</span>
          </button>
      </div>
  );
});

export default Sidebar;
