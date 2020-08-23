import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({
  closeText,
  confirmText,
  title,
  body,
  show,
  onAction,
  onClose,
}) => {
  return (
    <div className="static-modal">
      <Modal show={show} onHide={onClose}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{body}</Modal.Body>

        <Modal.Footer>
          <Button bsStyle="primary" onClick={onClose}>
            {closeText}
          </Button>
          <Button bsStyle="danger" onClick={onAction}>
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
