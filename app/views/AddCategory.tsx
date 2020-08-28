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
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import NotificationSystem from 'react-notification-system';
import { style } from '../variables/Variables';
import apiCall from '../utils/apiCall';
import { Card } from '../components/Card/Card';
import Button from '../components/CustomButton/CustomButton';
import { setCategories } from '../features/selects/selectsSlice';

const AddCategory = ({ notification }: { notification: any }) => {
  const notificationSystem = useRef<HTMLInputElement>();
  const dispatch = useDispatch();

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Agregar Categoria"
              content={
                <Formik
                  initialValues={{
                    name: '',
                    description: '',
                  }}
                  validate={(values) => {
                    const errors: any = {};
                    if (!values.name) {
                      errors.name = 'Requerido';
                    }
                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    var response = await apiCall({
                      url: 'categories',
                      method: 'POST',
                      body: JSON.stringify(values),
                    });
                    if (response.success) {
                      setSubmitting(false);
                      notification('tc', 'Categoria Agregada', 1);
                      dispatch(setCategories(response.data));
                      resetForm({});
                    } else {
                      let message = 'Agregar Categoria Error';
                      if (response.error.indexOf('name') > -1)
                        message = 'Categoria Existente';
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
      <NotificationSystem ref={notificationSystem} style={style} />
    </div>
  );
};

export default AddCategory;
