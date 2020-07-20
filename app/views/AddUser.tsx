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
import NotificationSystem from 'react-notification-system';
import { style } from '../variables/Variables';

import { Card } from '../components/Card/Card';
import Button from '../components/CustomButton/CustomButton';

const AddUser = ({ notification }) => {
  const { path } = useRouteMatch();
  const [redirect, setRedirect] = useState(false);
  const [state, setState] = useState({
    dni: null,
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    phone: null,
  });

  const notificationSystem = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://192.168.0.13:3000/api/users', {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(() => {
        notification('tc', 'Usuario Agregado', 1);
        setRedirect((prevState) => !prevState);
      })
      .catch((err) => console.error(err));
  };

  const { dni, firstName, lastName, userName, email, password, phone } = state;

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
              title="Agregar Usuario"
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
      <NotificationSystem ref={notificationSystem} style={style} />
    </div>
  );
};

export default AddUser;
