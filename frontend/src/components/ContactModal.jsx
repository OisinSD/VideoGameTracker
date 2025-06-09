import React from "react";
import { Modal, Button } from "react-bootstrap";

const ContactModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-light">
        <h2 className="fw-bold m-0">Contact Us 📞</h2>
      </Modal.Header>

      <Modal.Body className="bg-dark text-light">
        <p className="mb-3">
          Have questions, feedback, or need support? Reach out to us, and we'll
          get back to you as soon as possible.
        </p>
        <ul className="mb-4">
          <li>Email us at: support@questlog.com</li>
          <li>Call us at: +1-800-123-4567</li>
          <li>Visit our website: www.questlog.com</li>
        </ul>

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

export default ContactModal;
