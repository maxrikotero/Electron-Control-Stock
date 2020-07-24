/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import EditProvider from './EditProvider';

import Card from '../components/Card/Card';

const ProviderList = ({ handleClick }) => {
  const [providers, setProviders] = useState([]);
  const [editProvider, setEditProvider] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchProviders = () => {
    fetch('http://192.168.0.13:3000/api/providers')
      .then((res) => res.json())
      .then((data) => {
        setProviders(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleEdit = (id) => {
    setEditProvider(providers.filter((provider) => provider._id === id)[0]);
    handleShow();
  };

  const deleteProvider = (id) => {
    // if (confirm('Are you sure you want to delete it?')) {
    fetch(`http://192.168.0.13:3000/api/providers/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        handleClick('tc', 'Proveedor Borrado', 1);
        fetchProviders();
      });
    // }
  };

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Lista de Proveedores"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Razón Social</th>
                      <th>DNI</th>
                      <th>Marca</th>
                      <th>Fijo</th>
                      <th>Celular</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providers.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>{item.socialId}</td>
                          <td>{item.dni}</td>
                          <td>{item.brand}</td>
                          <td>{item.phone}</td>
                          <td>{item.mobile}</td>
                          <td>{item.email}</td>
                          <td>
                            <Row>
                              <Col xs={12} md={6}>
                                <Button
                                  bsStyle="info"
                                  onClick={() => handleEdit(item._id)}
                                >
                                  Edit
                                </Button>
                              </Col>
                              <Col xs={12} md={6}>
                                <Button
                                  bsStyle="danger"
                                  onClick={() => deleteProvider(item._id)}
                                >
                                  Borrar
                                </Button>
                              </Col>
                            </Row>
                          </td>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProvider
            notification={() => {}}
            provider={editProvider}
            onClose={handleClose}
            {...{ handleClick, fetchProviders }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProviderList;
