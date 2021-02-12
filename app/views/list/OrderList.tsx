import React, { useEffect, useState } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  Table,
  FormControl,
  ControlLabel,
  Well,
} from 'react-bootstrap';
import MaterialTable from 'material-table';
import moment from 'moment';
import { Formik } from 'formik';
import HeaderTitle from '../../components/HeaderTitle';
import apiCall from '../../utils/apiCall';
import Button from '../../components/CustomButton/CustomButton';
import useRedirect from '../../hooks/useRedirect';
import useApiCall from '../../hooks/useApiCall';
import { useDispatch } from 'react-redux';
import ConfirmModal from '../../components/Confirm/Confirm';
import ModalForm from '../../components/ModalForm';
import StatsCard from '../../components/StatsCard/StatsCard';

const OrderList = ({
  notification,
  isEdit,
  provider,
  onSave,
}: {
  notification: any;
}) => {
  const initialState = {
    razonSocial: '',
    dni: 0,
    phone: '',
    email: '',
    name: '',
  };
  const [orders, setOrders] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [dynamicRedirect, setDynamicRedirect] = useState(false);
  const [showConfirm, setShowConfirm] = useState({
    show: false,
    id: null,
  });
  const [orderSelected, setOrderSelected] = useState({
    products: [],
  });

  const { redirect, setRedirect } = useRedirect();
  const [show, setShow] = useState(false);

  const style = {
    wall: {
      background: '#fff',
    },
    noPadding: {
      padding: '0px',
    },
  };

  const dispatch = useDispatch();
  const fetchOrders = async () => {
    const response = await useApiCall({
      loadingOn: true,
      dispatch,
      url: 'orders',
    });
    if (response) setOrders(response);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleShow = () => {
    if (show && selectedId) setSelectedId(null);

    setShow((prev) => !prev);
  };

  const deleteOrder = async () => {
    const url = `orders/${showConfirm.id}`;
    var response = await apiCall({
      url,
      method: 'DELETE',
    });

    if (response.success) {
      notification('tc', 'Orden Borrada', 1);
      setOrderSelected({ products: [] });
      setShowConfirm({
        show: false,
        id: null,
      });
      fetchOrders();
    } else {
      notification('tc', 'Error', 3);
    }
  };

  const handleSave = async () => {
    var response = await apiCall({
      url: `orders/${orderSelected._id}`,
      method: 'PUT',
      body: JSON.stringify(orderSelected),
    });

    if (response.success) {
      notification('tc', 'Orden Actualizada', 1);
      setOrderSelected({ products: [] });
      fetchOrders();
    } else {
      notification('tc', 'Error', 3);
    }
  };

  const handleDelete = (_id) => {
    setShowConfirm({ show: true, id: _id });
  };

  const handleRowClick = (event, rowData) => {
    setOrderSelected(rowData);
  };

  return (
    <div className="content">
      {!isEdit && (
        <HeaderTitle
          title="Pedidos Proveedores"
          redirect={redirect}
          toLink={'/admin/principal'}
          onRedirect={() => setRedirect((prev) => !prev)}
          onDynamicRedirect={() => setDynamicRedirect((prev) => !prev)}
          dynamicRedirect={dynamicRedirect}
          dynamicPath={'/admin/orderprovider'}
        />
      )}

      <Grid fluid>
        <Row>
          <Col md={12} style={style.noPadding}>
            <h3 style={{ textAlign: 'center' }}>Pedidos</h3>
            <Well style={style.wall}>
              <Formik
                initialValues={isEdit ? { ...provider } : { ...initialState }}
                onSubmit={async (values: any, { setSubmitting, resetForm }) => {
                  var response = await apiCall({
                    url: 'orders',
                    method: 'POST',
                    body: JSON.stringify(values),
                  });

                  if (response.success) {
                    notification(
                      'tc',
                      !isEdit ? 'Proveedor Agregado' : 'Proveedor Actualizado',
                      1
                    );

                    (!isEdit && resetForm(initialState)) || onSave();
                  }
                }}
              >
                {({ values, handleChange, handleSubmit }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col xs={12} md={12}>
                          <Row
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Col xs={12} md={12}>
                              <MaterialTable
                                title=""
                                components={{
                                  Container: (props) => props.children,
                                }}
                                onRowClick={handleRowClick}
                                columns={[
                                  {
                                    title: 'Proveedor',
                                    field: 'provider.name',
                                  },
                                  {
                                    title: 'Fecha',
                                    field: 'createAt',
                                    render: (rowData) =>
                                      moment
                                        .utc(rowData.createAt)
                                        .format('YYYY-MM-DD'),
                                  },
                                  {
                                    title: 'Entregado',
                                    render: (rowData) =>
                                      rowData.isDelivery ? (
                                        <i
                                          className="fa fa-check-circle-o"
                                          style={{
                                            fontSize: '25px',
                                            color: 'green',
                                          }}
                                        ></i>
                                      ) : (
                                        <></>
                                      ),
                                  },
                                ]}
                                actions={[
                                  {
                                    icon: () => (
                                      <Button bsStyle="danger">Borrar</Button>
                                    ),
                                    onClick: (event, rowData) =>
                                      handleDelete(rowData._id),
                                  },
                                ]}
                                options={{
                                  exportButton: true,
                                  actionsColumnIndex: -1,
                                  rowStyle: (rowData) => {
                                    const selected =
                                      orderSelected._id &&
                                      orderSelected.tableData.id ===
                                        rowData.tableData.id;
                                    return {
                                      backgroundColor: selected
                                        ? '#a5a5ad'
                                        : '#FFF',
                                    };
                                  },
                                }}
                                data={orders}
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
                                      deleteText:
                                        'Esta seguro de borrar esta categoria?',
                                      cancelTooltip: 'Cancelar',
                                    },
                                  },
                                  header: {
                                    actions: 'Acciones',
                                  },
                                  pagination: {
                                    labelDisplayedRows:
                                      '{from}-{to} de {count}',
                                    labelRowsSelect: 'Filas',
                                    labelRowsPerPage: 'Filas por pagina:',
                                  },
                                  toolbar: {
                                    nRowsSelected:
                                      '{0} Filas(s) seleccionadas(s)',
                                    exportTitle: 'Exportar',
                                    exportAriaLabel: 'Exportar',
                                    exportName: 'Exportar en CSV',
                                    searchTooltip: 'Buscar',
                                    searchPlaceholder: 'Buscar',
                                  },
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <div className="clearfix" />
                    </form>
                  );
                }}
              </Formik>
            </Well>
          </Col>
          <Col md={12} style={style.noPadding}>
            <h3 style={{ textAlign: 'center' }}>Detalle</h3>
            {orderSelected.products.length > 0 && !orderSelected.isEdit && (
              <div
                style={{
                  display: 'flex',
                  alignContent: 'flex-end',
                  justifyContent: 'flex-end',
                  marginBottom: 10,
                }}
              >
                <Button
                  bsStyle="primary"
                  onClick={() =>
                    setOrderSelected((prev) => ({ ...prev, isEdit: true }))
                  }
                >
                  Editar
                </Button>
              </div>
            )}

            <Well style={{ ...style.wall }}>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Unidades</th>
                  </tr>
                </thead>
                <tbody>
                  {orderSelected.products.map((item) => (
                    <tr>
                      <React.Fragment>
                        <td>{item.product.name}</td>
                        <td>{item.unitPrice}</td>
                        {(!orderSelected.isEdit && <td>{item.amount}</td>) || (
                          <td>
                            <div>
                              <FormControl
                                type="numeric"
                                name="amount"
                                maxLength={50}
                                style={{ width: '200px' }}
                                onChange={({ target: { value } }) => {
                                  setOrderSelected((prev) => ({
                                    ...prev,
                                    products: prev.products.map((r) =>
                                      r._id === item._id
                                        ? { ...r, amount: value }
                                        : r
                                    ),
                                  }));
                                }}
                                placeHolder="Cantidad"
                                bsClass="form-control"
                                value={item.amount}
                              />
                            </div>
                          </td>
                        )}
                      </React.Fragment>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Well>
          </Col>
          {orderSelected.isEdit && (
            <Col md={12} style={style.noPadding}>
              <Well
                style={{
                  ...style.wall,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  bsStyle="primary"
                  style={{ marginRight: 10 }}
                  onClick={() =>
                    setOrderSelected((prev) => ({
                      ...prev,
                      isEdit: !prev.isEdit,
                    }))
                  }
                >
                  Cancelar
                </Button>
                <Button bsStyle="success" onClick={handleSave}>
                  Guardar
                </Button>
              </Well>
            </Col>
          )}

          <Col md={3} style={style.noPadding}>
            <StatsCard
              bigIcon={<i className="pe-7s-wallet text-success" />}
              statsText="Total a pagar:"
              statsValue={
                '$' +
                orderSelected?.products.reduce(
                  (acc, p) => acc + (p.unitPrice || 0) * (p.amount || 0),
                  0
                )
              }
              statsIcon={<i className="fa fa-refresh" />}
            />
          </Col>
        </Row>
      </Grid>
      <ConfirmModal
        {...{
          closeText: 'Cancelar',
          confirmText: 'Si',
          title: 'Borrar Pedido',
          body: 'Esta seguro de borrar este Pedido.',
          show: showConfirm.show,
          onAction: deleteOrder,
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

export default OrderList;
