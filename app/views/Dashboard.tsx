/*eslint-disable */
import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

import { Card } from '../components/Card/Card';
import { StatsCard } from '../components/StatsCard/StatsCard';
import { NavLink } from 'react-router-dom';
import {
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
} from 'variables/Variables';

class Dashboard extends Component {
  createLegend = (json) => {
    var legend = [];
    for (var i = 0; i < json['names'].length; i++) {
      var type = 'fa fa-circle text-' + json['types'][i];
      legend.push(<i className={type} key={i} />);
      legend.push(' ');
      legend.push(json['names'][i]);
    }
    return legend;
  };
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                statsText="Total Productos en stock"
                statsValue="105GB"
              />
            </Col>
          </Row>
          <Row>
            <Col lg={4} sm={4}>
              <div className="wrimagecard wrimagecard-topimage">
                <NavLink
                  to="/admin/user"
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
                  to="/admin/product"
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
                  to="/admin/provider"
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
          <Row>
            <Col lg={4} sm={4}>
              <div className="wrimagecard wrimagecard-topimage">
                <NavLink to="/admin/sale" className="nav-link">
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
                      Nueva Venta
                      <div className="pull-right badge" id="WrGridSystem"></div>
                    </h6>
                  </div>
                </NavLink>
              </div>
            </Col>
            <Col lg={4} sm={4}>
              <div className="wrimagecard wrimagecard-topimage">
                <NavLink to="/admin/category" className="nav-link">
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
                      Nueva Categoria
                      <div className="pull-right badge" id="WrGridSystem"></div>
                    </h6>
                  </div>
                </NavLink>
              </div>
            </Col>
            <Col lg={4} sm={4}>
              <div className="wrimagecard wrimagecard-topimage">
                <NavLink to="/admin/client" className="nav-link">
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
                      Nuevo Cliente
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
