/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import Card from '../components/Card/Card';
import useApiUrl from '../hooks/useApiUrl';

const ProductMovement = ({ id, onClose }) => {
  debugger;
  const [movement, setMovement] = useState([]);
  const [show, setShow] = useState(true);

  const apiUrl = useApiUrl();

  const fetchProductMovement = () => {
    fetch(`${apiUrl}/products/movement/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovement(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchProductMovement();
  }, []);

  const handleClose = () => {
    setShow((prev) => !prev);
    onClose();
  };

  return (
    <div className="content">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Lista de movimiento del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  //   title="Lista de movimiento del Producto"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Catidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {movement.map((item, key) => {
                          return (
                            <tr key={key}>
                              <td>{item.dateAt}</td>
                              <td>{item.quality}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductMovement;
