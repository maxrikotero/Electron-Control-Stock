/*eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Table,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { StatsCard } from '../components/StatsCard/StatsCard';
import Client from '../components/ClientSelect/ClientSelect';
import SearchProduct from '../views/SearchProduct';
import useApiCall from '../hooks/useApiCall';
import apiCall from '../utils/apiCall';
import CustomWell from '../components/CustomWell';

const AddSales = ({ notification }) => {
  const [sale, setSales] = useState({
    totalPrice: 0,
    client: null,
    products: [],
    paymentType: '',
    billType: '1',
  });
  const [products, setProducts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { sessionData } = useSelector(({ user }) => user);
  const { totalPrice, client } = sale;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await apiCall({ url: 'payments' });
        if (data) setPayments(data);
      } catch (error) {
        setPayments([]);
      }
    };
    fetchPayments();
  }, []);

  useEffect(() => {
    if (products.length > 0)
      setSales((prev) => ({
        ...prev,
        totalPrice: products.reduce((acc, item) => acc + item.subTotal, 0),
      }));
    else {
      setSales((prev) => ({ ...prev, totalPrice: 0 }));
    }
  }, [products]);

  const handleAddClientToSale = (id) => {
    setSales((prev) => ({ ...prev, client: id }));
  };

  const fetchData = async (_id) => {
    const res = await fetch(`${process.env.API_URL}/fetch-pdf/${_id}`);
    const raw = await res.blob();
    const fileURL = URL.createObjectURL(raw);
    window.open(fileURL, '_blank');
  };

  const handleAddSale = async () => {
    if (!sale.client) {
      notification('tc', 'Agregar Cliente', 2);
      return;
    }

    if (!products.length > 0) {
      notification('tc', 'Nuevo Producto', 2);
      return;
    }

    if (sale.paymentType === '') {
      notification('tc', 'Nueva Forma de pago', 2);
      return;
    }

    const saleProducts = products.map((item) => ({
      quality: item.quality,
      price: item.price,
      name: item.name,
      product: item._id,
      description: item.description,
    }));

    const data = { ...sale, products: saleProducts };

    try {
      const response = await useApiCall({
        loadingOn: true,
        dispatch,
        url: 'sales',
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.success) {
        notification('tc', response.message, 1);
        setProducts([]);
        setSales({
          totalPrice: 0,
          client: '',
          products: [],
        });
        fetchData(response.data._id);
      } else {
        let message = 'Venta  Error';
        if (response.error.indexOf('client') > -1)
          message = 'Cliente es requerido';

        notification('tc', message, 3);
      }
    } catch (error) {
      notification('tc', 'Venta  Error', 3);
    }
  };

  const handleAddProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const handleEdit = (id) => {
    const newArray = products.map(
      (product) =>
        (product._id === id && {
          ...product,
          qualityEdit: true,
        }) ||
        product
    );

    setProducts(newArray);
  };

  const handleRemove = (id) => {
    const newArray = products.filter((product) => product._id !== id);
    setProducts(newArray);
  };

  const handlePayment = ({ target: { value } }) => {
    if (value !== 'select')
      setSales((prev) => ({ ...prev, paymentType: value }));
    else setSales((prev) => ({ ...prev, paymentType: '' }));
  };

  const totalIva = totalPrice * 0.21;

  const totalPriceIva = totalPrice + totalIva;

  return (
    <CustomWell toLink={'/admin/principal'} headerTitle={`Nueva Venta`}>
      <Client onAdd={handleAddClientToSale} clientSale={client} />
      <SearchProduct
        onAdd={handleAddProduct}
        saleProducts={products}
        alertNotification={notification}
      />
      <div className="content">
        <Row>
          <Col md={4}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Forma de pago</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                name="payment"
                onChange={handlePayment}
              >
                <option value="">Seleccione</option>
                {payments.length > 0 &&
                  payments.map((item) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
              </FormControl>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Tipo de factura</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                name="billType"
                value={sale.billType}
                onChange={({ target: { value } }) => {
                  if (value !== 'select')
                    setSales((prev) => ({
                      ...prev,
                      billType: value,
                    }));
                  else setSales((prev) => ({ ...prev, billType: '' }));
                }}
              >
                <option value="">Seleccione</option>
                {[
                  { id: 1, name: 'Factura A' },
                  { id: 2, name: 'Factura B' },
                  { id: 3, name: 'Consumidor Final' },
                ].map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
      </div>

      <Row>
        <Col md={12} style={{ textAlign: 'center', marginBottom: '15px' }}>
          <h3>Venta</h3>
        </Col>
      </Row>
      <Table striped hover>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Venta</th>
            <th>SubTotal</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, key) => {
            return (
              <tr key={key}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>
                  {(item.qualityEdit && (
                    <>
                      <Row>
                        <Col xs={3}>
                          <FormGroup controlId="qualityControl">
                            <FormControl
                              type="numeric"
                              name="quality"
                              onChange={(e) => {
                                const { value } = e.target;
                                setErrors({});
                                if (parseInt(value, 10) === 0) {
                                  setErrors({
                                    stock: 'Cantidad Requerida',
                                  });
                                  const newArray = products.map(
                                    (product) =>
                                      (product._id === item._id && {
                                        ...product,
                                        quality: '',
                                        subTotal: item.price * value,
                                      }) ||
                                      product
                                  );

                                  setProducts(newArray);
                                } else {
                                  if (parseInt(value, 10) > item.stock)
                                    setErrors({
                                      stock: 'Cantidad Invalida',
                                    });
                                  const newArray = products.map(
                                    (product) =>
                                      (product._id === item._id && {
                                        ...product,
                                        quality: value ? value : 0,
                                        subTotal: item.price * value,
                                      }) ||
                                      product
                                  );
                                  setProducts(newArray);
                                }
                              }}
                              bsClass="form-control"
                              value={item.quality}
                            />
                          </FormGroup>
                        </Col>
                        {item.quality <= item.stock && (
                          <Col xs={3}>
                            <Button
                              bsStyle="success"
                              onClick={() => {
                                const newArray = products.map(
                                  (product) =>
                                    (product._id === item._id && {
                                      ...product,
                                      qualityEdit: false,
                                    }) ||
                                    product
                                );

                                setProducts(newArray);
                              }}
                            >
                              <i
                                className="fa fa-check-circle-o"
                                style={{ fontSize: '21px' }}
                              >
                                {' '}
                              </i>
                            </Button>
                          </Col>
                        )}
                      </Row>

                      {item.qualityEdit && errors.stock && (
                        <span style={{ color: 'red' }}>
                          {' '}
                          {errors.stock}
                          <br />
                          {`Stock Disponible : ${item.stock}`}
                        </span>
                      )}
                    </>
                  )) ||
                    item.quality}
                </td>
                <td>{item.price}</td>
                <td>{item.price * item.quality}</td>

                <td>
                  <Row>
                    {!item.qualityEdit && (
                      <Col xs={12} md={6}>
                        <Button
                          bsStyle="info"
                          onClick={() => handleEdit(item._id)}
                        >
                          Edit
                        </Button>
                      </Col>
                    )}
                    <Col xs={12} md={6}>
                      <Button
                        bsStyle="danger"
                        onClick={() => handleRemove(item._id)}
                      >
                        Borrar
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="content" style={{ marginTop: '50px' }}>
        <Row>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-wallet text-success" />}
              statsText="Total a pagar:"
              statsValue={'$' + totalPrice}
              statsIcon={<i className="fa fa-refresh" />}
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-server text-warning" />}
              statsText="Iva %:"
              statsValue={sale.billType ? (sale.billType !== '1' ? 21 : 0) : 0}
              statsIcon={<i className="fa fa-refresh" />}
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-server text-warning" />}
              statsText="Total a pagar + iva :"
              statsValue={
                sale.billType
                  ? sale.billType !== '1'
                    ? '$ ' + totalPriceIva
                    : '$ ' + totalPrice
                  : 0
              }
              statsIcon={<i className="fa fa-refresh" />}
            />
          </Col>
        </Row>
      </div>

      <Row>
        <Col xs={12} md={12}>
          {!errors.stock && (
            <Button
              bsStyle="success"
              className="pull-right"
              fill
              onClick={handleAddSale}
            >
              VENDER
            </Button>
          )}
        </Col>
      </Row>
    </CustomWell>
  );
};

export default AddSales;
