import React, { useState, useEffect } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';
import CurrencyInput from './CurrencyInput/CurrencyInput';
import useApiCall from '../hooks/useApiCall';

const PriceType = ({ onSave, notification }) => {
  const [types, setTypes] = useState([]);

  const [typeSelected, setTypeSelected] = useState(0);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await useApiCall({
        url: 'pricetype',
      });
      if (data) setTypes(data);
    };
    fetchClients();
  }, []);

  const handleSave = () => {
    if (typeSelected) {
      const selected = types.filter((type) => type._id === typeSelected)[0];
      onSave({ ...selected, price });
    } else {
      notification('tc', 'Agregue un tipo de precio', 2);
    }
  };
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col xs={12} md={12}>
            <FormGroup controlId="formControlsSelect">
              <FormControl
                componentClass="select"
                placeholder="select"
                value={typeSelected}
                onChange={(e) => {
                  setTypeSelected(e.target.value);
                }}
              >
                <option value={0}>Seleccione</option>
                {types.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
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
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <div style={{ marginTop: '20px' }}>
              <Button bsStyle="info" block onClick={handleSave}>
                Seleccionar
              </Button>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default PriceType;
