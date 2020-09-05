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

const typesData = [
  {
    id: 1,
    text: 'Comercio',
  },
  {
    id: 2,
    text: 'Final',
  },
  {
    id: 3,
    text: 'La Rotonda',
  },
];

const PriceType = ({ onSave, priceType }) => {
  const [types, setTypes] = useState([]);
  const [typeSelected, setTypeSelected] = useState(0);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (priceType) setTypeSelected(priceType);
    setTypes(typesData);
  }, []);

  const handleSave = () => {
    const selected = types.filter(
      (type) => type.id === parseInt(typeSelected, 0)
    )[0];
    onSave({ ...selected, price });
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
                  <option value={item.id}>{item.text}</option>
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
