/*eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field } from 'formik';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  // option,
} from 'react-bootstrap';
import { Card } from '../components/Card/Card';
import apiCall from '../utils/apiCall';
import Button from '../components/CustomButton/CustomButton';
import CurrencyInput from '../components/CurrencyInput/CurrencyInput';
import Checkbox from '../components/CustomCheckbox/CustomCheckbox';

const AddProduct = ({ notification }: { notification: any }) => {
  const { categories = [] } = useSelector(({ selects }) => selects);

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
                            <FormGroup controlId="priceControl">
                              <ControlLabel>Precio</ControlLabel>
                              <CurrencyInput
                                placeholder="$0.00"
                                type="text"
                                name="price"
                                onChange={handleChange}
                                value={values.price}
                              />
                            </FormGroup>
                            <span style={{ color: 'red' }}>
                              {' '}
                              {errors.price}
                            </span>
                          </Col>
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
                            <FormGroup controlId="isRawMaterialControl">
                              <ControlLabel>Materia Prima</ControlLabel>
                              {console.log('values ', values)}
                              <Checkbox
                                number={1}
                                isChecked={values.isRawMaterial.length > 0}
                                onChange={handleChange}
                                nameInput="isRawMaterial"
                              />
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
    </div>
  );
};

export default AddProduct;
