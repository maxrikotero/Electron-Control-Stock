/*eslint-disable */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useRoute from '../../hooks/useRoutes';
import AdminNavbarLinks from '../Navbars/AdminNavbarLinks';
import logo from '../../assets/img/logoicon.jpeg';

const Sidebar = (props) => {
  const [showList, setShowList] = useState(false);
  const [state, setState] = useState({
    width: window.innerWidth,
  });
  const { adminRoutes } = useRoute();

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
  }, []);

  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  };
  const updateDimensions = () => {
    setState({ width: window.innerWidth });
  };

  return (
    <div id="sidebar" className="sidebar">
      <div className="logo">
        <a href="#" className="simple-text logo-mini">
          <div className="logo-img">
            <img src={logo} alt="logo_image" />
          </div>
        </a>
        <a href="#" className="simple-text logo-normal">
          {!props.isMarisa && 'Marisa'}
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          {state.width <= 991 ? <AdminNavbarLinks /> : null}

          {adminRoutes
            .filter((item) => !item.isList)
            .map((prop, key) => {
              if (!prop.redirect && prop.show && !prop.isList)
                return (
                  <li
                    className={
                      prop.upgrade
                        ? 'active active-pro'
                        : activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}
          {/* <li>
            <a
              className="nav-link"
              onClick={() => setShowList((prev) => !prev)}
              style={{ display: 'flex' }}
            >
              <i className="pe-7s-graph2"></i>
              <p>Listados</p>
              <i
                className={`${
                  showList ? 'pe-7s-angle-down' : 'pe-7s-angle-up'
                }`}
                style={{ marginLeft: '10%' }}
              ></i>
            </a>
            <Collapse in={showList}>
              <div>
                <ul className="nav">
                  {adminRoutes
                    .filter((item) => item.isList)
                    .map((prop, key) => {
                      console.log(prop);
                      if (!prop.redirect && prop.show)
                        return (
                          <li
                            className={
                              prop.upgrade
                                ? 'active active-pro'
                                : activeRoute(prop.layout + prop.path)
                            }
                            key={key}
                          >
                            <NavLink
                              to={prop.layout + prop.path}
                              className="nav-link"
                              activeClassName="active"
                            >
                              <i className={prop.icon} />
                              <p>{prop.name}</p>
                            </NavLink>
                          </li>
                        );
                      return null;
                    })}
                </ul>
              </div>
            </Collapse>
          </li> */}
          <li>
            <NavLink
              to="/admin/logout"
              className="nav-link"
              activeClassName="active"
            >
              <i className="pe-7s-power" />
              <p>Cerrar Sesión</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
