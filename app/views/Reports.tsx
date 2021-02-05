import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  FormGroup,
  ControlLabel,
  Well,
  Tabs,
  Tab,
  FormControl,
} from 'react-bootstrap';
import useApiCall from '../hooks/useApiCall';
import HeaderTitle from '../components/HeaderTitle';

const Reports = () => {
  const [sales, setSales] = useState([]);
  const [balances, setBalances] = useState([]);
  const [products, setProducts] = useState([]);
  const [priceMovements, setPriceMovements] = useState([]);
  const [balanceType, setBalanceType] = useState(1);
  const [productSelected, setProductSelected] = useState(null);
  const [tabSelected, setTabSelect] = useState(1);
  const [startDate, setStartDate] = useState(new Date().getFullYear());
  const dispatch = useDispatch();

  const getPriceMovement = async () => {
    const {data} = await useApiCall({
      url: 'pricemovement',
      loadingOn: true,
      method: 'POST',
      body: JSON.stringify({
        year: startDate,
        productId: '5fb2945511cb515058b8ef63',
      }),
      dispatch,
    });
    if (data) setPriceMovements(data);
  };


  useEffect(() => {
    if (productSelected) getPriceMovement();
  }, [productSelected]);

  const getProducts = async () => {
    const response = await useApiCall({
      url: 'products',
    });
    if (response) setProducts(response);
  };

  useEffect(() => {
    const getSales = async () => {
      const data = await useApiCall({
        url: 'sales',
        loadingOn: true,
        dispatch,
      });
      if (data) setSales(data.data);
    };
    const getBalances = async () => {
      const data = await useApiCall({
        url: 'balance',
        loadingOn: true,
        dispatch,
      });
      if (data) setBalances(data);
    };
    getSales();
    getBalances();
    getProducts();
  }, []);

  const filterByMonth = (month, year = 2010) => {
    const totalMonth = sales
      .filter(
        (sale) =>
          new Date(sale.paidAt).getMonth() + 1 === month &&
          new Date(sale.paidAt).getFullYear() === year
      )
      .reduce((acc, item) => acc + item.totalPrice, 0);
    return totalMonth;
  };

  const filterBalanceByMonth = (month, year = 2010) => {
    const totalMonth = balances
      .filter(
        (balance) =>
          new Date(balance.createAt).getMonth() + 1 === month &&
          new Date(balance.createAt).getFullYear() === year
      )
      .reduce(
        (acc, x) =>
          acc +
          (x[balanceType === 1 ? 'incomes' : 'exits'] || []).reduce(
            (acch, h) => acch + h.amount,
            0
          ),
        0
      );
    return totalMonth;
  };

  const filterBy = (month, startDate) =>
    tabSelected === 1
      ? filterByMonth(month, startDate)
      : filterBalanceByMonth(month, startDate);

  const data = {
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    datasets: [
      {
        label:
          tabSelected === 1
            ? 'Ventas Por Mes'
            : `Tipo de movimento ${balanceType === 1 ? 'Ingresos' : 'Egresos'}`,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [
          filterBy(1, startDate),
          filterBy(2, startDate),
          filterBy(3, startDate),
          filterBy(4, startDate),
          filterBy(5, startDate),
          filterBy(6, startDate),
          filterBy(7, startDate),
          filterBy(8, startDate),
          filterBy(9, startDate),
          filterBy(10, startDate),
          filterBy(11, startDate),
          filterBy(12, startDate),
        ],
      },
    ],
  };

  const handleSelect = (key) => {
    setTabSelect(key);
  };
  return (
    <div className="App">
      <HeaderTitle title={'Reportes'} link={false} />
      <Well
        style={{
          background: '#fff',
          textAlign: 'center',
          padding: 0,
          color: '#034f84',
        }}
      >
        <Tabs
          defaultActiveKey={1}
          animation={false}
          id="noanim-tab-example"
          onSelect={handleSelect}
          activeKey={tabSelected}
        >
          <Tab eventKey={1} title="Ventas">
            <div style={{ padding: '20px' }}>
              <div>
                <h2>Ventas Por Mes</h2>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FormGroup
                  controlId="yearControl"
                  style={{ display: 'grid', textAlign: 'center' }}
                >
                  <ControlLabel>Año</ControlLabel>
                  <input
                    type="number"
                    min="1900"
                    max="3000" // This is only for this year, we won't be here - we deaded
                    step="1"
                    value={startDate}
                    onChange={({ target: { value } }) =>
                      setStartDate(parseInt(value))
                    }
                  ></input>
                </FormGroup>
              </div>
              <Bar
                data={sales.length > 0 ? data : []}
                width={50}
                height={50}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </Tab>
          <Tab eventKey={2} title="Cajas">
            <div style={{ padding: '20px' }}>
              <div>
                <h2>Cajas Por Mes</h2>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FormGroup
                  controlId="yearControl"
                  style={{ display: 'grid', textAlign: 'center' }}
                >
                  <ControlLabel>Año</ControlLabel>
                  <input
                    type="number"
                    min="1900"
                    max="3000" // This is only for this year, we won't be here - we deaded
                    step="1"
                    value={startDate}
                    onChange={({ target: { value } }) =>
                      setStartDate(parseInt(value))
                    }
                  ></input>
                </FormGroup>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Tipo de movimiento</ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    value={balanceType}
                    onChange={(e) => {
                      setBalanceType(parseInt(e.target.value, 10));
                    }}
                  >
                    {[
                      { id: 1, name: 'Ingresos' },
                      { id: 2, name: 'Egresos' },
                    ].map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </FormControl>
                </FormGroup>
              </div>
              <Bar
                data={balances.length > 0 ? data : []}
                width={50}
                height={50}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </Tab>
          <Tab eventKey={3} title="Precios">
            <div style={{ padding: '20px' }}>
              <div>
                <h2>Movimiento Precios</h2>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FormGroup
                  controlId="yearControl"
                  style={{ display: 'grid', textAlign: 'center' }}
                >
                  <ControlLabel>Año</ControlLabel>
                  <input
                    type="number"
                    min="1900"
                    max="3000" // This is only for this year, we won't be here - we deaded
                    step="1"
                    value={startDate}
                    onChange={({ target: { value } }) =>
                      setStartDate(parseInt(value))
                    }
                  ></input>
                </FormGroup>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Productos</ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    value={productSelected}
                    onChange={(e) => {
                      if (e.target.value !== 0)
                        setProductSelected(e.target.value);
                    }}
                  >
                    <option value={0}>Seleccione</option>
                    {products.map((item) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </FormControl>
                </FormGroup>
              </div>
              {/* <Bar
                data={balances.length > 0 ? data : []}
                width={50}
                height={50}
                options={{
                  maintainAspectRatio: false,
                }}
              /> */}
            </div>
          </Tab>
        </Tabs>
      </Well>
    </div>
  );
};

export default Reports;
