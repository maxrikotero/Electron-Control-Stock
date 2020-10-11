import React, {
  useState,
  useRef,
  useEffect,
  Fragment,
  ReactElement,
} from 'react';
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
import Button from '../components/CustomButton/CustomButton';
import { style } from '../variables/Variables';
import useApiUrl from '../hooks/useApiUrl';
import { set } from '../features/user/userSlice';
import logo from '../assets/img/logo.jpg';

const Login = () => {
  const dispatch = useDispatch();

  const apiUrl: string = useApiUrl();

  const notificationSystem = useRef<HTMLInputElement>(null);

  const [redirection, setRedirection] = useState<boolean>(false);

  useEffect(() => {}, []);
  const addNotification = ({
    position,
    message,
    color,
  }: {
    position: string;
    message: ReactElement;
    color: number;
  }) => {
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
    const notification: any = notificationSystem.current;

    notification.addNotification({
      title: <span data-notify="icon" className="pe-7s-bell" />,
      message: <div>{message}</div>,
      level: level,
      position: position,
      autoDismiss: 15,
    });
  };

  const isMarisa = true;

  return (
    <Fragment key="loginFragment">
      <NotificationSystem ref={notificationSystem} style={style} />
      {redirection && <Redirect to="/admin/principal" />}

      <Grid fluid style={{ height: '100%', padding: 0, margin: 0 }}>
        <Row style={{ width: '100%', height: '100%', padding: 0, margin: 0 }}>
          <Col item xs={5} style={{ padding: '0', height: '100%', margin: 0 }}>
            <div
              style={{
                left: '1%',
                top: '24%',
                position: 'absolute',
                width: '99%',
              }}
            >
              <h2 style={{ textAlign: 'center' }}>Bienvenido</h2>

              <Formik
                initialValues={{ email: '', password: '' }}
                validate={(values) => {
                  const errors: any = {};
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
                        dispatch(set(userSession));
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
                    .catch(() => {
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
                    <Row
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Col xs={12} md={6}>
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
                    <Row
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Col xs={12} md={6}>
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
                      <Col
                        xs={12}
                        md={12}
                        style={{ textAlign: 'center', marginTop: '30px' }}
                      >
                        <Button
                          bsStyle="info"
                          fill
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Iniciar Sesión
                        </Button>
                      </Col>
                    </Row>

                    <div className="clearfix" />
                  </form>
                )}
              </Formik>
            </div>
          </Col>
          <Col item xs={7} style={{ padding: '0', height: '100%' }}>
            <div style={{ width: '100%', height: '100%' }}>
              {isMarisa && (
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={logo}
                  alt="..."
                />
              )}
            </div>
          </Col>
        </Row>
      </Grid>
    </Fragment>
  );
};

export default Login;
