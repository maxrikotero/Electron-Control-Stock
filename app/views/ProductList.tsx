/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import MaterialTable from 'material-table';
import moment from 'moment';
import EditProduct from './EditProduct';
import Card from '../components/Card/Card';
import Movement from '../views/ProductMovement';
import apiCall from '../utils/apiCall';

const ProductList = ({ notification }) => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({});
  const [show, setShow] = useState(false);
  const [movement, setMovementId] = useState({
    showMovement: false,
    movementId: 0,
  });

  const { showMovement, movementId } = movement;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchProducts = async () => {
    const data = await apiCall({ url: 'products' });
    if (data) setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    setEditProduct(products.filter((product) => product._id === id)[0]);
    handleShow();
  };

  const handleShowMovement = (id) => {
    setMovementId({
      showMovement: true,
      movementId: id,
    });
  };

  const handleCloseMovement = () => {
    setMovementId(0);
  };

  const handleUpdate = async (data) => {
    try {
      var response = await apiCall({
        url: `products/${data._id}`,
        method: 'PUT',
        body: JSON.stringify(data),
      });

      if (response.success) {
        notification('tc', 'Producto Actualizado', 1);
        handleClose();

        setProducts(response.data);
      } else {
        let message = 'Error Actualizar';
        if (response.error.indexOf('name') > -1) message = 'Producto Existente';
        if (response.error.indexOf('code') > -1) message = 'Codigo Existente';

        notification('tc', message, 3);
      }
    } catch (error) {
      notification('tc', 'Error al Actualizar producto', 3);
    }
  };

  const deleteProduct = async (id) => {
    // if (confirm('Esta seguro de borrar?')) { TODO ------------------------
    const url = `products/${id}`;
    try {
      const response = await apiCall({ url, method: 'DELETE' });

      if (response.success) {
        fetchProducts();
      }
    } catch (error) {
      alert('error');
    }
    // }
  };

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Lista de productos"
              ctTableFullWidth
              ctTableResponsive
              content={
                <div className="content">
                  <MaterialTable
                    title=""
                    components={{ Container: (props) => props.children }}
                    options={{
                      actionsColumnIndex: -1,
                    }}
                    columns={[
                      { title: 'Codigo', field: 'code' },
                      { title: 'Nombre', field: 'name' },

                      {
                        title: 'Precio',
                        field: 'price',
                      },
                      {
                        title: 'Stock',
                        field: 'stock',
                        cellStyle: (cellValue, rowData) => {
                          return rowData.minStock >= cellValue
                            ? {
                                backgroundColor: 'red',
                                color: '#FFF',
                              }
                            : '';
                        },
                      },

                      {
                        title: 'Min Stock',
                        field: 'minStock',
                      },
                      {
                        title: 'Vencimiento',
                        render: (rowData) =>
                          moment(rowData.expire).format('YYYY-MM-DD'),
                      },
                      {
                        title: 'Movimientos',

                        render: (rowData) => (
                          <Button
                            bsStyle="info"
                            onClick={() => handleShowMovement(rowData._id)}
                          >
                            Ver
                          </Button>
                        ),
                      },
                    ]}
                    data={products}
                    actions={[
                      {
                        icon: () => {
                          return <Button bsStyle="info">Edit</Button>;
                        },
                        onClick: (event, rowData) => handleEdit(rowData._id),
                      },
                      {
                        icon: () => <Button bsStyle="danger">Borrar</Button>,
                        onClick: (event, rowData) => deleteProduct(rowData._id),
                      },
                    ]}
                  />
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
      <Modal show={show} onHide={handleClose} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProduct product={editProduct} onEdit={handleUpdate} />
        </Modal.Body>
      </Modal>
      {showMovement && (
        <Movement id={movementId} onClose={handleCloseMovement} />
      )}
    </div>
  );
};

export default ProductList;
