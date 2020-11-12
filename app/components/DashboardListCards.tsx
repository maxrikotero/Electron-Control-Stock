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
              iconClass: 'pe-7s-id',
            },
            {
              to: '/admin/rawmaterials',
              title: 'Materia Prima',
              show: isAdmin,
              iconClass: 'pe-7s-id',
            },
            {
              to: '/admin/sales',
              title: 'Ventas',
              iconClass: 'pe-7s-note2',

              show: isAdmin || isControlStock,
            },
            // {
            //   to: '/admin/sale',
            //   title: 'Nueva Venta',
            //   iconClass: 'pe-7s-cash',
            //   show: isAdmin || isSeller,
            // },
            // {
            //   to: '/admin/user',
            //   title: 'Agregar Usuario',
            //   show: isAdmin,
            //   iconClass: 'pe-7s-add-user',
            // },
            // {
            //   to: '/admin/product',
            //   title: 'Agregar Producto',

            //   iconClass: 'pe-7s-cart',
            //   show: isAdmin || isControlStock,
            // },
            {
              to: '/admin/providers',
              title: 'Proveedores',
              iconClass: 'pe-7s-add-user',
              show: isAdmin || isControlStock,
            },
            // {
            //   to: '/admin/payment',
            //   title: 'Agregar Forma de pago',
            //   iconClass: 'pe-7s-credit',
            //   show: isAdmin,
            // },
            // {
            //   to: '/admin/pricetype',
            //   title: 'Agregar Tipo de precio',
            //   iconClass: 'pe-7s-wallet',
            //   show: isAdmin,
            // },
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
