/*eslint-disable */
import React from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Well,
} from 'react-bootstrap';
import { Formik } from 'formik';
import apiCall from '../utils/apiCall';
import Button from '../components/CustomButton/CustomButton';
import CustomWell from '../components/CustomWell';

const AddProvider = ({
  notification,
  isEdit,
  provider,
  onSave,
}: {
  notification: any;
}) => {
  const initialState = {
    razonSocial: '',
    dni: 0,
    phone: '',
    email: '',
    name: '',
  };
  return (
    <CustomWell
      toLink={'/admin/principal'}
      headerTitle={`Nuevo Proveedor`}
      isEdit={isEdit}
    >
      <Formik
        initialValues={isEdit ? { ...provider } : { ...initialState }}
        validate={(values) => {
          const errors: any = {};
          if (!values.name) {
            errors.name = 'Requerido';
          }

          return errors;
        }}
        onSubmit={async (values: any, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          var response = await apiCall({
            url: !isEdit ? 'providers' : `providers/${values._id}`,
            method: isEdit ? 'PUT' : 'POST',
            body: JSON.stringify(values),
          });

          if (response.success) {
            notification(
              'tc',
              !isEdit ? 'Proveedor Agregado' : 'Proveedor Actualizado',
              1
            );

            (!isEdit && resetForm(initialState)) || onSave();
          }
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => {
          return (
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
                      value={values.name}
                    />
                  </FormGroup>
                  <span style={{ color: 'red' }}> {errors.name}</span>
                </Col>
                <Col xs={12} md={6}>
                  <FormGroup controlId="socialControl">
                    <ControlLabel>Razón Social</ControlLabel>
                    <FormControl
                      type="text"
                      name="razonSocial"
                      onChange={handleChange}
                      bsClass="form-control"
                      value={values.razonSocial}
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
                      value={values.phone}
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
                      value={values.dni}
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
                      value={values.email}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button bsStyle="info" pullRight fill type="submit">
                Guardar
              </Button>
              <div className="clearfix" />
            </form>
          );
        }}
      </Formik>
    </CustomWell>
  );
};

export default AddProvider;
