/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import AdminLayout from './layouts/Admin';

// import './assets/css/animate.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0';
// import './assets/css/demo.css';
// import './assets/css/pe-icon-7-stroke.css';

// Lazily load routes and code split with webpacck
const LazyCounterPage = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
);

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.HOME} component={AdminLayout} />
      </Switch>
    </App>
  );
}
