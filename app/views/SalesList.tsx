/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import MaterialTable from 'material-table';
import Card from '../components/Card/Card';
import ShowSaleDetail from '../components/ShowSaleDetail';
import useApiCall from '../hooks/useApiCall';

const SalesList = ({ notification }) => {
  const [sales, setSales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [saleId, setSaleId] = useState();

  useEffect(() => {
    const fetchSales = async () => {
      const response = await useApiCall({
        url: 'sales',
      });
      if (response.success) setSales(response.data);
    };

    fetchSales();
  }, []);

  const handleShowSaleDetail = (_id) => {
    setSaleId(_id);
    setShowModal((prev) => !prev);
  };

  const fetchBill = async (_id) => {
    try {
      const res = await fetch(`${process.env.API_URL}/fetch-pdf/${_id}`);
      if (res.statusText === 'Not Found') {
        notification('tc', 'Factura no disponible', 3);
      } else {
        const raw = await res.blob();
        const fileURL = URL.createObjectURL(raw);
        window.open(fileURL, '_blank');
      }
    } catch (error) {
      notification('tc', 'Factura no disponible', 3);
    }
  };

  const handleShowBill = (_id: string) => {
    fetchBill(_id);
  };

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
                  localization={{
                    body: {
                      emptyDataSourceMessage: 'No hay registros',
                      addTooltip: 'Agregar',
                      deleteTooltip: 'Eliminar',
                      editTooltip: 'Editar',
                      filterRow: {
                        filterTooltip: 'Filtrar',
                      },
                      editRow: {
                        deleteText: 'Esta seguro de borrar?',
                        cancelTooltip: 'Cancelar',
                      },
                    },
                    header: {
                      actions: 'Acciones',
                    },
                    pagination: {
                      labelDisplayedRows: '{from}-{to} de {count}',
                      labelRowsSelect: 'Filas',
                      labelRowsPerPage: 'Filas por pagina:',
                    },
                    toolbar: {
                      nRowsSelected: '{0} Filas(s) seleccionadas(s)',
                      exportTitle: 'Exportar',
                      exportAriaLabel: 'Exportar',
                      exportName: 'Exportar en CSV',
                      searchTooltip: 'Buscar',
                      searchPlaceholder: 'Buscar',
                    },
                  }}
                  columns={[
                    { title: 'Precio Total', field: 'totalPrice' },
                    {
                      title: 'Fecha',
                      render: (rowData: any) =>
                        moment(rowData.paidAt).format('YYYY-MM-DD'),
                    },
                    {
                      render: (rowData) => (
                        <Button
                          bsStyle="info"
                          onClick={() => handleShowSaleDetail(rowData._id)}
                        >
                          Detalle
                        </Button>
                      ),
                    },
                    {
                      render: (rowData) => (
                        <Button
                          bsStyle="info"
                          onClick={() => handleShowBill(rowData._id)}
                        >
                          Ver Factura
                        </Button>
                      ),
                    },
                  ]}
                  data={sales}
                />
              }
            />
          </Col>
        </Row>
      </Grid>
      <Modal
        show={showModal}
        onHide={() => setShowModal((prev) => !prev)}
        bsSize="large"
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalle Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShowSaleDetail saleId={saleId} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SalesList;
