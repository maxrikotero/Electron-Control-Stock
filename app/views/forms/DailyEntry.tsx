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
import { style } from '../../variables/Variables';
import apiCall from '../../utils/apiCall';
import Button from '../../components/CustomButton/CustomButton';
import CustomWell from '../../components/CustomWell';

const DailyEntry = ({
  notification,
  isEdit = false,
  data,
  afterAction,
}: {
  notification: any;
  isEdit: boolean;
}) => {
  const notificationSystem = useRef<HTMLInputElement>();

  return (
    <CustomWell
      toLink={'/admin/principal'}
      headerTitle={`Nueva Diaria`}
      isEdit={isEdit}
    >
      <Formik
        initialValues={
          !isEdit
            ? {
                product: '',
                amount: '',
                worker: '',
                description: '',
              }
            : data
        }
        validate={(values) => {
          const errors: any = {};
          if (!values.product) {
            errors.product = 'Requerido';
          }

          if (!values.amount) {
            errors.amount = 'Requerido';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          var response = await apiCall({
            url: `${isEdit ? 'dailyentry/' + data._id : 'dailyentry'}`,
            method: isEdit ? 'PUT' : 'POST',
            body: JSON.stringify(values),
          });
          if (response.success) {
            setSubmitting(false);
            notification(
              'tc',
              `Diaria ${isEdit ? 'Actualizada' : 'Agregada'}`,
              1
            );
            resetForm({
              product: '',
              amount: 0,
              worker: '',
              description: '',
            });

            if (isEdit) afterAction();
          } else {
            let message = `${isEdit ? 'Actualizar' : 'Agregada'} Diaria Error`;

            setSubmitting(false);
            notification('tc', message, 3);
          }
        }}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={12}>
                <FormGroup controlId="nameControl">
                  <ControlLabel>Producto</ControlLabel>
                  <FormControl
                    type="text"
                    name="product"
                    onChange={handleChange}
                    bsClass="form-control"
                    value={values.product}
                  />
                </FormGroup>
                <span style={{ color: 'red' }}> {errors.product}</span>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <FormGroup controlId="nameControl">
                  <ControlLabel>Cantidad</ControlLabel>
                  <FormControl
                    type="number"
                    name="amount"
                    onChange={handleChange}
                    bsClass="form-control"
                    value={values.amount}
                  />
                </FormGroup>
                <span style={{ color: 'red' }}> {errors.amount}</span>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <FormGroup controlId="descrControl">
                  <ControlLabel>Función</ControlLabel>
                  <FormControl
                    type="text"
                    name="worker"
                    onChange={handleChange}
                    bsClass="form-control"
                    value={values.worker}
                  />
                </FormGroup>
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

      <NotificationSystem ref={notificationSystem} style={style} />
    </CustomWell>
  );
};

export default DailyEntry;
