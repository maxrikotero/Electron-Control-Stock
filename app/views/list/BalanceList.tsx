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
import Card from '../../components/Card/Card';

const tableLocation = {
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
};

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
  const [balances, setBalances] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showConfirm, setShowConfirm] = useState({
    show: false,
    id: null,
  });
  const [balanceSelected, setBalanceSelected] = useState();

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

  const fetchBalances = async () => {
    const response = await useApiCall({
      loadingOn: true,
      dispatch,
      url: 'balance',
    });
    if (response) setBalances(response);
  };

  useEffect(() => {
    fetchBalances();
  }, []);

  const handleShow = () => {
    if (show && selectedId) setSelectedId(null);

    setShow((prev) => !prev);
  };

  const deleteBalance = async () => {
    const url = `balance/${showConfirm.id}`;
    var response = await apiCall({
      url,
      method: 'DELETE',
    });

    if (response.success) {
      notification('tc', 'Caja Borrada', 1);
      setBalanceSelected({});
      setShowConfirm({
        show: false,
        id: null,
      });
      fetchBalances();
    } else {
      notification('tc', 'Error', 3);
    }
  };

  const handleDelete = (_id) => {
    setShowConfirm({ show: true, id: _id });
  };

  const handleRowClick = (event, rowData) => {
    setBalanceSelected(rowData);
  };

  return (
    <div className="content">
      {!isEdit && (
        <HeaderTitle
          title="Cajas"
          redirect={redirect}
          onRedirect={() => setRedirect((prev) => !prev)}
        />
      )}

      <Grid fluid>
        <Row>
          <Col md={12} style={style.noPadding}>
            <Well style={style.wall}>
              <form>
                <Row>
                  <Col xs={12} md={12}>
                    <Row style={{ display: 'flex', alignItems: 'center' }}>
                      <Col xs={12} md={12}>
                        <MaterialTable
                          title=""
                          components={{
                            Container: (props) => props.children,
                          }}
                          onRowClick={handleRowClick}
                          columns={[
                            {
                              title: 'Usuario',
                              field: 'createdBy',
                              render: (rowData) => {
                                return (
                                  <p>
                                    {rowData?.createdBy?.firstName +
                                      ' ' +
                                      rowData?.createdBy?.lastName}{' '}
                                  </p>
                                );
                              },
                            },
                            {
                              title: 'Fecha',
                              field: 'createAt',
                              render: (rowData) =>
                                moment
                                  .utc(rowData.createAt)
                                  .format('YYYY-MM-DD'),
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
                                balanceSelected?._id &&
                                balanceSelected?.tableData.id ===
                                  rowData.tableData?.id;
                              return {
                                backgroundColor: selected ? '#a5a5ad' : '#FFF',
                              };
                            },
                          }}
                          data={balances}
                          localization={tableLocation}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <div className="clearfix" />
              </form>
            </Well>
          </Col>
          <Col md={12} style={style.noPadding}>
            <h3 style={{ textAlign: 'center' }}>Detalle</h3>

            <Row>
              <Col md={6}>
                <Card
                  title={
                    balanceSelected?.incomes && (
                      <h4>
                        Ingresos Total: $
                        {(balanceSelected?.incomes || []).reduce(
                          (acc, e) => acc + e.amount,
                          0
                        )}
                      </h4>
                    )
                  }
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
                        { title: 'Monto', field: 'amount' },
                        { title: 'Descripcion', field: 'description' },
                      ]}
                      localization={tableLocation}
                      options={{
                        exportButton: true,
                      }}
                      data={
                        ((balanceSelected?.incomes || []).length > 0 &&
                          balanceSelected.incomes) ||
                        []
                      }
                    />
                  }
                />
              </Col>

              <Col md={6}>
                <Card
                  title={
                    balanceSelected?.exits && (
                      <h4>
                        Egresos Total: $
                        {(balanceSelected?.exits || []).reduce(
                          (acc, e) => acc + e.amount,
                          0
                        )}
                      </h4>
                    )
                  }
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
                        { title: 'Monto', field: 'amount' },
                        { title: 'Descripcion', field: 'description' },
                      ]}
                      localization={tableLocation}
                      options={{
                        exportButton: true,
                      }}
                      data={
                        ((balanceSelected?.incomes || []).length > 0 &&
                          balanceSelected.incomes) ||
                        []
                      }
                    />
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
      <ConfirmModal
        {...{
          closeText: 'Cancelar',
          confirmText: 'Si',
          title: 'Borrar Caja',
          body: 'Esta seguro de borrar esta Caja!.',
          show: showConfirm.show,
          onAction: deleteBalance,
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
