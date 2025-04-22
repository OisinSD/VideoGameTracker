import React, { forwardRef } from "react";
import { Nav, Button } from "react-bootstrap";
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
    <Nav className="sidebar flex-column" ref={ref}>
      <Button
        variant="link"
        className="sidebar-link text-start"
        onClick={() => onSelectSection("home")}
      >
        <House className="icon" />
        <span>Home</span>
      </Button>

      <Button
        variant="link"
        className="sidebar-link text-start"
        onClick={() => onSelectSection("playing")}
      >
        <HourglassSplit className="icon" />
        <span>Currently Playing</span>
      </Button>

      <Button
        variant="link"
        className="sidebar-link text-start"
        onClick={() => onSelectSection("library")}
      >
        <CollectionPlay className="icon" />
        <span>Finished Games</span>
      </Button>

      <Button
        variant="link"
        className="sidebar-link text-start"
        onClick={() => onSelectSection("allGames")}
      >
        <Joystick className="icon" />
        <span>All Games</span>
      </Button>

      <Button
        variant="link"
        className="sidebar-link text-start"
        onClick={() => onSelectSection("profile")}
      >
        <PersonCircle className="icon" />
        <span>Profile</span>
      </Button>

      <Button
        variant="link"
        className="sidebar-link text-start"
        onClick={onLogout}
      >
        <BoxArrowRight className="icon" />
        <span>Logout</span>
      </Button>
    </Nav>
  );
});

export default Sidebar;
