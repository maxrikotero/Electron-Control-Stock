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
import { Formik } from 'formik';
import NotificationSystem from 'react-notification-system';
import { style } from '../variables/Variables';
import apiCall from '../utils/apiCall';
import Button from '../components/CustomButton/CustomButton';
import CustomWell from '../components/CustomWell';

const AddUser = ({ notification }) => {

  // const [role, seRole] = useState({
  //   isAdmin: false,
  //   isSeller: false,
  //   isControlStock: false,
  // });

  const notificationSystem = useRef();

  const initialState = {
    dni: 0,
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    phone: 0,
    mobile: 0,
    cuil: 0,
    role: '',
  };

  return (
    <CustomWell toLink={'/admin/principal'} headerTitle={`Nuevo Usuario`}>
      <Formik
        initialValues={initialState}
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
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Email Invalido';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          var response = await apiCall({
            url: 'users',
            method: 'POST',
            body: JSON.stringify(values),
          });
          if (response.success) {
            setSubmitting(false);
            notification('tc', 'Usuario Agregado', 1);
            resetForm();
          } else {
            let message = 'Nuevo Usuario Error';
            if (response.error.indexOf('userName') > -1)
              message = 'Usuario Existente';
            if (response.error.indexOf('email') > -1)
              message = 'Email Existente';
            setSubmitting(false);
            notification('tc', message, 3);
          }
        }}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
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
                      value={values.dni || 0}
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
                      value={values.cuil || 0}
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
                  <span style={{ color: 'red' }}> {errors.firstName}</span>
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
                  <span style={{ color: 'red' }}> {errors.lastName}</span>
                </Col>
                <Col xs={12} md={4}>
                  <FormGroup controlId="mobileControl">
                    <ControlLabel>Celular</ControlLabel>
                    <FormControl
                      type="number"
                      name="mobile"
                      onChange={handleChange}
                      bsClass="form-control"
                      value={values.mobile || 0}
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
                      value={values.phone || 0}
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
                  <span style={{ color: 'red' }}> {errors.userName}</span>
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
                  <span style={{ color: 'red' }}> {errors.email}</span>
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
                  <span style={{ color: 'red' }}> {errors.password}</span>
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
                        { id: 1, text: 'Administrador' },
                        { id: 2, text: 'Vendedor' },
                        {
                          id: 3,
                          text: 'Control de stock',
                        },
                        {
                          id: 4,
                          text: "Secretaria",
                        }
                      ].map((item) => (
                        <option value={item.id}>{item.text}</option>
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

      <NotificationSystem ref={notificationSystem} style={style} />
    </CustomWell>
  );
};

export default AddUser;
