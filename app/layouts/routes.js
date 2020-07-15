/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from '../views/Dashboard';
import UserProfile from '../views/UserProfile';
import TableList from '../views/TableList';
import Typography from '../views/Typography';
import Icons from '../views/Icons';
import Maps from '../views/Maps';
import Notifications from '../views/Notifications';
import Upgrade from '../views/Upgrade';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    // icon: 'pe-7s-graph',
    component: TableList,
    layout: '/admin',
  },
  {
    path: '/principal',
    name: 'Principal',
    // icon: 'pe-7s-graph',
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/inventario',
    name: 'Inventario General',
    // icon: 'pe-7s-user',
    component: TableList,
    layout: '/admin',
  },
  // {
  //   path: '/table',
  //   name: 'Table List',
  //   icon: 'pe-7s-note2',
  //   component: TableList,
  //   layout: '/admin',
  // },
  // {
  //   path: '/typography',
  //   name: 'Typography',
  //   icon: 'pe-7s-news-paper',
  //   component: Typography,
  //   layout: '/admin',
  // },
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   icon: 'pe-7s-science',
  //   component: Icons,
  //   layout: '/admin',
  // },
  // {
  //   path: '/maps',
  //   name: 'Maps',
  //   icon: 'pe-7s-map-marker',
  //   component: Maps,
  //   layout: '/admin',
  // },
  // {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   icon: 'pe-7s-bell',
  //   component: Notifications,
  //   layout: '/admin',
  // },
  // {
  //   upgrade: true,
  //   path: '/upgrade',
  //   name: 'Upgrade to PRO',
  //   icon: 'pe-7s-rocket',
  //   component: Upgrade,
  //   layout: '/admin',
  // },
];

export default dashboardRoutes;
