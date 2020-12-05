import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  Row,
  Col,
  FormControl,
  Collapse,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const DashboardListCards = () => {
  const { sessionData } = useSelector(({ user }) => user);
  const [search, setSearch] = useState({
    showSearch: false,
    query: '',
  });

  const { showSearch, query } = search;

  useEffect(() => {
    if (!showSearch && query.length > 0)
      setSearch((prev) => ({ ...prev, query: '' }));
  }, [showSearch]);

  const {
    isAdmin = false,
    isSeller = false,
    isControlStock = false,
  } = sessionData;

  const tooltip = <Tooltip id="remove_tooltip">Buscar Tarjetas</Tooltip>;

  return (
    <div className="content">
      <div
        style={{
          width: '30px',
          position: 'absolute',
          right: '10px',
          top: '1px',
          zIndex: '10',
        }}
        onClick={() =>
          setSearch((prev) => ({ ...prev, showSearch: !prev.showSearch }))
        }
      >
        <OverlayTrigger placement="left" overlay={tooltip}>
          <i
            className="pe-7s-search"
            style={{ fontSize: 30, cursor: 'pointer' }}
          ></i>
        </OverlayTrigger>
      </div>
      <Collapse in={showSearch}>
        <div
          style={{
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <FormControl
              type="text"
              value={query}
              style={{ width: '30%' }}
              placeholder="Buscar Tarjetas"
              onChange={({ target: { value } }) =>
                setSearch((prev) => ({ ...prev, query: value }))
              }
            />
          </div>
        </div>
      </Collapse>
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
            {
              to: '/admin/orders',
              title: 'Pedidos Proveedores',
              iconClass: 'pe-7s-note2',
              show: isAdmin,
            },
          ]
            .filter((route) =>
              showSearch && query.length > 0
                ? route.title.toLowerCase().indexOf(query.toLowerCase()) > -1
                : true
            )
            .map((card) => {
              return (
                <React.Fragment>
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
                            style={{
                              backgroundColor: 'rgba(51, 105, 232, 0.1)',
                            }}
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
                </React.Fragment>
              );
            })}
        </Row>
      </Grid>
    </div>
  );
};

export default DashboardListCards;
