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
import { Redirect } from 'react-router-dom';
import { style } from '../variables/Variables';

import { Card } from '../components/Card/Card';
import Button from '../components/CustomButton/CustomButton';

const AddProvider = ({ notification }: { notification: any }) => {
  const [redirect, setRedirect] = useState(false);
  const [state, setState] = useState({
    socialId: null,
    dni: null,
    brand: '',
    phone: '',
    mobile: '',
    email: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://192.168.0.13:3000/api/providers', {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        notification('tc', 'Proveedor Agregado', 1);
        setRedirect((prevState) => !prevState);
      })
      .catch((err) => console.error(err));
  };

  const { socialId, dni, brand, phone, mobile, email } = state;

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
              title="Agregar Proveedor"
              content={
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={12} md={4}>
                      <FormGroup controlId="idControl">
                        <ControlLabel>Razón Social</ControlLabel>
                        <FormControl
                          type="text"
                          name="socialId"
                          onChange={handleChange}
                          placeHolder="Razón Social"
                          bsClass="form-control"
                          value={socialId}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={4}>
                      <FormGroup controlId="firstNameControl">
                        <ControlLabel>DNI</ControlLabel>
                        <FormControl
                          type="number"
                          name="dni"
                          onChange={handleChange}
                          placeHolder="DNI"
                          bsClass="form-control"
                          value={dni}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={4}>
                      <FormGroup controlId="lastNameControl">
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
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <FormGroup controlId="userControl">
                        <ControlLabel>Fijo</ControlLabel>
                        <FormControl
                          type="number"
                          name="phone"
                          onChange={handleChange}
                          placeHolder="Fijo"
                          bsClass="form-control"
                          value={phone}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                      <FormGroup controlId="emailControl">
                        <ControlLabel>Celular</ControlLabel>
                        <FormControl
                          type="number"
                          name="mobile"
                          onChange={handleChange}
                          placeHolder="Celular"
                          bsClass="form-control"
                          value={mobile}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <FormGroup controlId="phoneControl">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                          type="email"
                          name="email"
                          onChange={handleChange}
                          placeHolder="Email"
                          bsClass="form-control"
                          value={email}
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

export default AddProvider;
