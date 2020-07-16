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

const UserProfile = () => {
  const [state, setState] = useState({
    dni: null,
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    phone: null,
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch('http://192.168.0.13:3000/api/users/1')
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      })
      .catch(() => console.log(' Blocked by browser?'));
  };

  const { dni, firstName, lastName, userName, email, password, phone } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchTasks();
  };

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Editar Usuario"
              content={
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={12} md={4}>
                      <FormGroup controlId="idControl">
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
                      <FormGroup controlId="firstNameControl">
                        <ControlLabel>Nombre</ControlLabel>
                        <FormControl
                          type="text"
                          name="firstName"
                          onChange={handleChange}
                          placeHolder="Nombre"
                          bsClass="form-control"
                          value={firstName}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={4}>
                      <FormGroup controlId="lastNameControl">
                        <ControlLabel>Apellido</ControlLabel>
                        <FormControl
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                          placeHolder="Nombre"
                          bsClass="form-control"
                          value={lastName}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <FormGroup controlId="userControl">
                        <ControlLabel>Usuario</ControlLabel>
                        <FormControl
                          type="text"
                          name="userName"
                          onChange={handleChange}
                          placeHolder="Usuario"
                          bsClass="form-control"
                          value={userName}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                      <FormGroup controlId="emailControl">
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
                  <Row>
                    <Col xs={12} md={6}>
                      <FormGroup controlId="passwordControl">
                        <ControlLabel>Contraseña</ControlLabel>
                        <FormControl
                          type="password"
                          name="password"
                          onChange={handleChange}
                          placeHolder="Contraseña"
                          bsClass="form-control"
                          value={password}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                      <FormGroup controlId="phoneControl">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                          type="Celular"
                          name="number"
                          onChange={handleChange}
                          placeHolder="Celular"
                          bsClass="form-control"
                          value={phone}
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

export default UserProfile;
