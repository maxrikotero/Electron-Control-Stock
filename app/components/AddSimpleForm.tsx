import React from 'react';
import { Formik } from 'formik';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

import Button from '../components/CustomButton/CustomButton';

const AddSimpleForm = ({
  cancelButton = false,
  onCancel = null,
  onSave,
  data = {
    name: '',
    description: '',
  },
}: {
  title: String;
}) => {
  return (
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
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
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
          {cancelButton && (
            <Button
              bsStyle="primary"
              fill
              pullRight
              style={{ marginRight: 10 }}
              onClick={onCancel}
            >
              Cancelar
            </Button>
          )}
          <div className="clearfix" />
        </form>
      )}
    </Formik>
  );
};

export default AddSimpleForm;
