/*eslint-disable */
import React, { useState, useRef } from 'react';
import {
  Row,
  Col,
  Grid,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import { style } from '../../variables/Variables';
import apiCall from '../../utils/apiCall';
import useModal from '../../hooks/useModal';
import ProductList from '../../views/ProductList';
import Button from '../../components/CustomButton/CustomButton';
import CustomWell from '../../components/CustomWell';
import CurrencyInput from '../../components/CurrencyInput/CurrencyInput';

const AddNewStock = ({ notification }: { notification: any }) => {
  const [state, setState] = useState({
    productSelected: {},
    amount: 0,
    expire: null,
  });

  const { ModalComponent, setModal } = useModal('large');

  const handleProductSelected = (product) => {
    if (product._id !== state.productSelected?._id) {
      setModal(false);
      setState((prev) => ({ ...prev, productSelected: product }));
    } else {
      notification('tc', 'El producto ya fue seleccionado', 2);
    }
  };

  const handleChange = ({ target: { name, value } }) =>
    setState((prev) => ({ ...prev, [name]: value }));

  const handleSave = async () => {
    if (parseInt(state.amount, 10) > 0 && state.expire) {
      var response = await apiCall({
        url: `products/${state.productSelected._id}`,
        method: 'PUT',
        body: JSON.stringify({
          _id: state.productSelected._id,
          stock: state.productSelected.stock + parseInt(state.amount, 10),
          quality: parseInt(state.amount, 10),
          from: 'updateStock',
          expires: [
            ...state.productSelected.expires,
            {
              amount: state.amount,
              expire: state.expire,
              entryDate: new Date(),
            },
          ],
        }),
      });
      if (response.success) {
        setState({
          productSelected: {},
          amount: 0,
          expire: new Date(),
        });
        notification('tc', response.message, 1);
      } else {
        notification('tc', 'Guardar producto error', 3);
      }
    } else {
      switch (true) {
        case parseInt(state.amount, 10) <= 0:
          notification('tc', 'Cantidad es requerida', 2);
          break;
        case !state.expire:
          notification('tc', 'Fecha de vencimiento es requerida', 2);
          break;
        default:
          break;
      }
    }
  };

  const notificationSystem = useRef<HTMLInputElement>();
  return (
    <CustomWell
      dynamicPath={'/admin/inventario'}
      toLink={'/admin/principal'}
      headerTitle={`Alta de stock`}
    >
      <Grid container>
        <Row>
          <Col md={12}>
            <FormGroup controlId="queryControl">
              <Button bsStyle="primary" onClick={() => setModal(true)}>
                Ver listado de productos
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Grid>

      <Grid container spacing={1} fluid>
        <Row>
          <Col xs={12} md={3}>
            <FormGroup controlId="nameControl">
              <ControlLabel>Nombre</ControlLabel>
              <FormControl
                type="text"
                name="minStock"
                onChange={handleChange}
                bsClass="form-control"
                value={state.productSelected.name || ''}
                disabled={true}
              />
            </FormGroup>
          </Col>
          <Col xs={12} md={3}>
            <FormGroup controlId="nameControl">
              <ControlLabel>Stock</ControlLabel>
              <FormControl
                type="text"
                name="minStock"
                onChange={handleChange}
                bsClass="form-control"
                value={state.productSelected.stock || 0}
                disabled={true}
              />
            </FormGroup>
          </Col>

          <Col xs={12} md={3}>
            <FormGroup controlId="nameControl">
              <ControlLabel>Cantidad</ControlLabel>
              <CurrencyInput
                placeholder="$0.00"
                type="text"
                name="amount"
                onChange={handleChange}
                value={state.amount}
              />
            </FormGroup>
          </Col>
          <Col xs={12} md={3}>
            <FormGroup controlId="expireControl">
              <ControlLabel>Fecha Vencimiento</ControlLabel>
              <FormControl
                type="date"
                name="expire"
                onChange={handleChange}
                bsClass="form-control"
                value={state.expire}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12}>
            <Button
              bsStyle="info"
              pullRight
              fill
              onClick={handleSave}
              disabled={!Boolean(state.productSelected?._id)}
            >
              Guardar
            </Button>
          </Col>
        </Row>
      </Grid>

      <ModalComponent title="Lista de productos">
        <ProductList
          {...{
            actions: false,
            hasLink: false,
            onlyCode: true,
            onSelect: handleProductSelected,
          }}
        />
      </ModalComponent>
      <NotificationSystem ref={notificationSystem} style={style} />
    </CustomWell>
  );
};

export default AddNewStock;
