/*eslint-disable */
import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

import { Card } from '../components/Card/Card';
import { StatsCard } from '../components/StatsCard/StatsCard';
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
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Agregar Usuario"
                to="/user"
              />
            </Col>
          </Row>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Agregar Producto"
                to="/product"
              />
            </Col>
          </Row>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Agregar Proveedor"
                to="/provider"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
