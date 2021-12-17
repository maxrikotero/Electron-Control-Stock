/*eslint-disable */
import React, { useRef } from 'react';
import {
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

const AddClient = ({
  notification,
  isSale = null,
  onCancelSale,
  afterSave = null,
}: {
  notification: any;
}) => {
  const notificationSystem = useRef<HTMLInputElement>();
  return (
    <CustomWell
      toLink={'/admin/principal'}
      headerTitle={`Nuevo Cliente`}
      dynamicPath={'/admin/clients'}
      hideHeader={isSale}
    >
      <Formik
        initialValues={{
          name: '',
          address: '',
          phone: '',
          mobile: '',
          cuil: '',
          description: '',
        }}
        validate={(values) => {
          let errors: any = {};
          if (!values.name) {
            errors.name = 'Requerido';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          var response = await apiCall({
            url: 'clients',
            method: 'POST',
            body: JSON.stringify(values),
          });
          if (response.success) {
            setSubmitting(false);
            notification('tc', 'Cliente Agregado', 1);
            resetForm();
            if (typeof afterSave === 'function') afterSave();
          } else {
            let message = 'Agregar Cliente Error';
            if ((response?.error || '').indexOf('name') > -1)
              message = 'Nombre Requerido';
            if ((response?.error || '').indexOf('cuil') > -1)
              message = 'Cuil ya existe';
            setSubmitting(false);
            notification('tc', message, 3);
          }
        }}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={4}>
                <FormGroup controlId="nameControl">
                  <ControlLabel>Nombre y Apellido</ControlLabel>
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
              pullRight
              type="submit"
              disabled={isSubmitting}
            >
              Guardar
            </Button>

            {isSale && (
              <Button
                bsStyle="primary"
                fill
                pullRight
                style={{ marginRight: 10 }}
                onClick={onCancelSale}
              >
                Cancelar
              </Button>
            )}
            <div className="clearfix" />
          </form>
        )}
      </Formik>
      <NotificationSystem ref={notificationSystem} style={style} />
    </CustomWell>
  );
};

export default AddClient;
