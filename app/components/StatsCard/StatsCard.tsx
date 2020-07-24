/*eslint-disable */
import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export class StatsCard extends Component {
  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <NavLink
            to={this.props.to}
            className="nav-link"
            activeClassName="active"
          >
            {/* <i className={prop.icon} /> */}
            <p>{this.props.statsText}</p>
          </NavLink>
          <div className="footer"></div>
        </div>
      </div>
    );
  }
}

export default StatsCard;
