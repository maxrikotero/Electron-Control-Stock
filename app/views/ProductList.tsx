/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import EditProduct from './EditProduct';

import Card from '../components/Card/Card';
import { thArray, tdArray } from '../variables/Variables';

const ProductList = ({ handleClick }) => {
  debugger;
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchProducts = () => {
    fetch('http://192.168.0.13:3000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    setEditProduct(products.filter((product) => product._id === id)[0]);
    handleShow();
  };

  const deleteProduct = (id) => {
    // if (confirm('Are you sure you want to delete it?')) {
    fetch(`http://192.168.0.13:3000/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        handleClick('tc', 'Producto Borrado', 1);
        fetchProducts();
      });
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
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Categoria</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>{item.product_name}</td>
                          <td>{item.price}</td>
                          <td>{item.category}</td>
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
                                  onClick={() => deleteProduct(item._id)}
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProduct
            notification={() => {}}
            product={editProduct}
            onClose={handleClose}
            {...{ handleClick, fetchProducts }}
          />
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

export default ProductList;