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

import { Card } from '../components/Card/Card';
import Button from '../components/CustomButton/CustomButton';

const AddProvider = ({ notification }: { notification: any }) => {
  const [state, setState] = useState({
    socialId: null,
    dni: null,
    brand: '',
    phone: '',
    mobile: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/api/providers', {
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
        setState({
          firstName: '',
          lastName: '',
          socialId: null,
          dni: null,
          brand: '',
          phone: '',
          mobile: '',
          email: '',
        });
      })
      .catch((err) => console.error(err));
  };

  const {
    socialId,
    dni,
    brand,
    phone,
    mobile,
    email,
    firstName,
    lastName,
  } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Agregar Proveedor"
              content={
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={12} md={6}>
                      <FormGroup controlId="firstNameControl">
                        <ControlLabel>Nombre</ControlLabel>
                        <FormControl
                          type="text"
                          name="firstName"
                          onChange={handleChange}
                          bsClass="form-control"
                          value={firstName}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                      <FormGroup controlId="lastNameControl">
                        <ControlLabel>Apellido</ControlLabel>
                        <FormControl
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                          bsClass="form-control"
                          value={lastName}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <FormGroup controlId="socialControl">
                        <ControlLabel>Razón Social</ControlLabel>
                        <FormControl
                          type="text"
                          name="socialId"
                          onChange={handleChange}
                          bsClass="form-control"
                          value={socialId}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                      <FormGroup controlId="dniControl">
                        <ControlLabel>DNI</ControlLabel>
                        <FormControl
                          type="number"
                          name="dni"
                          onChange={handleChange}
                          bsClass="form-control"
                          value={dni}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <FormGroup controlId="fijoControl">
                        <ControlLabel>Fijo</ControlLabel>
                        <FormControl
                          type="number"
                          name="phone"
                          onChange={handleChange}
                          bsClass="form-control"
                          value={phone}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                      <FormGroup controlId="celularControl">
                        <ControlLabel>Celular</ControlLabel>
                        <FormControl
                          type="number"
                          name="mobile"
                          onChange={handleChange}
                          bsClass="form-control"
                          value={mobile}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <FormGroup controlId="emailControl">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                          type="email"
                          name="email"
                          onChange={handleChange}
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
