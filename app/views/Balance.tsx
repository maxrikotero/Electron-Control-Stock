/*eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import NotificationSystem from 'react-notification-system';
import { Formik } from 'formik';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import moment from 'moment';
import { style } from '../variables/Variables';
import apiCall from '../utils/apiCall';
import Button from '../components/CustomButton/CustomButton';
import CustomWell from '../components/CustomWell';
import CurrencyInput from '../components/CurrencyInput/CurrencyInput';

const Balance = ({ notification, data, isEdit }: { notification: any }) => {
  const [state, setState] = useState({
    amount: null,
    date: null,
  });
  useEffect(() => {
    // if (Object.keys(data).length > 0) setState(data);
  }, []);
  const notificationSystem = useRef<HTMLInputElement>();

  const handleSubmit = async (values: any) => {
    var response = await apiCall({
      url: 'balance',
      method: 'POST',
      body: JSON.stringify(values),
    });
    if (response.success) {
      notification('tc', 'Caja agregada', 1);
    } else {
      const message = 'Nueva caja Error';

      notification('tc', message, 3);
    }
  };

  return (
    <CustomWell toLink={'/admin/principal'} headerTitle={`Caja`}>
      <Formik
        initialValues={state}
        validate={(values) => {
          const errors: any = {};
          if (!values.amount) {
            errors.amount = 'Requerido';
          }

          if (!values.date) {
            errors.expire = 'Requerido';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values);
          setSubmitting(false);
          resetForm({});
        }}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={4}>
                <FormGroup controlId="nameControl">
                  <ControlLabel>Monto</ControlLabel>
                  <CurrencyInput
                    placeholder="$0.00"
                    type="text"
                    name="amount"
                    onChange={handleChange}
                    value={values.amount}
                  />
                </FormGroup>
                <span style={{ color: 'red' }}> {errors.amount}</span>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={4}>
                <FormGroup controlId="descrControl">
                  <ControlLabel>Fecha</ControlLabel>
                  <FormControl
                    type="date"
                    name="date"
                    onChange={handleChange}
                    bsClass="form-control"
                    value={moment(values.date).utc().format('YYYY-MM-DD')}
                  />
                </FormGroup>
                <span style={{ color: 'red' }}> {errors.expire}</span>
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

export default Balance;
