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
            {this.props.isEdit ? (
              <input 
              type="number"
              onChange={(e) => this.props.setSaleDataTotal(e.target.value)}
              value={this.props.statsValue}
              />
            ): (
              <div>${this.props.statsValue}</div>
            )}
            
          </div>
        </div>
      </div>
    );
  }
}

export default StatsCard;
