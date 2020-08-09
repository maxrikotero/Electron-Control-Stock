/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';
import moment from 'moment';
import MaterialTable from 'material-table';
import Card from '../components/Card/Card';
import useApiUrl from '../hooks/useApiUrl';

const SalesList = () => {
  const [sales, setSales] = useState([]);

  const apiUrl = useApiUrl();

  const fetchSales = () => {
    fetch(`${apiUrl}/sales`)
      .then((res) => res.json())
      .then((data) => {
        setSales(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Lista de Ventas"
              ctTableFullWidth
              ctTableResponsive
              content={
                <MaterialTable
                  title=""
                  components={{ Container: (props) => props.children }}
                  options={{
                    actionsColumnIndex: -1,
                  }}
                  columns={[
                    { title: 'Precio Total', field: 'totalPrice' },
                    {
                      title: 'Fecha',
                      render: (rowData) =>
                        moment(rowData.paidAt).format('YYYY-MM-DD'),
                    },
                  ]}
                  data={sales}
                />
              }
            />
          </Col>
        </Row>
      </Grid>
      {/* {showMovement && (
        <Movement id={movementId} onClose={handleCloseMovement} />
      )} */}
    </div>
  );
};

export default SalesList;
