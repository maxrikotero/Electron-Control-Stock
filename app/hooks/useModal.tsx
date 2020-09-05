import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const useModal = () => {
  const [show, setShow] = useState(false);

  const ModalComponent = ({ children, title }) => {
    return (
      <Modal show={show} onHide={() => setShow((prev) => !prev)} bsSize="small">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    );
  };
  return {
    ModalComponent,
    setModal: setShow,
  };
};

export default useModal;
