/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import {
  Grid,
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
import Card from '../components/Card/Card';
import Button from '../components/CustomButton/CustomButton';
import useModal from '../hooks/useModal';
import CurrencyInput from '../components/CurrencyInput/CurrencyInput';
import PriceType from '../components/PriceType';

const AddProduct = ({ notification, product, onEdit, isEdit }) => {
  debugger;
  const [prices, setPrices] = useState([]);
  useEffect(() => {
    if (product) {
      setPrices(
        product.prices.map((p) => ({
          ...p,
          name: p.priceType.name,
          priceTypeId: p.priceType._id,
        }))
      );
    }
  }, []);
  const { categories = [] } = useSelector(({ selects }) => selects);
  const edit = <Tooltip id="edit_tooltip">Editar Precio</Tooltip>;
  const remove = <Tooltip id="remove_tooltip">Remover</Tooltip>;
  const { ModalComponent, setModal } = useModal();
  const newProduct = {
    name: '',
    category: '',
    brand: '',
    stock: 0,
    minStock: 0,
    description: '',
    code: 0,
    expire: Date.now,
  };

  const data = product ? product : newProduct;
  const handleSavePriceType = (data) => {
    if (isEdit) {
      if (prices.some((price) => price.priceType._id === data._id)) {
        notification('tc', 'Precio Agregado', 3);
      } else {
        setPrices(prices.concat(data));
        setModal(false);
      }
    } else {
      if (prices.some((price) => price._id === data._id)) {
        notification('tc', 'Precio Agregado', 3);
      } else {
        setModal(false);
        setPrices(prices.concat(data));
      }
    }
  };
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title={isEdit ? '' : 'Agregar Producto'}
              content={
                <Formik
                  initialValues={{
                    ...data,
                  }}
                  validate={(values) => {
                    const errors: any = {};

                    if (!values.code) {
                      errors.code = 'Requerido';
                    }
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
                        prices: prices.map((price) => ({
                          priceType: !price.priceTypeId
                            ? price._id
                            : price.priceTypeId,
                          price: price.price,
                        })),
                      });
                    } else {
                      const requestValues = {
                        ...values,
                        prices: prices.map((price) => ({
                          priceType: price._id,
                          price: price.price,
                        })),
                      };

                      if (prices.length > 0) {
                        try {
                          var response = await apiCall({
                            url: 'products',
                            method: 'POST',
                            body: JSON.stringify(requestValues),
                          });
                        } catch (error) {
                          setSubmitting(false);
                          notification('tc', 'Error al guardar', 3);
                        }

                        if (response.success) {
                          setSubmitting(false);
                          notification('tc', 'Producto Agregado', 1);
                          resetForm();
                          setPrices([]);
                        } else {
                          let message = 'Agregar Producto Error';
                          if (response.error.indexOf('name') > -1)
                            message = 'Producto Existente';
                          if (response.error.indexOf('code') > -1)
                            message = 'Codigo Existente';

                          setSubmitting(false);
                          notification('tc', message, 3);
                        }
                      } else {
                        notification('tc', 'Tipo de precio requerido', 2);
                      }
                    }
                  }}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                  }) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        <Row>
                          <Col xs={12} md={4}>
                            <FormGroup controlId="codeControl">
                              <ControlLabel>Codigo</ControlLabel>
                              <FormControl
                                type="number"
                                name="code"
                                onChange={handleChange}
                                bsClass="form-control"
                                value={values.code}
                              />
                            </FormGroup>
                            <span style={{ color: 'red' }}> {errors.code}</span>
                          </Col>
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
                            <span style={{ color: 'red' }}>
                              {' '}
                              {errors.stock}
                            </span>
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
                                value={moment(values.expire)
                                  .utc()
                                  .format('YYYY-MM-DD')}
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
                                Agregar Precio
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
                                    <th>Tipo</th>
                                    <th>Precio</th>
                                    <th>
                                      <Tooltip id="edit_tooltip">
                                        Editar
                                      </Tooltip>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {prices.map((item) => (
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
                                                  onChange={({
                                                    target: { value },
                                                  }) => {
                                                    const newData = prices.map(
                                                      (price) =>
                                                        price._id === item._id
                                                          ? {
                                                              ...item,
                                                              price: value,
                                                            }
                                                          : price
                                                    );
                                                    setPrices(newData);
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
                                        <Tooltip id="edit_tooltip">
                                          Editar
                                        </Tooltip>
                                      </td>
                                      <td>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={edit}
                                        >
                                          <Button
                                            bsStyle="info"
                                            simple
                                            onClick={() => {
                                              const newData = prices.map(
                                                (price) =>
                                                  price._id === item._id
                                                    ? {
                                                        ...item,
                                                        isEdit: item.isEdit
                                                          ? false
                                                          : true,
                                                      }
                                                    : price
                                              );
                                              setPrices(newData);
                                            }}
                                            type="button"
                                          >
                                            <i
                                              className={`${
                                                item.isEdit
                                                  ? 'fa fa-check'
                                                  : 'fa fa-edit'
                                              }`}
                                            />
                                          </Button>
                                        </OverlayTrigger>
                                      </td>
                                      <td>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={remove}
                                        >
                                          <Button
                                            bsStyle="danger"
                                            simple
                                            type="button"
                                            onClick={() => {
                                              const newData = prices.filter(
                                                (price) =>
                                                  price._id !== item._id
                                              );
                                              setPrices(newData);
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
                            <span style={{ color: 'red' }}>
                              {' '}
                              {errors.price}
                            </span>
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
                                value={
                                  isEdit ? values.category : values.category.id
                                }
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
              }
            />
          </Col>
        </Row>
      </Grid>
      <ModalComponent title="Tipo de precio">
        <PriceType onSave={handleSavePriceType} notification={notification} />
      </ModalComponent>
    </div>
  );
};

export default AddProduct;
