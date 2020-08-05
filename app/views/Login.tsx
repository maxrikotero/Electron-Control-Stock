import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import '../assets/css/login.css';
import { Card } from '../components/Card/Card';
import Button from '../components/CustomButton/CustomButton';
import { style } from '../variables/Variables';
import useApiUrl from '../hooks/useApiUrl';
import { set } from '../features/user/userSlice';

const styleContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '400px',
  minHeight: '100vh',
};
const Login = () => {
  const dispatch = useDispatch();

  const apiUrl = useApiUrl();

  const notificationSystem = useRef();

  const [redirection, setRedirection] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setRedirection((prev) => !prev);
    }
  }, []);
  const addNotification = ({ position, message, color }) => {
    debugger;
    var level;
    switch (color) {
      case 1:
        level = 'success';
        break;
      case 2:
        level = 'warning';
        break;
      case 3:
        level = 'error';
        break;
      case 4:
        level = 'info';
        break;
      default:
        break;
    }
    const notification = notificationSystem.current;
    notification.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: <div>{message}</div>,
      level: level,
      position: position,
      autoDismiss: 15,
    });
  };

  return (
    <>
      <NotificationSystem ref={notificationSystem} style={style} />
      {redirection && <Redirect to="/admin/principal" />}

      <Grid fluid style={styleContainer}>
        <Row style={{ width: '100%' }}>
          <Col xs={12}>
            <Card
              title="Login"
              content={
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validate={(values) => {
                    const errors = {};
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
                  onSubmit={(values, { setSubmitting }) => {
                    fetch(`${apiUrl}/users/signin`, {
                      method: 'POST',
                      body: JSON.stringify(values),
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                    })
                      .then((res) => res.json())
                      .then(({ success, message, token, userSession }) => {
                        setSubmitting(false);
                        if (success) {
                          dispatch(set({ data: userSession }));
                          localStorage.setItem('token', token);
                          setRedirection((prev) => !prev);
                        } else {
                          addNotification({
                            position: 'tr',
                            message: <div>{message}</div>,
                            color: 3,
                          });
                        }
                      })
                      .catch((err) => {
                        setSubmitting(false);

                        addNotification({
                          position: 'tr',
                          message: <div>Login Error</div>,
                          color: 3,
                        });
                      });
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col xs={12} md={12}>
                          <FormGroup controlId="emailControl">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                              type="email"
                              name="email"
                              onChange={handleChange}
                              placeholder="Email"
                              bsClass="form-control"
                              value={values.email}
                            />
                          </FormGroup>
                          <span style={{ color: 'red' }}> {errors.email}</span>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={12}>
                          <FormGroup controlId="passControl">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                              type="password"
                              name="password"
                              onChange={handleChange}
                              placeholder="password"
                              bsClass="form-control"
                              value={values.password}
                            />
                          </FormGroup>
                          <span style={{ color: 'red' }}>
                            {' '}
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={12} style={{ textAlign: 'center' }}>
                          <Button
                            bsStyle="info"
                            fill
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Guardar
                          </Button>
                        </Col>
                      </Row>

                      <div className="clearfix" />
                    </form>
                  )}
                </Formik>
              }
            />
          </Col>
        </Row>
      </Grid>
    </>
  );
};

export default Login;
