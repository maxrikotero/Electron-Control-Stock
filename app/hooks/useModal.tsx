import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const useModal = (size) => {
  const [show, setShow] = useState(false);

  const ModalComponent = ({ children, title }) => {
    return (
      <Modal
        show={show}
        onHide={() => setShow((prev) => !prev)}
        bsSize={size ? size : 'small'}
      >
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
    modalStatus: show,
  };
};

export default useModal;
