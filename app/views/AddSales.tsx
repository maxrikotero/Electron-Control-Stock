/*eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Row,
  Col,
  Table,
  Button,
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Card from '../components/Card/Card';
import Client from '../components/Dropdown/Dropdown';
import SearchProduct from '../views/SearchProduct';
import apiCall from '../utils/apiCall';

const AddSales = ({ notification }) => {
  debugger;
  const [sale, setSales] = useState({
    totalPrice: 0,
    client: '',
    products: [],
  });
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [quality, setQuality] = useState(null);

  const { sessionData } = useSelector((state) => state.user);

  const { totalPrice, client } = sale;

  useEffect(() => {
    debugger;
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

  const handleAddSale = async () => {
    debugger;
    const saleProducts = products.map((item) => ({
      quality: item.quality,
      price: item.price,
      product: item._id,
    }));

    const data = { ...sale, products: saleProducts };

    try {
      const response = await apiCall({
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
      } else {
        let message = 'Venta  Error';
        // if (response.error.indexOf('name') > -1)
        //   message = 'Nombre Requerido';
        // if (response.error.indexOf('cuil') > -1)
        //   message = 'Cuil Existente';

        notification('tc', message, 3);
      }
    } catch (error) {
      notification('tc', 'Venta  Error', 3);
    }

    // fetch(`${apiUrl}/sales`, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     debugger;
    //   })
    //   .catch((err) => {
    //     debugger;
    //   });
  };

  const handleAddProduct = (sale) => {
    setProducts((prev) => [...prev, sale]);
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

  debugger;
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title={`Nueva venta  Vendor: ${sessionData.email}`}
              ctTableFullWidth
              ctTableResponsive
              content={
                <>
                  <Client onAdd={handleAddClientToSale} clientId={client} />
                  <SearchProduct onAdd={handleAddProduct} />

                  <Table striped hover>
                    <thead>
                      <tr>
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
                            <td>{item.name}</td>
                            <td>
                              {(item.qualityEdit && (
                                <FormGroup controlId="qualityControl">
                                  <FormControl
                                    type="numeric"
                                    name="quality"
                                    onChange={(e) => {
                                      const { value } = e.target;

                                      debugger;
                                      const newArray = products.map(
                                        (product) =>
                                          (product._id === item._id && {
                                            ...product,
                                            quality: value,
                                            subTotal: item.price * value,
                                          }) ||
                                          product
                                      );

                                      setProducts(newArray);
                                      // setProducts((prev) => {
                                      //   return prev.map((product) => {
                                      //     if (product._id === item._id) {
                                      //       return { ...prev, quality: value };
                                      //     }
                                      //     return item;
                                      //   });
                                      // });
                                    }}
                                    placeHolder="Cantidad"
                                    bsClass="form-control"
                                    value={item.quality}
                                  />
                                </FormGroup>
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
                  <div className="content">
                    <Row>
                      <Col xs={12} md={12}>
                        <div>{`Total a pagar ${totalPrice}`}</div>
                      </Col>
                    </Row>
                  </div>
                </>
              }
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Button
              bsStyle="success"
              className="pull-right"
              fill
              onClick={handleAddSale}
            >
              VENDER
            </Button>
          </Col>
        </Row>
      </Grid>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProduct
            notification={() => {}}
            product={editProduct}
            onClose={handleClose}
            {...{ handleClick, fetchProducts }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default AddSales;
