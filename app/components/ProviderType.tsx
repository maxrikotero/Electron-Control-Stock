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

const ProviderType = ({ onSave, notification }) => {
  const [providers, setProviders] = useState([]);
  const [providerSelected, setProviderSelected] = useState(0);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await useApiCall({
        url: 'providers',
      });
      if (response.data) setProviders(response.data);
    };
    fetchProviders();
  }, []);

  const handleSave = () => {
    if (providerSelected) {
      const selected = providers.filter(
        (type) => type._id === providerSelected
      )[0];

      if (price) onSave({ ...selected, price });
      else notification('tc', 'Agregue un precio', 2);
    } else {
      notification('tc', 'Agregue un proveedor', 2);
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
                value={providerSelected}
                onChange={(e) => {
                  setProviderSelected(e.target.value);
                }}
              >
                <option value={0}>Seleccione</option>
                {providers.map((item) => (
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

export default ProviderType;
