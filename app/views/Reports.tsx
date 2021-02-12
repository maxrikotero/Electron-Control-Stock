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
  const [priceTypeSelected, setPriceTypeSelected] = useState(0);
  const [priceMovements, setPriceMovements] = useState([]);
  const [balanceType, setBalanceType] = useState(1);
  const [productSelected, setProductSelected] = useState(null);
  const [priceTypeByMonth, setPriceTypeByMonth] = useState([]);
  const [tabSelected, setTabSelect] = useState(1);
  const [startDate, setStartDate] = useState(new Date().getFullYear());
  const dispatch = useDispatch();

  const getPriceMovement = async () => {
    const { data } = await useApiCall({
      url: 'pricemovement',
      loadingOn: true,
      method: 'POST',
      body: JSON.stringify({
        year: startDate,
        productId: productSelected?._id,
      }),
      dispatch,
    });
    if (data) setPriceMovements(data);
  };

  useEffect(() => {
    if (productSelected && tabSelected === 3) {
      setPriceTypeSelected(0);
      setPriceTypeByMonth([]);
      getPriceMovement();
    }
  }, [productSelected, tabSelected, startDate]);

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

  const filterBy = (month, startDate) => {
    switch (tabSelected) {
      case 1:
        return filterByMonth(month, startDate);

      case 2:
        return filterBalanceByMonth(month, startDate);

      default:
        return;
    }
  };

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

  const filterByPriceType = (priceTypeId) => {
    setPriceTypeByMonth(
      priceMovements
        .sort((a, b) => new Date(a.createAt) - new Date(b.createAt))
        .reduce((acc, d) => {
          // Build the object
          const modelData = {
            month: new Date(d.createAt).getMonth(),
            price: d.prices
              .filter((pacc) => pacc.priceType === priceTypeId)
              .find(Boolean)?.price,
          };

          // break if price is null or undefined
          if (!modelData?.price) return acc;

          // Check if there's a equal object and will replace it in its index position

          const index = acc.findIndex((ac) => ac.month === modelData.month);

          // replace object acording to its index into the array position
          if (index !== -1)
            return acc.filter((a, i) => i !== index).concat(modelData);

          // add the new object if it is passing the conditional.
          return [...acc, modelData];
        }, [])
    );
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
                    value={productSelected?._id || 'nId'}
                    onChange={(e) => {
                      if (e.target.value !== 'nId')
                        setProductSelected(
                          products.find((pd) => pd._id === e.target.value)
                        );
                      else {
                        setProductSelected(null);
                        setPriceTypeSelected(0);
                        setPriceTypeByMonth([]);
                      }
                    }}
                  >
                    <option value={'nId'}>Seleccione</option>
                    {products.map((item) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </FormControl>
                </FormGroup>
                <FormGroup
                  controlId="formControlsSelect"
                  style={{ marginLeft: 20 }}
                >
                  <ControlLabel>Tipos de precios</ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    value={priceTypeSelected}
                    onChange={(e) => {
                      if (e.target.value !== '0') {
                        setPriceTypeSelected(e.target.value);
                        filterByPriceType(e.target.value);
                      } else {
                        setPriceTypeSelected(0);
                        setPriceTypeByMonth([]);
                      }
                    }}
                  >
                    <option value={'0'}>Seleccione</option>
                    {(productSelected?.prices || []).map(
                      ({ priceType: { _id, name } }) => (
                        <option value={_id}>{name}</option>
                      )
                    )}
                  </FormControl>
                </FormGroup>
              </div>
              <Bar
                data={{
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
                      label: 'Precios',
                      backgroundColor: 'rgba(255,99,132,0.2)',
                      borderColor: 'rgba(255,99,132,1)',
                      borderWidth: 1,
                      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                      hoverBorderColor: 'rgba(255,99,132,1)',
                      data: [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                      ].map((m) =>
                        priceTypeByMonth.some((pfm) => pfm.month === m)
                          ? priceTypeByMonth.find((pt) => pt.month === m).price
                          : 0
                      ),
                    },
                  ],
                }}
                width={50}
                height={50}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </Tab>
        </Tabs>
      </Well>
    </div>
  );
};

export default Reports;
