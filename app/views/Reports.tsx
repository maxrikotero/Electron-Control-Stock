import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import useApiCall from '../hooks/useApiCall';

const Reports = () => {
  const [sales, setSales] = useState([]);
  const [startDate, setStartDate] = useState(new Date().getFullYear());
  const dispatch = useDispatch();
  useEffect(() => {
    const getSales = async () => {
      const data = await useApiCall({
        url: 'sales',
        loadingOn: true,
        dispatch,
      });
      if (data) setSales(data.data);
    };
    getSales();
  }, []);

  const filterPorMes = (month, year = 2010) => {
    const totalMonth = sales
      .filter(
        (sale) =>
          new Date(sale.paidAt).getMonth() + 1 === month &&
          new Date(sale.paidAt).getFullYear() === year
      )
      .reduce((acc, item) => acc + item.totalPrice, 0);
    return totalMonth;
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
        label: 'Ventas Por Mes',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [
          filterPorMes(1, startDate),
          filterPorMes(2, startDate),
          filterPorMes(3, startDate),
          filterPorMes(4, startDate),
          filterPorMes(5, startDate),
          filterPorMes(6, startDate),
          filterPorMes(7, startDate),
          filterPorMes(8, startDate),
          filterPorMes(9, startDate),
          filterPorMes(10, startDate),
          filterPorMes(11, startDate),
          filterPorMes(12, startDate),
        ],
      },
    ],
  };

  return (
    <div className="App">
      <div className="content">
        <Row>
          <Col xs={12} md={4}>
            <FormGroup controlId="yearControl">
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
          </Col>
        </Row>
      </div>
      <div>
        <h2>Ventas Por Mes</h2>
        <Bar
          data={data}
          width={50}
          height={50}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default Reports;
