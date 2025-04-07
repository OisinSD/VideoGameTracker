import React from "react";
import { Modal, Button } from "react-bootstrap";

const TermsModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-light">
        <h2 className="fw-bold m-0">Terms & Conditions 📜</h2>
      </Modal.Header>

      <Modal.Body className="bg-dark text-light">
        <p className="mb-3">
          By using this website, you agree to the following terms and conditions:
        </p>
        <ul className="mb-4">
          <li>You must be at least 13 years old to use this service.</li>
          <li>We reserve the right to modify these terms at any time.</li>
          <li>You are responsible for keeping your account secure.</li>
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

export default TermsModal;