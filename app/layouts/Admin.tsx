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
import NotificationSystem from 'react-notification-system';
import Sidebar from '../components/Sidebar/Sidebar';
import AdminRoutes from '../components/AdminRoutes';

import { style } from '../variables/Variables';

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
      title: <span data-notify="icon" className="pe-7s-bell" />,
      message: <div>{message}</div>,
      level: level,
      position: position,
      autoDismiss: 15,
    });
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
          <AdminRoutes notification={this.handleNotificationClick} />
        </div>
      </div>
    );
  }
}

export default Admin;
