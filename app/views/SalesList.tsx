/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';
// import Movement from './ProductMovement';
import Card from '../components/Card/Card';
import useApiUrl from '../hooks/useApiUrl';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  // const [editProduct, setEditProduct] = useState({});
  // const [show, setShow] = useState(false);
  // const [movement, setMovementId] = useState({
  //   showMovement: false,
  //   movementId: 0,
  // });
  const apiUrl = useApiUrl();

  // const { showMovement, movementId } = movement;

  // const handleClose = () => setShow(false);

  const fetchSales = () => {
    fetch(`${apiUrl}/sales`)
      .then((res) => res.json())
      .then((data) => {
        setSales(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchSales();
  }, []);

  // const handleShowMovement = (id) => {
  //   setMovementId({
  //     showMovement: true,
  //     movementId: id,
  //   });
  // };

  // const handleCloseMovement = () => {
  //   setMovementId(0);
  // };

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Lista de Ventas"
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Precio Total</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>{item.totalPrice}</td>
                          <td>{item.paidAt}</td>

                          <td>
                            <Row>
                              <Col xs={12} md={3}>
                                <Button bsStyle="info" onClick={() => {}}>
                                  Movimientos
                                </Button>
                              </Col>
                            </Row>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              }
            />
          </Col>
        </Row>
      </Grid>
      {/* {showMovement && (
        <Movement id={movementId} onClose={handleCloseMovement} />
      )} */}
    </div>
  );
};

export default SalesList;
