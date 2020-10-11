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
import apiCall from '../utils/apiCall';
import { Card } from '../components/Card/Card';
import Button from '../components/CustomButton/CustomButton';

const AddProvider = ({ notification }: { notification: any }) => {
  const [state, setState] = useState({
    socialId: null,
    dni: null,
    phone: '',
    email: '',
    name: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    var response = await apiCall({
      url: 'providers',
      method: 'POST',
      body: JSON.stringify(values),
    });

    if (response.success) {
      notification('tc', 'Proveedor Agregado', 1);
      setState({
        name: '',
        socialId: null,
        dni: null,
        phone: '',
        email: '',
      });
    }
  };

  const { socialId, dni, phone, email, name } = state;

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
                      <FormGroup controlId="nameControl">
                        <ControlLabel>Nombre</ControlLabel>
                        <FormControl
                          type="text"
                          name="name"
                          onChange={handleChange}
                          bsClass="form-control"
                          value={name}
                        />
                      </FormGroup>
                    </Col>
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
