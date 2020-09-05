/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { Formik } from 'formik';
import apiCall from '../utils/apiCall';
import { Card } from '../components/Card/Card';
import Button from '../components/CustomButton/CustomButton';

const UserProfile = ({ notification, _id, onSave }) => {
  const [state, setState] = useState({});
  const { sessionData } = useSelector(({ user }) => user);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await apiCall({
        url: `users/${_id || sessionData._id}`,
      });

      if (response.success) setState({ ...response.data });
    };
    if (sessionData._id) {
      fetchUser();
    }
  }, [sessionData]);

  const getRole = () => {
    let roleText = '';
    const { isAdmin, isSeller } = state;
    switch (true) {
      case isAdmin === true:
        roleText = 'Administrador';
        break;
      case isSeller === true:
        roleText = 'Vendedor';
        break;
      default:
        roleText = 'Control de stock';
    }

    return roleText;
  };
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Editar Usuario"
              content={
                <Formik
                  initialValues={{
                    ...state,
                    role: getRole(),
                  }}
                  enableReinitialize={true}
                  validate={(values) => {
                    const errors = {};
                    if (!values.role) errors.role = 'Requerido';
                    if (!values.dni) {
                      errors.dni = 'Requerido';
                    }
                    if (!values.firstName) {
                      errors.firstName = 'Requerido';
                    }
                    if (!values.lastName) {
                      errors.lastName = 'Requerido';
                    }
                    if (!values.userName) {
                      errors.userName = 'Requerido';
                    }
                    if (!values.password) {
                      errors.password = 'Requerido';
                    }
                    if (!values.email) {
                      errors.email = 'Requerido';
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = 'Email Invalido';
                    }
                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    let data = { ...values };
                    if (values.password !== state.password)
                      data = { ...values, isPasswordChange: true };

                    var response = await apiCall({
                      url: `users/${values._id}`,
                      method: 'PUT',
                      body: JSON.stringify(data),
                    });
                    if (response.success) {
                      setSubmitting(false);
                      notification('tc', 'Usuario Actualizado', 1);
                      if (onSave) onSave();
                    } else {
                      let message = 'Actualizar Error';
                      if (response.error.indexOf('userName') > -1)
                        message = 'Usuario Existente';
                      if (response.error.indexOf('email') > -1)
                        message = 'Email Existente';
                      setSubmitting(false);
                      notification('tc', message, 3);
                    }
                  }}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                  }) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        <Row>
                          <Col xs={12} md={4}>
                            <FormGroup controlId="idControl">
                              <ControlLabel>DNI</ControlLabel>
                              <FormControl
                                type="number"
                                name="dni"
                                onChange={handleChange}
                                bsClass="form-control"
                                value={values.dni}
                              />
                            </FormGroup>
                            <span style={{ color: 'red' }}> {errors.dni}</span>
                          </Col>
                          <Col xs={12} md={4}>
                            <FormGroup controlId="cuilControl">
                              <ControlLabel>CUIL</ControlLabel>
                              <FormControl
                                type="number"
                                name="cuil"
                                onChange={handleChange}
                                bsClass="form-control"
                                value={values.cuil}
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
                                bsClass="form-control"
                                value={values.firstName}
                              />
                            </FormGroup>
                            <span style={{ color: 'red' }}>
                              {' '}
                              {errors.firstName}
                            </span>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={4}>
                            <FormGroup controlId="lastNameControl">
                              <ControlLabel>Apellido</ControlLabel>
                              <FormControl
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                bsClass="form-control"
                                value={values.lastName}
                              />
                            </FormGroup>
                            <span style={{ color: 'red' }}>
                              {' '}
                              {errors.lastName}
                            </span>
                          </Col>
                          <Col xs={12} md={4}>
                            <FormGroup controlId="mobileControl">
                              <ControlLabel>Celular</ControlLabel>
                              <FormControl
                                type="number"
                                name="mobile"
                                onChange={handleChange}
                                bsClass="form-control"
                                value={values.mobile}
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={12} md={4}>
                            <FormGroup controlId="phoneControl">
                              <ControlLabel>Telefono Fijo</ControlLabel>
                              <FormControl
                                type="number"
                                name="phone"
                                onChange={handleChange}
                                bsClass="form-control"
                                value={values.phone}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={4}>
                            <FormGroup controlId="userControl">
                              <ControlLabel>Usuario</ControlLabel>
                              <FormControl
                                type="text"
                                name="userName"
                                onChange={handleChange}
                                bsClass="form-control"
                                value={values.userName}
                              />
                            </FormGroup>
                            <span style={{ color: 'red' }}>
                              {' '}
                              {errors.userName}
                            </span>
                          </Col>

                          <Col xs={12} md={4}>
                            <FormGroup controlId="emailControl">
                              <ControlLabel>Email</ControlLabel>
                              <FormControl
                                type="email"
                                name="email"
                                onChange={handleChange}
                                placeHolder="Email"
                                bsClass="form-control"
                                value={values.email}
                              />
                            </FormGroup>
                            <span style={{ color: 'red' }}>
                              {' '}
                              {errors.email}
                            </span>
                          </Col>
                          <Col xs={12} md={4}>
                            <FormGroup controlId="passwordControl">
                              <ControlLabel>Contraseña</ControlLabel>
                              <FormControl
                                type="password"
                                name="password"
                                onChange={handleChange}
                                bsClass="form-control"
                                value={values.password}
                              />
                            </FormGroup>
                            <span style={{ color: 'red' }}>
                              {' '}
                              {errors.password}
                            </span>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={4}>
                            <FormGroup controlId="formControlsSelect">
                              <ControlLabel>Roles</ControlLabel>
                              <FormControl
                                componentClass="select"
                                placeholder="select"
                                name="role"
                                value={values.role}
                                onChange={handleChange}
                              >
                                <option value="select">select</option>
                                {[
                                  { id: 'isAdmin', text: 'Administrador' },
                                  { id: 'isSeller', text: 'Vendedor' },
                                  {
                                    id: 'isControlStock',
                                    text: 'Control de stock',
                                  },
                                ].map((item) => (
                                  <option value={item._id}>{item.text}</option>
                                ))}
                              </FormControl>
                            </FormGroup>
                            <span style={{ color: 'red' }}> {errors.role}</span>
                          </Col>
                        </Row>
                        <Button
                          bsStyle="info"
                          pullRight
                          fill
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Guardar
                        </Button>
                        <div className="clearfix" />
                      </form>
                    );
                  }}
                </Formik>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default UserProfile;
