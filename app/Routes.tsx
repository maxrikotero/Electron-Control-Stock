/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import AdminLayout from './layouts/Admin';

import './assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.HOME} component={AdminLayout} />
      </Switch>
    </App>
  );
}
