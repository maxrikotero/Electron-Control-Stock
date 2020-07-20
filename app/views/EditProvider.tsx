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

const EditProvider = ({ handleClick, provider, onClose, fetchProviders }) => {
  const [state, setState] = useState({
    _id: '',
    socialId: '',
    dni: null,
    brand: '',
    phone: null,
    mobile: null,
    email: '',
  });

  useEffect(() => {
    setState(provider);
  }, []);

  const { _id, socialId, dni, brand, phone, mobile, email } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEdit = () => {
    console.log('lega');
    fetch(`http://192.168.0.13:3000/api/providers/${_id}`, {
      method: 'PUT',
      body: JSON.stringify(state),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        handleClick('tc', 'Provider Modificado', 1);
        onClose();
        fetchProviders();
      });
  };

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Editar Proveedor"
              content={
                <form>
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

export default EditProvider;
