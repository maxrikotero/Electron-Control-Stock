import React, { useEffect, useState } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MaterialTable from 'material-table';
import moment from 'moment';
import useApiCall from '../hooks/useApiCall';

const ShowSaleDetail = ({ saleId }: { saleId: any }) => {
  const [sale, setSale] = useState<any>({});

  const { client = {}, user = {}, paidAt = '' } = sale || {};

  useEffect(() => {
    const fetchSale = async () => {
      const response = await useApiCall({
        url: `sales/${saleId}`,
      });
      if (response.success) setSale(response.data[0]);
    };

    fetchSale();
  }, []);

  return (
    <>
      <div className="content">
        <Grid fluid>
          <div className="content">
            <Row>
              <Col md={12} style={{ textAlign: 'center' }}>
                <h4>Venta</h4>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <div>Fecha</div>
                <br />
                <div>{moment(sale.paidAt).format('YYYY-MM-DD')}</div>
              </Col>
              <Col md={4}>
                <div>Vendedor</div>
                <br />
                <div>
                  {user.firstName || '-'} - {user.lastName || '-'}
                </div>
              </Col>
            </Row>
          </div>
          <div className="content">
            <Row>
              <Col md={12} style={{ textAlign: 'center' }}>
                <h4>Cliente</h4>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <div>Nombre</div>
                <br />
                <div>{client.name || '-'}</div>
              </Col>
              <Col md={4}>
                <div>Direccion</div>
                <br />
                <div>{client.address || '-'}</div>
              </Col>
              <Col md={4}>
                <div>Cuil</div>
                <br />
                <div>{client.cuil || '-'}</div>
              </Col>
            </Row>
          </div>
          <hr />
          <Row>
            <Col md={12}>
              <MaterialTable
                title=""
                components={{ Container: (props) => props.children }}
                options={{
                  actionsColumnIndex: -1,
                }}
                columns={[
                  { title: 'Precio Total', field: 'price' },
                  { title: 'Cantidad', field: 'quality' },
                  { title: 'Producto', field: 'product.name' },
                ]}
                options={{
                  exportButton: true,
                }}
                data={sale.products}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    </>
  );
};

export default ShowSaleDetail;
