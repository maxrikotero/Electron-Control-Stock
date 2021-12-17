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
import { Formik } from 'formik';
import HeaderTitle from '../../components/HeaderTitle';
import apiCall from '../../utils/apiCall';
import Button from '../../components/CustomButton/CustomButton';
import useRedirect from '../../hooks/useRedirect';
import useApiCall from '../../hooks/useApiCall';
import { useDispatch } from 'react-redux';
import ModalForm from '../../components/ModalForm';
import RawMaterialList from '../../views/RawMaterialList';
import StatsCard from '../../components/StatsCard/StatsCard';

const OrderProvider = ({
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
  const [providers, setProviders] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [dynamicRedirect, setDynamicRedirect] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
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
  const fetchProviders = async () => {
    const response = await useApiCall({
      loadingOn: true,
      dispatch,
      url: 'providers',
    });
    if (response) setProviders(response.data);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleShow = () => {
    setShow((prev) => !prev);
  };
  const handleRawMaterialSelected = (rawMaterial) => {
    if (!rawMaterials.some((item) => item._id === rawMaterial._id)) {
      handleShow();
      const selected = (rawMaterial.providers || []).find(
        ({ provider = {} }) => provider?._id === selectedId
      );

      setRawMaterials((prev) => [
        ...prev,
        { ...rawMaterial, unitPrice: selected?.price },
      ]);
    } else notification('tc', 'Materia Prima ya fue agregada', 2);
  };
  const handleSave = async () => {
    try {
      var response = await apiCall({
        url: 'orders',
        method: 'POST',
        body: JSON.stringify({
          provider: selectedId,
          products: rawMaterials.map((r) => ({
            amount: r?.amount,
            product: r._id,
            unitPrice: r?.unitPrice,
          })),
        }),
      });
      if (response.success) {
        setSelectedId(null);
        notification('tc', 'Orden Guardada', 1);
        setRawMaterials([]);
      } else {
        notification('tc', 'Agregar pedido error al guardar', 3);
      }
    } catch (error) {
      const message = 'Agregar pedido error';
      notification('tc', message, 3);
    }
  };

  return (
    <div className="content">
      {!isEdit && (
        <HeaderTitle
          title={`${isEdit ? 'Editar ' : 'Agregar'} Pedido`}
          redirect={redirect}
          toLink={'/admin/principal'}
          onRedirect={() => setRedirect((prev) => !prev)}
          onDynamicRedirect={() => setDynamicRedirect((prev) => !prev)}
          dynamicRedirect={dynamicRedirect}
          dynamicPath={'/admin/orders'}
        />
      )}

      <Grid fluid>
        <Row>
          <Col md={12} style={style.noPadding}>
            <h3 style={{ textAlign: 'center' }}>Buscar</h3>
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
                        <Col xs={12} md={6}>
                          <Row
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Col xs={12} md={5}>
                              <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Proveedores</ControlLabel>
                                <FormControl
                                  componentClass="select"
                                  placeholder="select"
                                  name="provider"
                                  onChange={(e) => {
                                    if (rawMaterials.length > 0)
                                      setRawMaterials([]);
                                    if (e.target.value === 'select')
                                      setSelectedId(null);
                                    else setSelectedId(e.target.value);
                                    handleChange(e);
                                  }}
                                  value={values.provider}
                                >
                                  <option value="select">Seleccionar</option>
                                  {providers.length > 0 &&
                                    providers.map((item) => (
                                      <option value={item._id}>
                                        {item.name}
                                      </option>
                                    ))}
                                </FormControl>
                              </FormGroup>
                            </Col>
                            {values.provider && values.provider !== 'select' && (
                              <Col xs={12} md={3}>
                                <Button
                                  bsStyle="info"
                                  pullRight
                                  fill
                                  onClick={() => {
                                    setSelectedId(values.provider);
                                    handleShow();
                                  }}
                                >
                                  Materia Prima
                                </Button>
                              </Col>
                            )}

                            <Col xs={12} md={3}>
                              <Button bsStyle="info" fill onClick={handleShow}>
                                Buscar
                              </Button>
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
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Unidades</th>
                  </tr>
                </thead>
                <tbody>
                  {rawMaterials.map((item) => (
                    <tr>
                      <React.Fragment>
                        <td>{item.name}</td>
                        <td>{item.stock}</td>
                        <td>{item?.unitPrice}</td>
                        <td style={{ width: '300px' }}>
                          <div>
                            <FormControl
                              type="numeric"
                              name="amount"
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
                              placeHolder="Cantidad"
                              bsClass="form-control"
                              value={item.amount}
                            />
                          </div>
                        </td>
                        <td style={{ textAlign: 'center' }}>
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
                        </td>
                      </React.Fragment>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Well>
          </Col>

          <Col md={3} style={style.noPadding}>
            <StatsCard
              bigIcon={<i className="pe-7s-wallet text-success" />}
              statsText="Total a pagar:"
              statsValue={
                '$' +
                rawMaterials.reduce(
                  (acc, p) => acc + (p.unitPrice || 0) * (p.amount || 0),
                  0
                )
              }
              statsIcon={<i className="fa fa-refresh" />}
            />
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

export default OrderProvider;
