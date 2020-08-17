import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { StatsCard } from '../components/StatsCard/StatsCard';
import { NavLink } from 'react-router-dom';

const DashboardCards = () => {
  const { sessionData } = useSelector(({ user }) => user);

  const {
    isAdmin = false,
    isSeller = false,
    isControlStock = false,
  } = sessionData;

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
          {[
            { to: '/admin/client', title: 'Nuevo Cliente ', show: isAdmin },
            {
              to: '/admin/category',
              title: 'Nueva Categoria',
              show: isAdmin || isControlStock,
            },
            {
              to: '/admin/sale',
              title: ' Nueva Venta',
              show: isAdmin || isSeller,
            },
            { to: '/admin/user', title: 'Agregar Usuario', show: isAdmin },
            {
              to: '/admin/product',
              title: 'Agregar Producto',
              show: isAdmin || isControlStock,
            },
            {
              to: '/admin/provider',
              title: 'Agregar Cliente',
              show: isAdmin,
            },
          ].map((card) => {
            return (
              <>
                {(card.show && (
                  <Col lg={4} sm={4}>
                    <div className="wrimagecard wrimagecard-topimage">
                      <NavLink
                        to={card.to}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <div
                          className="wrimagecard-topimage_header"
                          style={{ backgroundColor: 'rgba(51, 105, 232, 0.1)' }}
                        >
                          <i
                            className="fa fa-user"
                            style={{ color: '#3369e8' }}
                          >
                            {' '}
                          </i>
                        </div>
                        <div className="wrimagecard-topimage_title">
                          <h6>
                            {card.title}
                            <div
                              className="pull-right badge"
                              id="WrGridSystem"
                            ></div>
                          </h6>
                        </div>
                      </NavLink>
                    </div>
                  </Col>
                )) || <></>}
              </>
            );
          })}
        </Row>
      </Grid>
    </div>
  );
};

export default DashboardCards;
