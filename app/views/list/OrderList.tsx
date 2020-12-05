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
import { Formik } from 'formik';
import HeaderTitle from '../../components/HeaderTitle';
import apiCall from '../../utils/apiCall';
import Button from '../../components/CustomButton/CustomButton';
import useRedirect from '../../hooks/useRedirect';
import useApiCall from '../../hooks/useApiCall';
import { useDispatch } from 'react-redux';
import ModalForm from '../../components/ModalForm';
import RawMaterialList from '../../views/RawMaterialList';

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
  //   const [rawMaterials, setRawMaterials] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
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
  const handleRawMaterialSelected = (rawMaterial) => {
    // if (!rawMaterials.some((item) => item._id === rawMaterial._id)) {
    //   handleShow();
    //   setRawMaterials((prev) => [...prev, rawMaterial]);
    // } else notification('tc', 'Materia Prima ya fue agregada', 2);
  };
  const handleSave = async () => {
    // var response = await apiCall({
    //   url: 'orders',
    //   method: 'POST',
    //   body: JSON.stringify({
    //     products: rawMaterials.map((r) => ({ amount: r.amount, _id: r._id })),
    //   }),
    // });
    // if (response.success) {
    //   notification('tc', 'Orden Guardada', 1);
    //   setRawMaterials([]);
    // }
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
                                  },
                                ]}
                                options={{
                                  exportButton: true,
                                  actionsColumnIndex: -1,
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
                                editable={{
                                  onRowUpdate: (newData) =>
                                    new Promise(async (resolve, reject) => {
                                      // if (!newData.name) {
                                      //   notification('tc', 'Nombre de la categoria es Requerido', 2);
                                      //   reject();
                                      // } else {
                                      //   try {
                                      //     var response = await apiCall({
                                      //       url: `categories/${newData._id}`,
                                      //       method: 'PUT',
                                      //       body: JSON.stringify(newData),
                                      //     });
                                      //     notification('tc', 'Categoria Actualizada', 1);
                                      //     dispatch(setCategories(response.data));
                                      //     resolve();
                                      //   } catch (error) {
                                      //     notification('tc', 'Error Acualizar', 3);
                                      //   }
                                      // }
                                    }),
                                  onRowDelete: (oldData) =>
                                    new Promise(async (resolve, reject) => {
                                      // try {
                                      //   var response = await apiCall({
                                      //     url: `categories/${oldData._id}`,
                                      //     method: 'DELETE',
                                      //   });
                                      //   if (!response.success) {
                                      //     notification('tc', 'Error Borrar', 3);
                                      //     reject();
                                      //   } else {
                                      //     notification('tc', 'Categoria Borrada', 1);
                                      //     dispatch(setCategories(response.data));
                                      //     resolve();
                                      //   }
                                      // } catch (error) {
                                      //   notification('tc', 'Error Borrar', 3);
                                      //   reject();
                                      // }
                                    }),
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
            <Well style={{ ...style.wall }}>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Unidades</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {orderSelected.products.map((item) => (
                      <React.Fragment>
                        <td>{item.product.name}</td>
                        <td style={{ width: '300px' }}>
                          <div>
                            <FormControl
                              type="numeric"
                              name="amount"
                              maxLength={50}
                              onChange={({ target: { value } }) => {
                                // setRawMaterials(
                                //   rawMaterials.map((r) =>
                                //     r._id === item._id
                                //       ? { ...r, amount: value }
                                //       : r
                                //   )
                                // );
                              }}
                              placeHolder="Cantidad"
                              bsClass="form-control"
                              value={item.amount}
                            />
                          </div>
                        </td>
                        {/* <td style={{ textAlign: 'center' }}>
                          <Button
                            bsStyle="danger"
                            onClick={() =>
                              setRawMaterials((prev) =>
                                prev.filter((ra) => ra._id !== item._id)
                              )
                            }
                          >
                            <i
                              className="fa fa-times"
                              style={{ fontSize: '21px' }}
                            >
                              {' '}
                            </i>
                          </Button>
                        </td> */}
                      </React.Fragment>
                    ))}
                  </tr>
                </tbody>
              </Table>
            </Well>
          </Col>
          <Col md={12} style={style.noPadding}>
            <Well
              style={{
                ...style.wall,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button bsStyle="success" onClick={handleSave}>
                <i className="fa fa-check-circle-o"></i>
                Realizar Pedido
              </Button>
            </Well>
          </Col>
        </Row>
      </Grid>

      <ModalForm
        {...{
          show,
          handleClose: handleShow,
          title: 'Seleccionar Materia Prima',
        }}
      >
        <RawMaterialList
          {...{
            notification,
            isListSelect: true,
            actions: false,
            onSelected: handleRawMaterialSelected,
            selectedId: selectedId,
          }}
        />
      </ModalForm>
    </div>
  );
};

export default OrderList;
