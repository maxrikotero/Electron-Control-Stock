import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const DashboardListCards = () => {
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
          {[
            {
              to: '/admin/inventario',
              title: 'Productos',
              show: isAdmin,
              iconClass: 'pe-7s-note2',
            },
            {
              to: '/admin/rawmaterials',
              title: 'Materia Primas',
              show: isAdmin,
              iconClass: 'pe-7s-note2',
            },
            {
              to: '/admin/sales',
              title: 'Ventas',
              iconClass: 'pe-7s-note2',

              show: isAdmin || isControlStock,
            },
            {
              to: '/admin/pricetypes',
              title: 'Tipo de Precios',
              iconClass: 'pe-7s-note2',

              show: isAdmin || isControlStock,
            },
            {
              to: '/admin/payments',
              title: 'Tipos de pagos',
              iconClass: 'pe-7s-note2',

              show: isAdmin || isControlStock,
            },

            {
              to: '/admin/providers',
              title: 'Proveedores',
              iconClass: 'pe-7s-note2',
              show: isAdmin || isControlStock,
            },
            {
              to: '/admin/balance',
              title: 'Caja',
              iconClass: 'pe-7s-credit',
              show: isAdmin,
            },
            {
              to: '/admin/categories',
              title: 'Categorias',
              iconClass: 'pe-7s-note2',
              show: isAdmin || isControlStock,
            },
            {
              to: '/admin/clients',
              title: 'Clientes',
              iconClass: 'pe-7s-note2',
              show: isAdmin,
            },
            {
              to: '/admin/users',
              title: 'Usuarios',
              iconClass: 'pe-7s-note2',
              show: isAdmin,
            },
            {
              to: '/admin/audits',
              title: 'Auditorias',
              iconClass: 'pe-7s-note2',
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
                            className={card.iconClass}
                            aria-hidden="true"
                            style={{ color: '#3369e8', fontSize: '70px' }}
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

export default DashboardListCards;
