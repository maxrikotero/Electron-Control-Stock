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
import moment from 'moment';
import MaterialTable from 'material-table';
import HeaderTitle from '../../components/HeaderTitle';
import apiCall from '../../utils/apiCall';
import Button from '../../components/CustomButton/CustomButton';
import useRedirect from '../../hooks/useRedirect';
import useApiCall from '../../hooks/useApiCall';
import { useDispatch } from 'react-redux';
import ModalForm from '../../components/ModalForm';
import RawMaterialList from '../../views/RawMaterialList';
import { StatsCard } from '../../components/StatsCard/StatsCard';

interface reactState {
  description: string;
}

interface sModal {
  rawMaterials: boolean;
  orderProviders: boolean;
}

const Delivery = ({ notification }: { notification: any }) => {
  const [state, setState] = useState<reactState>({
    description: '',
  });
  const [providers, setProviders] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState({
    products: [],
  });
  const [dynamicRedirect, setDynamicRedirect] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { redirect, setRedirect } = useRedirect();
  const [showModal, setShowModal] = useState<sModal>({
    rawMaterials: false,
    orderProviders: false,
  });

  const style = {
    wall: {
      background: '#fff',
    },
    noPadding: {
      padding: '0px',
    },
  };

  const dispatch = useDispatch();

  const fetchProviders = async () => {
    const response = await useApiCall({
      loadingOn: true,
      dispatch,
      url: 'providers',
    });
    if (response) setProviders(response.data);
  };

  const fetchOrders = async () => {
    const response = await useApiCall({
      loadingOn: true,
      dispatch,
      url: 'orders/orderDelivery',
    });
    if (response) setOrders(response);
  };

  useEffect(() => {
    fetchOrders();
    fetchProviders();
  }, []);

  useEffect(() => {
    if (showModal.orderProviders) fetchOrders();
  }, [showModal.orderProviders]);

  const handleShow = (type) => {
    setShowModal((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleRawMaterialSelected = (rawMaterial) => {
    if (!rawMaterials.some((item) => item._id === rawMaterial._id)) {
      handleShow('rawMaterials');
      setRawMaterials((prev) => [...prev, rawMaterial]);
    } else notification('tc', 'Materia Prima ya fue agregada', 2);
  };
  const handleSave = async () => {
    var response = await apiCall({
      url: 'delivery',
      method: 'POST',
      body: JSON.stringify({
        orderId: orderSelected._id,
        provider: orderSelected.provider._id,
        description: state.description,
        total: rawMaterials.reduce(
          (acc, p) => acc + (p.unitPrice || 0) * p.amount,
          0
        ),
        products: rawMaterials.map((r) => ({
          amount: r.amount,
          product: r._id,
          unitPrice: r.unitPrice,
        })),
      }),
    });
    if (response.success) {
      setOrderSelected({
        products: [],
      });
      setState({
        description: '',
      });
      setRawMaterials([]);
      notification('tc', 'Pedido Guardado', 1);
    }
  };

  const handleRowClick = (event, rowData) => {
    handleShow('orderProviders');
    setOrderSelected(rowData);
    setRawMaterials(
      rowData.products.map((p) => ({
        _id: p?.product?._id,
        name: p?.product?.name,
        amount: p?.amount,
        unitPrice: p?.unitPrice,
      }))
    );
  };

  const handleChange = ({ target: { name, value } }) =>
    setState((prev) => ({ ...prev, [name]: value }));

  return (
    <div className="content">
      <HeaderTitle
        title="Pedido"
        redirect={redirect}
        toLink={'/admin/principal'}
        onRedirect={() => setRedirect((prev) => !prev)}
        onDynamicRedirect={() => setDynamicRedirect((prev) => !prev)}
        dynamicRedirect={dynamicRedirect}
        dynamicPath={'/admin/orders'}
      />

      <Grid fluid>
        <Row>
          <Col md={12} style={style.noPadding}>
            <Well style={{ ...style.wall }}>
              <Row>
                <Col xs={12} md={6}>
                  <Row>
                    <Col xs={12} md={3}>
                      <Button
                        bsStyle="info"
                        fill
                        onClick={() => handleShow('orderProviders')}
                      >
                        Buscar Pedido
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <h3 style={{ textAlign: 'center' }}>Detalle</h3>

              {orderSelected?.provider && (
                <h6 style={{ textAlign: 'center' }}>
                  {`Proveedor: ${orderSelected.provider.name}`}{' '}
                </h6>
              )}

              <Table striped hover>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Unidades</th>
                    <th>Precio Unitario</th>
                  </tr>
                </thead>
                <tbody>
                  {rawMaterials.map((item) => (
                    <tr>
                      <React.Fragment>
                        <td>{item.name}</td>
                        <td>
                          <div>
                            <FormControl
                              type="numeric"
                              name="amount"
                              style={{ width: '300px' }}
                              maxLength={50}
                              onChange={({ target: { value } }) => {
                                setRawMaterials(
                                  rawMaterials.map((r) =>
                                    r._id === item._id
                                      ? { ...r, amount: value }
                                      : r
                                  )
                                );
                              }}
                              bsClass="form-control"
                              value={item.amount}
                            />
                          </div>
                        </td>
                        <td>
                          <div>
                            <FormControl
                              type="numeric"
                              name="unitPrice"
                              style={{ width: '300px' }}
                              maxLength={50}
                              onChange={({ target: { value } }) => {
                                setRawMaterials(
                                  rawMaterials.map((r) =>
                                    r._id === item._id
                                      ? { ...r, unitPrice: value }
                                      : r
                                  )
                                );
                              }}
                              bsClass="form-control"
                              value={item.unitPrice}
                            />
                          </div>
                        </td>
                      </React.Fragment>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Row style={{ marginTop: '100px' }}>
                <Col xs={12} md={12}>
                  <FormGroup controlId="descrControl">
                    <ControlLabel>Descripción</ControlLabel>
                    <FormControl
                      rows="5"
                      componentClass="textarea"
                      name="description"
                      onChange={handleChange}
                      bsClass="form-control"
                      value={state.description}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Well>
          </Col>
          <Col md={3} style={style.noPadding}>
            <StatsCard
              bigIcon={<i className="pe-7s-wallet text-success" />}
              statsText="Total a pagar:"
              statsValue={
                '$' +
                rawMaterials.reduce(
                  (acc, p) => acc + (p.unitPrice || 0) * p.amount,
                  0
                )
              }
              statsIcon={<i className="fa fa-refresh" />}
            />
          </Col>
          {rawMaterials.length > 0 && (
            <Col md={12} style={style.noPadding}>
              <Button
                bsStyle="success"
                onClick={handleSave}
                style={{ height: '100%', width: '100%', fontSize: '23px' }}
              >
                Pagar
              </Button>
            </Col>
          )}
        </Row>
      </Grid>

      <ModalForm
        {...{
          show: showModal.orderProviders,
          handleClose: () => handleShow('orderProviders'),
          title: 'Seleccionar Pedido',
        }}
      >
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
                moment.utc(rowData.createAt).format('YYYY-MM-DD'),
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
                deleteText: 'Esta seguro de borrar esta categoria?',
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
        />
      </ModalForm>

      <ModalForm
        {...{
          show: showModal.rawMaterials,
          handleClose: () => handleShow('rawMaterials'),
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

export default Delivery;
