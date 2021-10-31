/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Row, Col, Button, Modal, Well } from 'react-bootstrap';
import moment from 'moment';
import MaterialTable from 'material-table';
import ShowSaleDetail from '../components/ShowSaleDetail';
import useApiCall from '../hooks/useApiCall';
import HeaderTitle from '../components/HeaderTitle';
import useRedirect from '../hooks/useRedirect';
import apiCall from '../utils/apiCall';
import ConfirmModal from '../components/Confirm/Confirm';

const SalesList = ({ notification }) => {
  const [sales, setSales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [saleId, setSaleId] = useState();
  const [dynamicRedirect, setDynamicRedirect] = useState();
  const [showConfirm, setShowConfirm] = useState({
    show: false,
    id: null,
  });

  const { redirect, setRedirect } = useRedirect();

  const fetchSales = async () => {
    const response = await useApiCall({
      url: 'sales',
    });
    if (response.success)
      setSales(
        response.data.sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt))
      );
  };

  useEffect(() => {
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

  const handleRemove = async () => {
    const url = `sales/${showConfirm.id}`;
    try {
      const response = await apiCall({ url, method: 'DELETE' });

      if (response.success) {
        setShowConfirm({
          show: false,
          id: null,
        }),
          fetchSales();
      }
    } catch (error) {
      alert('error');
    }
  };

  const handleDelete = (_id) => {
    setShowConfirm({ show: true, id: _id });
  };

  return (
    <div className="content">
      <HeaderTitle
        title="Ventas"
        redirect={redirect}
        onRedirect={() => setRedirect((prev) => !prev)}
        onDynamicRedirect={() => setDynamicRedirect((prev) => !prev)}
        dynamicRedirect={dynamicRedirect}
        dynamicPath={'/admin/sale'}
      />
      <Grid fluid>
        <Row>
          <Col>
            <Well
              style={{
                background: '#fff',
              }}
            >
              <MaterialTable
                title=""
                components={{ Container: (props) => props.children }}
                options={{
                  actionsColumnIndex: -1,
                  exportButton: true,
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
                    title: 'Client',
                    render: (rowData: any) => rowData.client.name,
                  },
                  {
                    title: 'Fecha',
                    render: (rowData: any) =>
                      moment(rowData.paidAt).format('DD-MM-YYYY'),
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
                  {
                    render: (rowData) => (
                      <Button
                        bsStyle="danger"
                        onClick={() => handleDelete(rowData._id)}
                      >
                        Borrar
                      </Button>
                    ),
                  },
                ]}
                data={sales}
              />
            </Well>
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
      <ConfirmModal
        {...{
          closeText: 'Cancelar',
          confirmText: 'Borrar',
          title: 'Borrar Venta',
          body: 'Esta seguro de borrar esta Venta.',
          show: showConfirm.show,
          onAction: handleRemove,
          onClose: () =>
            setShowConfirm({
              show: false,
              id: null,
            }),
        }}
      />
    </div>
  );
};

export default SalesList;
