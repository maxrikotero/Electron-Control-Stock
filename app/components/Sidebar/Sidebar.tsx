/*eslint-disable */
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import useRoute from '../../hooks/useRoutes';
import AdminNavbarLinks from '../Navbars/AdminNavbarLinks';

// import logo from '../../assets/img/reactlogo.png';

const Sidebar = (props) => {
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

  const sidebarBackground = {
    backgroundImage: 'url(' + props.image + ')',
  };
  return (
    <div id="sidebar" className="sidebar">
      <div className="logo">
        <a
          href="https://www.creative-tim.com?ref=lbd-sidebar"
          className="simple-text logo-mini"
        >
          <div className="logo-img">
            {/* <img src={logo} alt="logo_image" /> */}
          </div>
        </a>
        <a
          href="https://www.creative-tim.com?ref=lbd-sidebar"
          className="simple-text logo-normal"
        >
          {!props.isMarisa && 'Marisa'}
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          {state.width <= 991 ? <AdminNavbarLinks /> : null}

          {adminRoutes.map((prop, key) => {
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
          <li>
            <NavLink
              to="/admin/logout"
              className="nav-link"
              activeClassName="active"
            >
              <p>Cerrar Session</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
