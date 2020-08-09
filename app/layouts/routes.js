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
import ProductList from '../views/ProductList';
import Sales from '../views/SalesList';
import AddSale from '../views/AddSales';
import Typography from '../views/Typography';
import Icons from '../views/Icons';
import Maps from '../views/Maps';
import Notifications from '../views/Notifications';
import Upgrade from '../views/Upgrade';
import AddUser from '../views/AddUser';
import AddCategory from '../views/AddCategory';
import ProvidertList from '../views/ProvidertList';
import CategoryList from '../views/CategoryList';
import Reports from '../views/Reports';

const dashboardRoutes = [
  {
    path: '/user',
    name: 'Agregar Usuario',
    // icon: 'pe-7s-graph',
    component: AddUser,
    layout: '/admin',
    redirect: true,
  },
  {
    path: '/category',
    name: 'Agregar Categoria',
    // icon: 'pe-7s-graph',
    component: AddCategory,
    layout: '/admin',
    redirect: true,
  },
  {
    path: '/principal',
    name: 'Principal',
    // icon: 'pe-7s-graph',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/report',
    name: 'Reportes',
    // icon: 'pe-7s-graph',
    component: Reports,
    layout: '/admin',
  },
  {
    path: '/perfil',
    name: 'Perfil',
    // icon: 'pe-7s-graph',
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/inventario',
    name: 'Inventario General',
    // icon: 'pe-7s-user',
    component: ProductList,
    layout: '/admin',
  },
  {
    path: '/sales',
    name: 'Ventas',
    // icon: 'pe-7s-user',
    component: Sales,
    layout: '/admin',
  },
  {
    path: '/providers',
    name: 'Proveedores',
    // icon: 'pe-7s-user',
    component: ProvidertList,
    layout: '/admin',
  },
  {
    path: '/categories',
    name: 'Categorias',
    // icon: 'pe-7s-user',
    component: CategoryList,
    layout: '/admin',
  },
];

export default dashboardRoutes;
