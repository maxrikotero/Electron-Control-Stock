import React, { useState, useEffect } from 'react';
import {
  DropdownButton,
  MenuItem,
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

// interface Options {
//   id: number;
//   text: string;
// }
// interface DropdownProps {
//   options: Options[];
// }

const Dropdown = ({ onAdd, clientId }) => {
  debugger;
  const [state, setState] = useState({
    id: 0,
    fullName: '',
    address: '',
  });

  const { fullName, address, id } = state;

  const client = [
    {
      id: 1,
      firstName: 'Maxi',
      lastName: 'Orellana',
      address: 'Avenida tavella',
    },
    { id: 2, firstName: 'Yamil', lastName: 'Alegre', address: 'El tribuno' },
  ];

  useEffect(() => {
    if (clientId > 0) {
      const clientData = client.filter((item) => item.id === clientId);
      setState({
        id: clientData[0].id,
        fullName: clientData[0].firstName,
        address: clientData[0].address,
      });
    } else {
      setState({
        id: 0,
        fullName: '',
        address: '',
      });
    }
  }, [clientId]);

  const handleSelected = (opt) => {
    debugger;
    onAdd(opt.id);
  };

  return (
    <div className="content">
      <Row>
        <Col md={3}>
          <FormGroup controlId="clientontrol">
            <ControlLabel style={{ display: 'flex' }}>Cliente</ControlLabel>
            <DropdownButton
              bsStyle="test"
              title={fullName || 'Seleccionar Cliente'}
              id="dropdown-basic-"
              style={{
                width: '100%',
              }}
            >
              {client.map((item) => (
                <MenuItem
                  eventKey={item.id}
                  onClick={() => handleSelected(item)}
                >{`${item.firstName} ${item.lastName}`}</MenuItem>
              ))}
            </DropdownButton>
          </FormGroup>
        </Col>
        <Col md={3}>
          <div>Nombre</div>
          <br />
          <div>{fullName || '-'}</div>
        </Col>
        <Col md={3}>
          <div>Direccion</div>
          <br />
          <div>{address || '-'}</div>
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

export default Dropdown;
