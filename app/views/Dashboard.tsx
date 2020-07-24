/*eslint-disable */
import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

import { Card } from '../components/Card/Card';
import { StatsCard } from '../components/StatsCard/StatsCard';
import { NavLink } from 'react-router-dom';
import { Tasks } from '../components/Tasks/Tasks';
// import {
//   dataPie,
//   legendPie,
//   dataSales,
//   optionsSales,
//   responsiveSales,
//   legendSales,
//   dataBar,
//   optionsBar,
//   responsiveBar,
//   legendBar,
// } from 'variables/Variables.jsx';

class Dashboard extends Component {
  // createLegend(json) {
  //   var legend = [];
  //   for (var i = 0; i < json['names'].length; i++) {
  //     var type = 'fa fa-circle text-' + json['types'][i];
  //     legend.push(<i className={type} key={i} />);
  //     legend.push(' ');
  //     legend.push(json['names'][i]);
  //   }
  //   return legend;
  // }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={4} sm={4}>
              <div className="wrimagecard wrimagecard-topimage">
                <NavLink
                  to="/user"
                  className="nav-link"
                  activeClassName="active"
                >
                  <div
                    className="wrimagecard-topimage_header"
                    style={{ backgroundColor: 'rgba(51, 105, 232, 0.1)' }}
                  >
                    <i className="fa fa-user" style={{ color: '#3369e8' }}>
                      {' '}
                    </i>
                  </div>
                  <div className="wrimagecard-topimage_title">
                    <h6>
                      Agregar Usuario
                      <div className="pull-right badge" id="WrGridSystem"></div>
                    </h6>
                  </div>
                </NavLink>
              </div>
            </Col>

            <Col lg={4} sm={4}>
              <div className="wrimagecard wrimagecard-topimage">
                <NavLink
                  to="/product"
                  className="nav-link"
                  activeClassName="active"
                >
                  <div
                    className="wrimagecard-topimage_header"
                    style={{ backgroundColor: 'rgba(51, 105, 232, 0.1)' }}
                  >
                    <i
                      className="fa fa-product-hunt"
                      style={{ color: '#3369e8' }}
                    >
                      {' '}
                    </i>
                  </div>
                  <div className="wrimagecard-topimage_title">
                    <h6>
                      Agregar Producto
                      <div className="pull-right badge" id="WrGridSystem"></div>
                    </h6>
                  </div>
                </NavLink>
              </div>
            </Col>
            <Col lg={4} sm={4}>
              <div className="wrimagecard wrimagecard-topimage">
                <NavLink
                  to="/provider"
                  className="nav-link"
                  activeClassName="active"
                >
                  <div
                    className="wrimagecard-topimage_header"
                    style={{ backgroundColor: 'rgba(51, 105, 232, 0.1)' }}
                  >
                    <i className="fa fa-industry" style={{ color: '#3369e8' }}>
                      {' '}
                    </i>
                  </div>
                  <div className="wrimagecard-topimage_title">
                    <h6>
                      Agregar Proveedor
                      <div className="pull-right badge" id="WrGridSystem"></div>
                    </h6>
                  </div>
                </NavLink>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
