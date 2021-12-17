import React from 'react';
import { Route, Switch } from 'react-router-dom';
import useRoute from '../hooks/useRoutes';
import LogOut from '../views/LogOut';

const AdminRoutes = ({ notification }) => {
  const { adminRoutes } = useRoute();

  const getRoutes = () => {
    return adminRoutes.map((prop, key) => {
      if (prop.layout === '/admin' && prop.show) {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component
                {...{ ...props, ...prop }}
                notification={notification}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <Switch>
      {getRoutes()}
      <Route render={() => <LogOut />} path="/admin/logout" />
    </Switch>
  );
};

export default AdminRoutes;
