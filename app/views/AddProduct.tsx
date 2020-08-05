/*eslint-disable */
import React, { useState, useRef } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { Redirect, useRouteMatch } from 'react-router-dom';

import { Card } from '../components/Card/Card';

import Button from '../components/CustomButton/CustomButton';

import useApiUrl from '../hooks/useApiUrl';

const AddProduct = ({ notification }) => {
  const [redirect, setRedirect] = useState(false);
  const [state, setState] = useState({
    name: '',
    price: null,
    category: '',
    brand: '',
    countInStock: 0,
    description: '',
    code: 0,
  });

  const apiUrl = useApiUrl();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${apiUrl}/products`, {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        notification('tc', 'Producto Agregado', 1);
        setRedirect((prevState) => !prevState);
      })
      .catch((err) => {
        notification('tc', 'Error al agregar Producto', 3);
      });
  };

  const {
    name,
    price,
    category,
    brand,
    countInStock,
    description,
    code,
  } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="content">
      {redirect && <Redirect from="/" to="/admin/principal" />}
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Agregar Producto"
              content={
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={12} md={4}>
                      <FormGroup controlId="codeControl">
                        <ControlLabel>Codigo</ControlLabel>
                        <FormControl
                          type="text"
                          name="code"
                          onChange={handleChange}
                          placeHolder="Codigo"
                          bsClass="form-control"
                          value={code}
                        />
                      </FormGroup>
                    </Col>
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
                  </Row>
                  <Row>
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
                          type="text"
                          name="description"
                          onChange={handleChange}
                          placeHolder="Descripcion"
                          bsClass="form-control"
                          value={description}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button bsStyle="info" pullRight fill type="submit">
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

export default AddProduct;
