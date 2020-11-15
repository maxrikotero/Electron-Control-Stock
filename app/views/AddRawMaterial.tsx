/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Table,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import moment from 'moment';
import apiCall from '../utils/apiCall';
import Button from '../components/CustomButton/CustomButton';
import useModal from '../hooks/useModal';
import CurrencyInput from '../components/CurrencyInput/CurrencyInput';
import ProviderType from '../components/ProviderType';
import CustomWell from '../components/CustomWell';

const AddRawMaterial = ({ notification, rawMaterial, onEdit, isEdit }) => {
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    if (rawMaterial?.providers) {
      setProviders(
        rawMaterial.providers.map((p) => ({
          ...p,
          name: p.provider?.name,
          providerTypeId: p.provider?._id,
        }))
      );
    }
  }, []);
  const { categories = [] } = useSelector(({ selects }) => selects);
  const edit = <Tooltip id="edit_tooltip">Editar Proveedor</Tooltip>;
  const remove = <Tooltip id="remove_tooltip">Remover</Tooltip>;
  const { ModalComponent, setModal } = useModal();
  const newRawMaterial = {
    name: '',
    category: '',
    brand: '',
    stock: 0,
    minStock: 0,
    description: '',
    expire: Date.now,
  };

  const data = rawMaterial ? rawMaterial : newRawMaterial;
  const handleSaveProvider = (data) => {
    if (isEdit) {
      if (providers.some((provider) => provider.provider?._id === data._id)) {
        notification('tc', 'Proveedor Agregado', 3);
      } else {
        setProviders(providers.concat(data));
        setModal(false);
      }
    } else {
      if (providers.some((provider) => provider.provider?._id === data._id)) {
        notification('tc', 'Proveedor Agregado', 3);
      } else {
        setModal(false);
        setProviders(providers.concat(data));
      }
    }
  };

  return (
    <CustomWell
      toLink={'/admin/principal'}
      headerTitle={`Nueva Materia Prima`}
      isEdit={isEdit}
    >
      <Formik
        initialValues={{
          ...data,
        }}
        validate={(values) => {
          const errors: any = {};

          if (!values.name) {
            errors.name = 'Requerido';
          }

          if (!values.stock || values.stock === 0) {
            errors.stock = 'Requerido';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (onEdit) {
            onEdit({
              ...values,
              providers: providers.map((provider) => ({
                provider: !provider.providerTypeId
                  ? provider._id
                  : provider.providerTypeId,
                price: provider.price,
              })),
            });
          } else {
            const requestValues = {
              ...values,
              providers: providers.map((provider) => ({
                provider: provider._id,
                price: provider.price,
              })),
            };

            if (providers.length > 0) {
              try {
                var response = await apiCall({
                  url: 'rawmaterial',
                  method: 'POST',
                  body: JSON.stringify(requestValues),
                });
              } catch (error) {
                setSubmitting(false);
                notification('tc', 'Error al guardar', 3);
              }

              if (response.success) {
                setSubmitting(false);
                notification('tc', 'Material Prima Agregada', 1);
                resetForm();
                setProviders([]);
              } else {
                let message = 'Agregar Material Prima Error';
                if (response.error.indexOf('name') > -1)
                  message = 'Material Prima Existente';

                setSubmitting(false);
                notification('tc', message, 3);
              }
            } else {
              notification('tc', 'Tipo de precio requerido', 2);
            }
          }
        }}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} md={4}>
                  <FormGroup controlId="nameControl">
                    <ControlLabel>Nombre</ControlLabel>
                    <FormControl
                      type="text"
                      name="name"
                      onChange={handleChange}
                      bsClass="form-control"
                      value={values.name}
                    />
                  </FormGroup>
                  <span style={{ color: 'red' }}> {errors.name}</span>
                </Col>
                <Col xs={12} md={4}>
                  <FormGroup controlId="brandControl">
                    <ControlLabel>Marca</ControlLabel>
                    <FormControl
                      type="text"
                      name="brand"
                      onChange={handleChange}
                      bsClass="form-control"
                      value={values.brand}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={4}>
                  <FormGroup controlId="stockControl">
                    <ControlLabel>Stock</ControlLabel>
                    <FormControl
                      type="number"
                      name="stock"
                      onChange={handleChange}
                      bsClass="form-control"
                      value={values.stock}
                    />
                  </FormGroup>
                  <span style={{ color: 'red' }}> {errors.stock}</span>
                </Col>
                <Col xs={12} md={4}>
                  <FormGroup controlId="minStockControl">
                    <ControlLabel>Stock Minimo</ControlLabel>
                    <FormControl
                      type="number"
                      name="minStock"
                      onChange={handleChange}
                      bsClass="form-control"
                      value={values.minStock}
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} md={4}>
                  <FormGroup controlId="expireControl">
                    <ControlLabel>Fecha Vencimiento</ControlLabel>
                    <FormControl
                      type="date"
                      name="expire"
                      onChange={handleChange}
                      bsClass="form-control"
                      value={moment(values.expire).utc().format('YYYY-MM-DD')}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <div style={{ display: 'flex' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      Agregar Proveedor
                    </div>{' '}
                    <div
                      style={{
                        fontSize: '26px',
                        color: 'green',
                        display: 'flex',
                        justifyContent: 'center',
                        flexGrow: '0.5',
                        cursor: 'pointer',
                        alignItems: 'center',
                      }}
                      onClick={setModal}
                    >
                      <i className="pe-7s-plus"></i>
                    </div>
                  </div>
                  <div>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Proveedor</th>
                          <th>Precio</th>
                          <th>
                            <Tooltip id="edit_tooltip">Editar</Tooltip>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {providers.map((item) => (
                          <tr>
                            <td>{item.name}</td>
                            <td>
                              {item.isEdit ? (
                                <Row>
                                  <Col xs={12} md={4}>
                                    <FormGroup controlId="priceControl">
                                      <ControlLabel></ControlLabel>
                                      <CurrencyInput
                                        placeholder="$0.00"
                                        type="text"
                                        name="price"
                                        onChange={({ target: { value } }) => {
                                          const newData = providers.map(
                                            (provider) =>
                                              provider._id === item._id
                                                ? {
                                                    ...item,
                                                    price: value,
                                                  }
                                                : item.price
                                          );

                                          setProviders(newData);
                                        }}
                                        value={item.price}
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              ) : (
                                item.price
                              )}
                            </td>
                            <td>
                              <Tooltip id="edit_tooltip">Editar</Tooltip>
                            </td>
                            <td>
                              <OverlayTrigger placement="top" overlay={edit}>
                                <Button
                                  bsStyle="info"
                                  simple
                                  onClick={() => {
                                    const newData = providers.map((price) =>
                                      price._id === item._id
                                        ? {
                                            ...item,
                                            isEdit: item.isEdit ? false : true,
                                          }
                                        : price
                                    );
                                    setProviders(newData);
                                  }}
                                  type="button"
                                >
                                  <i
                                    className={`${
                                      item.isEdit ? 'fa fa-check' : 'fa fa-edit'
                                    }`}
                                  />
                                </Button>
                              </OverlayTrigger>
                            </td>
                            <td>
                              <OverlayTrigger placement="top" overlay={remove}>
                                <Button
                                  bsStyle="danger"
                                  simple
                                  type="button"
                                  onClick={() => {
                                    const newData = providers.filter(
                                      (price) => price._id !== item._id
                                    );
                                    setProviders(newData);
                                  }}
                                >
                                  <i className="fa fa-times" />
                                </Button>
                              </OverlayTrigger>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <span style={{ color: 'red' }}> {errors.price}</span>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={4}>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Categoria</ControlLabel>
                    <FormControl
                      componentClass="select"
                      placeholder="select"
                      name="category"
                      onChange={handleChange}
                      value={isEdit ? values.category : values.category.id}
                    >
                      <option value="select">select</option>
                      {categories.map((item) => (
                        <option value={item._id}>{item.name}</option>
                      ))}
                    </FormControl>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <FormGroup controlId="descrControl">
                    <ControlLabel>Descripción</ControlLabel>
                    <FormControl
                      rows="3"
                      componentClass="textarea"
                      name="description"
                      onChange={handleChange}
                      bsClass="form-control"
                      value={values.description}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button
                bsStyle="info"
                pullRight
                fill
                type="submit"
                disabled={isSubmitting}
              >
                Guardar
              </Button>
              <div className="clearfix" />
            </form>
          );
        }}
      </Formik>

      <ModalComponent title="Proveedor">
        <ProviderType onSave={handleSaveProvider} notification={notification} />
      </ModalComponent>
    </CustomWell>
  );
};

export default AddRawMaterial;
