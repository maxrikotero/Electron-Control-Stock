/*eslint-disable */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field } from 'formik';
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
import apiCall from '../utils/apiCall';
import Card from '../components/Card/Card';
import Button from '../components/CustomButton/CustomButton';
import useModal from '../hooks/useModal';
// import Checkbox from '../components/CustomCheckbox/CustomCheckbox';
import PriceType from '../components/PriceType';
import CurrencyInput from './CurrencyInput/CurrencyInput';

const AddProduct = ({ notification }: { notification: any }) => {
  const [prices, setPrices] = useState([]);
  const { categories = [] } = useSelector(({ selects }) => selects);
  const edit = <Tooltip id="edit_tooltip">Editar Precio</Tooltip>;
  const remove = <Tooltip id="remove_tooltip">Remover</Tooltip>;
  const { ModalComponent, setModal } = useModal();

  const handleSavePriceType = (data) => {
    if (prices.some((price) => price.id === data.id)) {
      notification('tc', 'Precio Agregado', 3);
    } else {
      setModal(false);
      setPrices(prices.concat(data));
    }
  };
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Agregar Producto"
              content={
                <Formik
                  initialValues={{
                    name: '',
                    price: 0,
                    category: '',
                    brand: '',
                    stock: 0,
                    minStock: 0,
                    description: '',
                    isRawMaterial: [],
                    code: 0,
                    expire: Date.now,
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
                    const requestValues = {
                      ...values,
                      isRawMaterial: values.isRawMaterial.length > 0,
                      prices,
                    };
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
                    } else {
                      let message = 'Agregar Producto Error';
                      if (response.error.indexOf('name') > -1)
                        message = 'Producto Existente';
                      if (response.error.indexOf('code') > -1)
                        message = 'Codigo Existente';

                      setSubmitting(false);
                      notification('tc', message, 3);
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
                                value={values.expire}
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
                                        Edit Task
                                      </Tooltip>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {prices.map((item) => (
                                    <tr>
                                      <td>{item.text}</td>
                                      <td> {item.isEdit ? 
                                      (
                                        <Col xs={12} md={12}>
                                        <FormGroup controlId="priceControl">
                                          <ControlLabel></ControlLabel>
                                          <CurrencyInput
                                            placeholder="$0.00"
                                            type="text"
                                            name="price"
                                            onChange={({ target: { value } }) => setPrice(value)}
                                            value={price}
                                          />
                                        </FormGroup>
                                      </Col>
                                      )
                                      
                                      : <item.price}</td>
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
                                            type="button"
                                          >
                                            <i className="fa fa-edit" />
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
                                            // bsSize="xs"
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
                              >
                                <option value="select">select</option>
                                {categories.map((item) => (
                                  <option value={item._id}>{item.name}</option>
                                ))}
                              </FormControl>
                            </FormGroup>
                          </Col>
                        </Row>
                        {/* <Row> TODO: REMOVE ALL THIS SECTION
                          <Col xs={12} md={12}>
                            <FormGroup controlId="isRawMaterialControl">
                              <ControlLabel>Materia Prima</ControlLabel>
                              <Checkbox
                                number={1}
                                isChecked={values.isRawMaterial.length > 0}
                                onChange={handleChange}
                                nameInput="isRawMaterial"
                              />
                            </FormGroup>
                          </Col>
                        </Row> */}

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
        <PriceType onSave={handleSavePriceType} />
      </ModalComponent>
    </div>
  );
};

export default AddProduct;
