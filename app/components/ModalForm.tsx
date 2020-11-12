import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalForm = ({ children, show, handleClose, title }) => {
  return (
    <Modal show={show} onHide={handleClose} bsSize="large">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalForm;
