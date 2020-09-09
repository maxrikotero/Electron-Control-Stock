import React from 'react';
import { Formik } from 'formik';
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

const AddSimpleForm = ({
  title,
  onSave,
  data = {
    name: '',
    description: '',
  },
}: {
  title: String;
}) => {
  return (
    <div>
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title={title}
              content={
                <Formik
                  initialValues={data}
                  validate={(values) => {
                    const errors: any = {};
                    if (!values.name) {
                      errors.name = 'Requerido';
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    onSave(values);
                    setSubmitting(false);
                    resetForm({});
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
                      </Row>
                      <Row>
                        <Col xs={12} md={12}>
                          <FormGroup controlId="descrControl">
                            <ControlLabel>Descripción</ControlLabel>
                            <FormControl
                              rows="5"
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
                        pullRight
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
    </div>
  );
};

export default AddSimpleForm;
