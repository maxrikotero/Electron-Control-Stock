/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable */
import React, { Component } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import AdminNavbar from '../components/Navbars/AdminNavbar';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import FixedPlugin from '../components/FixedPlugin/FixedPlugin';
import AddUser from '../views/AddUser';
import AddProduct from '../views/AddProduct';
import AddProvider from '../views/AddProvider';
import AddSale from '../views/AddSales';
import LogOut from '../views/LogOut';

import { style } from '../variables/Variables';

import routes from './routes';

import image from '../assets/img/sidebar-3.jpg';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: 'black',
      hasImage: true,
      fixedClasses: 'dropdown show-dropdown open',
    };
  }
  handleNotificationClick = (position, message, color) => {
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
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: <div>{message}</div>,
      level: level,
      position: position,
      autoDismiss: 15,
    });
  };
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component
                {...props}
                notification={this.handleNotificationClick}
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
  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };
  handleImageClick = (image) => {
    this.setState({ image: image });
  };
  handleColorClick = (color) => {
    this.setState({ color: color });
  };
  handleHasImage = (hasImage) => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === 'dropdown') {
      this.setState({ fixedClasses: 'dropdown show-dropdown open' });
    } else {
      this.setState({ fixedClasses: 'dropdown' });
    }
  };
  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
    }
    if (e.history.action === 'PUSH') {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  render() {
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar
          {...this.props}
          routes={routes}
          image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage}
        />
        <div
          id="main-panel"
          className="main-panel"
          ref="mainPanel"
          style={{ height: '100%' }}
        >
          <Switch>
            {this.getRoutes(routes)}

            <Route
              render={() => (
                <AddProduct notification={this.handleNotificationClick} />
              )}
              path="/admin/product"
            />
            <Route
              render={() => (
                <AddProvider notification={this.handleNotificationClick} />
              )}
              path="/admin/provider"
            />
            <Route
              render={() => (
                <AddSale notification={this.handleNotificationClick} />
              )}
              path="/admin/sale"
            />
            <Route render={() => <LogOut />} path="/admin/logout" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Admin;
