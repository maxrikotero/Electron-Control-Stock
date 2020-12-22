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
import Dashboard from '../components/DashboardCards';
import DashboardListCards from '../components/DashboardListCards';
import UserProfile from '../views/UserProfile';
import ProductList from '../views/ProductList';
import RawMaterialList from '../views/RawMaterialList';
import Sales from '../views/SalesList';
import AddUser from '../views/AddUser';
import AddClient from '../views/AddClient';
import OrderProvider from '../views/forms/OrderProvider';
import ClientList from '../views/ClientList';
import DailyEntryList from '../views/list/DailyEntryList';
import AddCategory from '../views/AddCategory';
import DailyEntry from '../views/forms/DailyEntry';
import ProvidertList from '../views/ProvidertList';
import CategoryList from '../views/CategoryList';
import Reports from '../views/Reports';
import AddProduct from '../views/AddProduct';
import AddProvider from '../views/AddProvider';
import AddSale from '../views/AddSales';
import UserList from '../views/UserList';
import AuditList from '../views/AuditList';
import AddPayment from '../views/AddPayment';
import Balance from '../views/Balance';
import PriceType from '../views/PriceType';
import PaymentsList from '../views/PaymentsList';
import PriceTypeList from '../views/PriceTypeList';
import AddRawMaterial from '../views/AddRawMaterial';
import Process from '../views/Process';
import OrderList from '../views/list/OrderList';
import BalanceList from '../views/list/BalanceList';
import Delivery from '../views/forms/Delivery';

const useRoutes = () => {
  const { sessionData } = useSelector(({ user }) => user);

  const {
    isAdmin = false,
    isSeller = false,
    isControlStock = false,
  } = sessionData;

  const adminRoutes = [
    {
      path: '/orderprovider',
      name: 'Nuevo pedido a proveedores',
      icon: 'pe-7s-graph',
      component: OrderProvider,
      layout: '/admin',
      show: isAdmin,
      redirect: true,
    },
    {
      path: '/client',
      name: 'Agregar Client',
      icon: 'pe-7s-graph',
      component: AddClient,
      layout: '/admin',
      show: isAdmin,
      redirect: true,
    },

    {
      path: '/sale',
      name: 'Agregar Venta',
      icon: 'pe-7s-graph',
      component: AddSale,
      layout: '/admin',
      show: isAdmin || isSeller,
      redirect: true,
    },

    {
      path: '/provider',
      name: 'Nuevo Proveedor',
      // icon: 'pe-7s-graph',
      component: AddProvider,
      layout: '/admin',
      show: isAdmin || isControlStock,
      redirect: true,
    },
    {
      path: '/product',
      name: 'Nuevo Producto',
      // icon: 'pe-7s-graph',
      component: AddProduct,
      layout: '/admin',
      show: isAdmin || isControlStock,
      redirect: true,
    },
    {
      path: '/rawmaterial',
      name: 'Nueva Materia Prima',
      // icon: 'pe-7s-graph',
      component: AddRawMaterial,
      layout: '/admin',
      show: isAdmin || isControlStock,
      redirect: true,
    },
    {
      path: '/user',
      name: 'Nuevo Usuario',
      icon: 'pe-7s-user',
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
      path: '/dailyentry',
      name: 'Agregar Diaria',
      show: isAdmin || isControlStock,
      // icon: 'pe-7s-graph',
      component: DailyEntry,
      layout: '/admin',
      redirect: true,
    },
    {
      path: '/delivery',
      name: 'Agregar Entregado',
      show: isAdmin || isControlStock,
      // icon: 'pe-7s-graph',
      component: Delivery,
      layout: '/admin',
      redirect: true,
    },
    {
      path: '/principal',
      name: 'Principal',
      icon: 'pe-7s-graph',
      component: Dashboard,
      show: true,
      layout: '/admin',
    },
    {
      path: '/process',
      name: 'Proceso',
      icon: 'pe-7s-graph',
      component: Process,
      show: isAdmin,
      layout: '/admin',
    },
    {
      path: '/list',
      name: 'Listados',
      icon: 'pe-7s-news-paper',
      component: DashboardListCards,
      show: true,
      layout: '/admin',
    },
    {
      path: '/balance',
      name: 'Caja',
      icon: 'pe-7s-piggy',
      component: Balance,
      show: true,
      layout: '/admin',
    },
    {
      path: '/report',
      name: 'Reportes',
      show: isAdmin,
      icon: 'pe-7s-graph2',
      component: Reports,
      layout: '/admin',
    },
    {
      path: '/perfil',
      name: 'Perfil',
      show: true,
      icon: 'pe-7s-user',
      component: UserProfile,
      layout: '/admin',
    },
    {
      path: '/inventario',
      name: 'Productos ',
      show: isAdmin || isControlStock,
      icon: 'pe-7s-news-paper',
      component: ProductList,
      layout: '/admin',
      isList: true,
      redirect: true,
    },
    {
      path: '/rawmaterials',
      name: 'Materia Primas',
      show: isAdmin || isControlStock,
      icon: 'pe-7s-news-paper',
      component: RawMaterialList,
      layout: '/admin',
      isList: true,
      redirect: true,
    },
    {
      path: '/sales',
      name: 'Ventas',
      show: isAdmin || isSeller,
      icon: 'pe-7s-news-paper',
      component: Sales,
      layout: '/admin',
      isList: true,
      redirect: true,
    },
    {
      path: '/providers',
      name: 'Proveedores',
      icon: 'pe-7s-news-paper',
      show: isAdmin || isControlStock,
      component: ProvidertList,
      layout: '/admin',
      isList: true,
      redirect: true,
    },
    {
      path: '/categories',
      name: 'Categorias',
      show: isAdmin || isControlStock,
      icon: 'pe-7s-news-paper',
      component: CategoryList,
      layout: '/admin',
      isList: true,
      redirect: true,
    },
    {
      path: '/clients',
      name: 'Clientes',
      show: isAdmin,
      icon: 'pe-7s-news-paper',
      component: ClientList,
      layout: '/admin',
      isList: true,
      redirect: true,
    },
    {
      path: '/dailylist',
      name: 'Diarias',
      show: isAdmin,
      icon: 'pe-7s-news-paper',
      component: DailyEntryList,
      layout: '/admin',
      isList: true,
      redirect: true,
    },
    {
      path: '/users',
      name: 'Listado Usuario',
      icon: 'pe-7s-users',
      component: UserList,
      layout: '/admin',
      show: isAdmin,
      isList: true,
      redirect: true,
    },
    {
      path: '/audits',
      name: 'Listado Auditoria',
      icon: 'pe-7s-news-paper',
      component: AuditList,
      layout: '/admin',
      show: isAdmin,
      isList: true,
      redirect: true,
    },
    {
      path: '/payment',
      name: 'Tipo del pagos',
      icon: 'pe-7s-news-paper',
      component: AddPayment,
      layout: '/admin',
      show: isAdmin,
      redirect: true,
    },
    {
      path: '/pricetype',
      name: 'Tipo de precios',
      icon: 'pe-7s-news-paper',
      type: 'Agregar ´Precio',
      method: 'POST',
      title: ' Nuevo tipo de precio',
      successMessage: 'Tipo de precio agregado',
      component: PriceType,
      layout: '/admin',
      show: isAdmin,
      redirect: true,
    },
    {
      path: '/pricetypes',
      name: 'Listado Precios',
      icon: 'pe-7s-news-paper',
      component: PriceTypeList,
      layout: '/admin',
      show: isAdmin,
      isList: true,
      redirect: true,
    },
    {
      path: '/payments',
      name: 'Listado Pagos',
      icon: 'pe-7s-news-paper',
      component: PaymentsList,
      layout: '/admin',
      show: isAdmin,
      isList: true,
      redirect: true,
    },
    {
      path: '/orders',
      name: 'Pedidos Proveedores',
      icon: 'pe-7s-news-paper',
      component: OrderList,
      layout: '/admin',
      show: isAdmin,
      isList: true,
      redirect: true,
    },
    {
      path: '/balances',
      name: 'Cajas',
      icon: 'pe-7s-news-paper',
      component: BalanceList,
      layout: '/admin',
      show: isAdmin,
      isList: true,
      redirect: true,
    },
  ];

  return {
    adminRoutes,
  };
};

export default useRoutes;
