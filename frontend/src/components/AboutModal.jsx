import React from "react";
import { Modal, Button } from "react-bootstrap";

const AboutModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-light">
        <h2 className="fw-bold m-0">About Us 🎮</h2>
      </Modal.Header>

      <Modal.Body className="bg-dark text-light">
        <p className="mb-3">
          Quest Log is a platform where gamers can track their gaming achievements 
          and discover new challenges. We are dedicated to providing an engaging and 
          secure multi-platform experience for every player.
        </p>

        <Button
          onClick={handleClose}
          className="w-100"
          style={{
            background: "linear-gradient(90deg, #7f57f5, #e157f5)",
            border: "none",
          }}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default AboutModal;