/*eslint-disable */
import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export class StatsCard extends Component {
  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <Row>
            <Col xs={12}>
              <div>
                <p>{this.props.statsText}</p>
              </div>
            </Col>
          </Row>
          <div className="footer">
            <hr />
            <div>{this.props.statsValue}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatsCard;
