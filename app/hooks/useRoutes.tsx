import { useSelector } from 'react-redux';
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
import AddUser from '../views/AddUser';
import AddClient from '../views/AddClient';
import ClientList from '../views/ClientList';
import AddCategory from '../views/AddCategory';
import ProvidertList from '../views/ProvidertList';
import CategoryList from '../views/CategoryList';
import Reports from '../views/Reports';
import AddProduct from '../views/AddProduct';
import AddProvider from '../views/AddProvider';
import AddSale from '../views/AddSales';

const useRoutes = () => {
  const { sessionData } = useSelector(({ user }) => user);

  const {
    isAdmin = false,
    isSeller = false,
    isControlStock = false,
  } = sessionData;

  const adminRoutes = [
    {
      path: '/client',
      name: 'Agregar Client',
      // icon: 'pe-7s-graph',
      component: AddClient,
      layout: '/admin',
      show: isAdmin,
      redirect: true,
    },

    {
      path: '/sale',
      name: 'Agregar Venta',
      // icon: 'pe-7s-graph',
      component: AddSale,
      layout: '/admin',
      show: isAdmin || isSeller,
      redirect: true,
    },

    {
      path: '/provider',
      name: 'Agregar Proveedor',
      // icon: 'pe-7s-graph',
      component: AddProvider,
      layout: '/admin',
      show: isAdmin || isControlStock,
      redirect: true,
    },

    {
      path: '/product',
      name: 'Agregar Producto',
      // icon: 'pe-7s-graph',
      component: AddProduct,
      layout: '/admin',
      show: isAdmin || isControlStock,
      redirect: true,
    },
    {
      path: '/user',
      name: 'Agregar Usuario',
      // icon: 'pe-7s-graph',
      component: AddUser,
      show: isAdmin,
      layout: '/admin',
      redirect: true,
    },
    {
      path: '/category',
      name: 'Agregar Categoria',
      show: isAdmin || isControlStock,
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
      show: true,
      layout: '/admin',
    },
    {
      path: '/report',
      name: 'Reportes',
      show: isAdmin,
      // icon: 'pe-7s-graph',
      component: Reports,
      layout: '/admin',
    },
    {
      path: '/perfil',
      name: 'Perfil',
      show: true,
      // icon: 'pe-7s-graph',
      component: UserProfile,
      layout: '/admin',
    },
    {
      path: '/inventario',
      name: 'Inventario General',
      show: isAdmin || isControlStock,
      // icon: 'pe-7s-user',
      component: ProductList,
      layout: '/admin',
    },
    {
      path: '/sales',
      name: 'Ventas',
      show: isAdmin || isSeller,
      // icon: 'pe-7s-user',
      component: Sales,
      layout: '/admin',
    },
    {
      path: '/providers',
      name: 'Proveedores',
      // icon: 'pe-7s-user',
      show: isAdmin || isControlStock,
      component: ProvidertList,
      layout: '/admin',
    },
    {
      path: '/categories',
      name: 'Categorias',
      show: isAdmin || isControlStock,
      // icon: 'pe-7s-user',
      component: CategoryList,
      layout: '/admin',
    },
    {
      path: '/clients',
      name: 'Clientes',
      show: isAdmin,
      // icon: 'pe-7s-graph',
      component: ClientList,
      layout: '/admin',
    },
  ];

  return {
    adminRoutes,
  };
};

export default useRoutes;
