/*eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Row,
  Col,
  Table,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

import useApiUrl from '../hooks/useApiUrl';

import useDebounce from '../hooks/useDebounce';

// API search function
function searchCharacters(search) {
  const apiUrl = useApiUrl();

  return fetch(`${apiUrl}/products/search?query=${search}`, {
    method: 'GET',
  })
    .then((r) => r.json())
    .then((r) => {
      return r.products;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

const SearchProduct = ({ onAdd, saleProducts, alertNotification }) => {
  // State and setter for search term
  const [searchTerm, setSearchTerm] = useState('');
  const [priceSelected, setPriceSelected] = useState({});
  // State and setter for search results
  const [results, setResults] = useState([]);
  // State for search status (whether there is a pending API request)
  const [isSearching, setIsSearching] = useState(false);

  const [errors, setErrors] = useState({});

  const [quality, setQuality] = useState();

  // Now we call our hook, passing in the current searchTerm value.
  // The hook will only return the latest value (what we passed in) ...
  // ... if it's been more than 500ms since it was last called.
  // Otherwise, it will return the previous value of searchTerm.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Here's where the API call happens
  // We use useEffect since this is an asynchronous action
  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm) {
        // Set isSearching state
        setIsSearching(true);
        // Fire off our API call
        searchCharacters(debouncedSearchTerm).then((results) => {
          // Set back to false since request finished
          setIsSearching(false);
          // Set results state
          if (
            saleProducts.length >= 0 &&
            saleProducts.filter((item) => item.code === results[0].code)
              .length === 0
          )
            setResults(results);
          else alertNotification('tc', 'Producto ya fue agregado', 3);
          // }
        });
      } else {
        setResults([]);
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm]
  );

  // Pretty standard UI with search input and results

  const handleSave = (data) => {
    const price = priceSelected.price;
    const product = {
      code: data.code,
      name: data.name,
      description: data.description,
      _id: data._id,
      quality,
      price,
      subTotal: price * quality,
    };
    onAdd(product);
    setQuality();
    setSearchTerm('');
    setResults([]);
    setPriceSelected({});
  };

  const handleChange = ({ target: { value } }) => {
    debugger;
    if (value !== 'select')
      setPriceSelected(
        results[0].prices.filter((item) => item._id === value)[0]
      );
    else setPriceSelected({});
  };

  return (
    <div className="content">
      <Row>
        <Col md={4}>
          <FormGroup controlId="queryControl">
            <ControlLabel>Buscar Producto</ControlLabel>
            <FormControl
              type="text"
              name="query"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeHolder="Buscar Producto"
              bsClass="form-control"
              value={searchTerm}
            />
          </FormGroup>
        </Col>
      </Row>
      {isSearching && <div>Searching ...</div>}
      {results.length > 0 && (
        <>
          <Row>
            <Col md={12}>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo Precio</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td>{item.name}</td>
                        <td>
                          <Row>
                            <Col xs={12} md={8}>
                              <FormGroup controlId="formControlsSelect">
                                {/* <ControlLabel>Tipo de precio</ControlLabel> */}
                                <FormControl
                                  componentClass="select"
                                  placeholder="select"
                                  name="price"
                                  onChange={handleChange}
                                >
                                  <option value="select">seleccione</option>
                                  {item.prices.map((item) => (
                                    <option value={item._id}>
                                      {item.priceType.name}
                                    </option>
                                  ))}
                                </FormControl>
                              </FormGroup>
                            </Col>
                          </Row>
                        </td>
                        <td> {priceSelected.price}</td>
                        <td>{item.stock}</td>
                        <td>
                          <Row>
                            <Col md={4}>
                              <FormGroup controlId="qualityControl">
                                <FormControl
                                  type="numeric"
                                  name="quality"
                                  maxLength={50}
                                  onChange={(e) => {
                                    const { value = 0 } = e.target;
                                    setErrors({});
                                    if (parseInt(value, 10) === 0) {
                                      setErrors({
                                        stock: 'Cantidad Requerida',
                                      });
                                    } else {
                                      if (parseInt(value, 10) > item.stock)
                                        setErrors({
                                          stock: 'Cantidad Invalida',
                                        });
                                    }
                                    setQuality(value);
                                  }}
                                  placeHolder="Cantidad"
                                  bsClass="form-control"
                                  value={quality}
                                />
                              </FormGroup>
                              <span style={{ color: 'red' }}>
                                {' '}
                                {errors.stock}
                              </span>
                            </Col>
                          </Row>
                        </td>
                        <td>
                          {!Boolean(errors.stock) && priceSelected.price && (
                            <Button
                              bsStyle="success"
                              onClick={() => handleSave(item)}
                            >
                              <i
                                className="fa fa-check-circle-o"
                                style={{ fontSize: '21px' }}
                              >
                                {' '}
                              </i>
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default SearchProduct;
