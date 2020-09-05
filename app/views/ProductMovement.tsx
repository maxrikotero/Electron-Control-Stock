/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import MaterialTable from 'material-table';
import moment from 'moment';
import apiCall from '../utils/apiCall';

const ProductMovement = ({ id, onClose }) => {
  const [movements, setMovements] = useState([]);
  const [show, setShow] = useState(true);

  const fetchProductMovement = async () => {
    const response = await apiCall({ url: `products/movement/${id}` });
    setMovements(response);
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
      <Modal show={show} onHide={handleClose} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Lista de movimiento del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid fluid>
            <Row>
              <Col md={12}>
                <MaterialTable
                  title=""
                  components={{ Container: (props) => props.children }}
                  options={{
                    actionsColumnIndex: -1,
                  }}
                  columns={[
                    {
                      title: 'Fecha',
                      render: (rowData) =>
                        moment(rowData.dateAt).format('YYYY-MM-DD, h:mm:ss a'),
                    },
                    { title: 'Cantidad', field: 'quality' },
                    {
                      title: 'Entrada',
                      render: (rowData) =>
                        Boolean(rowData.input) ? 'Si' : 'No',
                    },
                    {
                      title: 'Salida',
                      render: (rowData) =>
                        Boolean(rowData.output) ? 'Si' : 'No',
                    },
                    {
                      title: 'Fue Venta',
                      render: (rowData) =>
                        Boolean(rowData.isSale) ? 'Si' : 'No',
                    },
                    {
                      title: 'Fue Actualizado',
                      render: (rowData) =>
                        Boolean(rowData.isUpdated) ? 'Si' : 'No',
                    },
                  ]}
                  data={movements}
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
