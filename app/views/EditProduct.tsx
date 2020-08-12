/*eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  DropdownButton,
  MenuItem,
  option,
} from 'react-bootstrap';
import moment from 'moment';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import Button from '../components/CustomButton/CustomButton';
import CurrencyInput from '../components/CurrencyInput/CurrencyInput';

const EditProduct = ({ product, onEdit }) => {
  const { categories = [] } = useSelector(({ selects }) => selects);
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Formik
              initialValues={{
                ...product,
                expire: product.expire
                  ? moment(product.expire).format('YYYY-MM-DD')
                  : '',
              }}
              validate={(values) => {
                const errors = {};

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
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(false);
                onEdit(values);
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
                        <span style={{ color: 'red' }}> {errors.price}</span>
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
                    </Row>
                    <Row>
                      <Col xs={12} md={4}>
                        <FormGroup controlId="formControlsSelect">
                          <ControlLabel>Categoria</ControlLabel>
                          <FormControl
                            componentClass="select"
                            placeholder="select"
                            as="select"
                            name="category"
                            onChange={handleChange}
                            value={values.category}
                          >
                            <option value="select">select</option>
                            {categories.map((item) => (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
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
            {/* }
            /> */}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default EditProduct;
