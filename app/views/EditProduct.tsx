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

const EditProduct = ({ handleClick, product, onClose, fetchProducts }) => {
  const [state, setState] = useState({
    _id: '',
    product_name: '',
    price: null,
    category: '',
  });

  useEffect(() => {
    setState(product);
  }, []);

  const { _id, product_name, price, category } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEdit = () => {
    fetch(`http://192.168.0.13:3000/api/products/${_id}`, {
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
      });
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
