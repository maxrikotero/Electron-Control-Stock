import React, { useState, useEffect, useRef } from 'react';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import apiCall from '../../utils/apiCall';

// interface Options {
//   id: number;
//   text: string;
// }
// interface DropdownProps {
//   options: Options[];
// }

const ClientSelect = ({ onAdd, clientSale }) => {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({});
  const inputSelect = useRef();
  const fetchClients = async () => {
    try {
      const data = await apiCall({ url: 'clients' });
      if (data) setClients(data);
    } catch (error) {
      setClients([]);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (!clientSale) {
      setClient({});
      inputSelect.current.value = '';
    }
  }, [clientSale]);

  const handleSelected = ({ target: { value } }) => {
    if (value) {
      setClient(
        clients.reduce(
          (acc, client) => (client._id === value ? client : acc),
          {}
        )
      );
      onAdd(value);
    } else {
      setClient({});
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md={3}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Cliente</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              name="client"
              inputRef={inputSelect}
              onChange={handleSelected}
            >
              <option value="">Seleccione</option>
              {clients.length > 0 &&
                clients.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
            </FormControl>
          </FormGroup>
        </Col>
        <Col md={3}>
          <div>Nombre</div>
          <br />
          <div>{client.name || '-'}</div>
        </Col>
        <Col md={3}>
          <div>Direccion</div>
          <br />
          <div>{client.address || '-'}</div>
        </Col>
        <Col md={3}>
          <div>Cuil</div>
          <br />
          <div>{client.cuil || '-'}</div>
        </Col>
        {/* {/* <Col md={3}>
          <FormGroup controlId="stockControl">
            <ControlLabel>Stock</ControlLabel>
            <FormControl
              type="number"
              name="stock"
              disabled={true}
              onChange={() => {}}
              placeholder="Stock"
              bsClass="form-control"
              value={stock}
            />
          </FormGroup>
        </Col> */}
        {/* <Col md={3}>
          <FormGroup controlId="priceControl">
            <ControlLabel>Precio Venta</ControlLabel>
            <FormControl
              type="number"
              name="price"
              disabled={true}
              onChange={() => {}}
              placeholder="Precio Venta"
              bsClass="form-control"
              value={price}
            />
          </FormGroup>
        </Col>{' '} */}
      </Row>
    </div>
  );
};

export default ClientSelect;
