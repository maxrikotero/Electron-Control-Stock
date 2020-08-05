/*eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

import { Card } from '../components/Card/Card';

import Button from '../components/CustomButton/CustomButton';
import useApiUrl from '../hooks/useApiUrl';

const EditProduct = ({ handleClick, product, onClose, fetchProducts }) => {
  const [state, setState] = useState({
    _id: '',
    name: '',
    price: null,
    category: '',
    brand: '',
    countInStock: 10,
    description: '',
  });

  const apiUrl = useApiUrl();

  useEffect(() => {
    setState(product);
  }, []);

  const {
    _id,
    name,
    price,
    category,
    brand,
    countInStock,
    description,
  } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEdit = () => {
    console.log('handleEdit', state);

    fetch(`${apiUrl}/products/${_id}`, {
      method: 'PUT',
      body: JSON.stringify(state),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        handleClick('tc', 'Producto Modificado', 1);
        onClose();
        fetchProducts();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Editar Producto"
              content={
                <form>
                  <Row>
                    <Col xs={12} md={4}>
                      <FormGroup controlId="nameControl">
                        <ControlLabel>Nombre</ControlLabel>
                        <FormControl
                          type="text"
                          name="name"
                          onChange={handleChange}
                          placeHolder="Producto"
                          bsClass="form-control"
                          value={name}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={4}>
                      <FormGroup controlId="priceControl">
                        <ControlLabel>Precio</ControlLabel>
                        <FormControl
                          type="number"
                          name="price"
                          onChange={handleChange}
                          placeHolder="Precio"
                          bsClass="form-control"
                          value={price}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={4}>
                      <FormGroup controlId="categoryControl">
                        <ControlLabel>Categoria</ControlLabel>
                        <FormControl
                          type="text"
                          name="category"
                          onChange={handleChange}
                          placeHolder="Categoria"
                          bsClass="form-control"
                          value={category}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={4}>
                      <FormGroup controlId="brandControl">
                        <ControlLabel>Marca</ControlLabel>
                        <FormControl
                          type="text"
                          name="brand"
                          onChange={handleChange}
                          placeHolder="Marca"
                          bsClass="form-control"
                          value={brand}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={4}>
                      <FormGroup controlId="inStockControl">
                        <ControlLabel>Stock</ControlLabel>
                        <FormControl
                          type="number"
                          name="countInStock"
                          onChange={handleChange}
                          placeHolder="Producto"
                          bsClass="form-control"
                          value={countInStock}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={4}>
                      <FormGroup controlId="descrControl">
                        <ControlLabel>Descripción</ControlLabel>
                        <FormControl
                          rows="5"
                          componentClass="textarea"
                          name="description"
                          onChange={handleChange}
                          placeHolder="Descripcion"
                          bsClass="form-control"
                          value={description}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button bsStyle="info" pullRight fill onClick={handleEdit}>
                    Guardar
                  </Button>
                  <div className="clearfix" />
                </form>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default EditProduct;
