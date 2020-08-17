/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import App from './containers/App';
import AdminLayout from './layouts/Admin';
import Login from './views/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';
import './assets/css/app.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Routes() {
  const { loading } = useSelector(({ apiCallStatus }) => apiCallStatus);
  return (
    <App>
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={200}
        visible={loading}
        width={200}
        style={{
          position: 'absolute',
          zIndex: 500,
          height: '100%',
          width: '100%',
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/admin" component={AdminLayout} />
      </Switch>
    </App>
  );
}
