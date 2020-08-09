/*eslint-disable */
import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';
import { Card } from '../components/Card/Card';
import {
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
} from 'variables/Variables';

class Reports extends Component {
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
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Reports;
