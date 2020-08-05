/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import decode from 'jwt-decode';
import routes from './constants/routes.json';
import App from './containers/App';
import AdminLayout from './layouts/Admin';
import AddUser from './views/AddUser';
import Login from './views/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';
import './assets/css/app.css';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  let isValid = false;
  try {
    isValid = decode(token);
  } catch (e) {
    return false;
  }

  return isValid;
};

// const PrivateRoute = (props) => {
//   isAuthenticated() ? <Route {...props} /> : <Redirect to="/login" />;
// };

const Home = () => <div>Home</div>;

// const Login = () => <Redirect to="/home" />;

const Logout = () => {
  return <div>Logout</div>;
};

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/admin" component={AdminLayout} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </App>
  );
}
