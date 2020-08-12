/*eslint-disable */
import React, { useRef } from 'react';
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
import { Card } from '../components/Card/Card';
import Button from '../components/CustomButton/CustomButton';

const EditClient = ({ client, onEdit }) => {
  debugger;
  const notificationSystem = useRef();

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={10}>
            <Card
              title="Editar Cliente"
              content={
                <Formik
                  initialValues={{ ...client }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.name) {
                      errors.name = 'Requerido';
                    }

                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(false);
                    onEdit(values);
                  }}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col xs={12} md={4}>
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
                      </Row>
                      <Row>
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
                        <Col xs={12} md={8}>
                          <FormGroup controlId="addressControl">
                            <ControlLabel>Dirección</ControlLabel>
                            <FormControl
                              type="text"
                              name="address"
                              onChange={handleChange}
                              bsClass="form-control"
                              value={values.address}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={8}>
                          <FormGroup controlId="descrControl">
                            <ControlLabel>Descripción</ControlLabel>
                            <FormControl
                              rows="3"
                              componentClass="textarea"
                              name="description"
                              onChange={handleChange}
                              bsClass="form-control"
                              value={values.description}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Button
                        bsStyle="info"
                        fill
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Guardar
                      </Button>
                      <div className="clearfix" />
                    </form>
                  )}
                </Formik>
              }
            />
          </Col>
        </Row>
      </Grid>
      <NotificationSystem ref={notificationSystem} style={style} />
    </div>
  );
};

export default EditClient;
