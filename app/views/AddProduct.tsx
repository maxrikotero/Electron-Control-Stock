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

const AddProduct = ({ notification }) => {
  const [redirect, setRedirect] = useState(false);
  const [state, setState] = useState({
    product_name: '',
    price: null,
    category: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://192.168.0.13:3000/api/products', {
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

  const { product_name, price, category } = state;

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
                      <FormGroup controlId="idControl">
                        <ControlLabel>Nombre</ControlLabel>
                        <FormControl
                          type="text"
                          name="product_name"
                          onChange={handleChange}
                          placeHolder="Producto"
                          bsClass="form-control"
                          value={product_name}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={4}>
                      <FormGroup controlId="firstNameControl">
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
                      <FormGroup controlId="lastNameControl">
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
