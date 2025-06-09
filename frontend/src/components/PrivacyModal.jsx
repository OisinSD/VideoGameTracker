import React from "react";
import { Modal, Button } from "react-bootstrap";

const PrivacyModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-light">
        <h2 className="fw-bold m-0">Privacy Policy 📄</h2>
      </Modal.Header>

      <Modal.Body className="bg-dark text-light">
        <p className="mb-3">
          Your privacy is important to us. We never share your data with third parties 
          without your consent. All information is stored securely and used to enhance 
          your experience.
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

export default PrivacyModal;