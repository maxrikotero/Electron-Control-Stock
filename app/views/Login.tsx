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
import logo from '../assets/img/logo.jpeg';
import './Login.css';

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

  return (
    <Fragment key="loginFragment">
      <NotificationSystem ref={notificationSystem} style={style} />
      {redirection && <Redirect to="/admin/principal" />}
      <div className="login__content">
        <div className="login">
          <div className="login_header">
            <img className="login__logo" src={logo} alt="..." />
          </div>
        </div>
        <div className="form_content">
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
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
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
              <form className="form_body" onSubmit={handleSubmit}>
                <div className="input__content">
                  <FormGroup controlId="emailControl">
                    <ControlLabel
                      style={{ fontWeight: 'initial', fontSize: '15px' }}
                    >
                      Email
                    </ControlLabel>
                    <FormControl
                      type="email"
                      name="email"
                      onChange={handleChange}
                      bsClass="form-control"
                      value={values.email}
                    />
                  </FormGroup>
                  <span style={{ color: 'red' }}> {errors.email}</span>
                </div>

                <div className="input__content">
                  <FormGroup controlId="passControl">
                    <ControlLabel
                      style={{ fontWeight: 'initial', fontSize: '15px' }}
                    >
                      Password
                    </ControlLabel>
                    <FormControl
                      type="password"
                      name="password"
                      onChange={handleChange}
                      bsClass="form-control"
                      value={values.password}
                    />
                  </FormGroup>
                  <span style={{ color: 'red' }}>
                    {' '}
                    {errors.password && touched.password && errors.password}
                  </span>
                </div>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                  <Button
                    bsStyle="info"
                    fill
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Iniciar Sesión
                  </Button>
                </div>

                <div className="clearfix" />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
