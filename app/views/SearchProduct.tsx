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
import useModal from '../hooks/useModal';
import useApiUrl from '../hooks/useApiUrl';
import ProductList from '../views/ProductList';
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
      return [];
    });
}

const SearchProduct = ({ onAdd, saleProducts, alertNotification }) => {
  // State and setter for search term
  const [searchTerm, setSearchTerm] = useState('');
  const [priceSelected, setPriceSelected] = useState({});
  // State and setter for search results
  const [results, setResults] = useState<any[]>([]);
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

  const { ModalComponent, setModal } = useModal('large');

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
    const product = {
      code: data.code,
      name: data.name,
      description: data.description,
      _id: data._id,
      quality: data.quality,
      price: data.price,
      subTotal: data.price * data.quality,
      stock: data.stock,
    };
    onAdd(product);
    setSearchTerm('');
    setResults(results.filter(result => result._id !== data._id));
  };

  const handleSelectProduct = (data) => {
    if (!results.some((item) => item._id === data._id)) {
      if (
        saleProducts.length > 0 &&
        saleProducts.some((item) => item._id === data._id)
      ) {
        alertNotification('tc', 'Producto ya fue agregado a la venta', 3);
      } else {
        setResults((prev) => prev.concat(data));
        setModal(false);
      }
    } else {
      alertNotification('tc', 'Producto ya fue agregado', 3);
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md={8}>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
            }}
          >
            <Col md={6}>
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
            <Col md={6}>
              <FormGroup controlId="queryControl">
                <Button bsStyle="primary" onClick={() => setModal(true)}>
                  Ver listado de productos
                </Button>
              </FormGroup>
            </Col>
          </Row>
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
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Tipo Precio</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Cantidad</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>
                          <Row>
                            <Col xs={12} md={10}>
                              <FormGroup controlId="formControlsSelect">
                                <FormControl
                                  componentClass="select"
                                  placeholder="select"
                                  name="price"
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setResults((prev) =>
                                      prev.map((prod) =>
                                        prod._id === item._id
                                          ? {
                                              ...prod,
                                              price:
                                                value !== 'select'
                                                  ? item.prices.filter(
                                                      (p) => p._id === value
                                                    )[0].price
                                                  : null,
                                            }
                                          : prod
                                      )
                                    );
                                  }}
                                >
                                  <option value="select">seleccione</option>
                                  {item.prices.map((item) => (
                                    <option value={item._id}>
                                      {item.priceType && item.priceType.name}
                                    </option>
                                  ))}
                                </FormControl>
                              </FormGroup>
                            </Col>
                          </Row>
                        </td>
                        <td> {item.price}</td>
                        <td>{item.stock}</td>
                        <td>
                          <Row>
                            <Col md={6}>
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
                                      setResults((prev) =>
                                        prev.map((prod) =>
                                          prod._id === item._id
                                            ? { ...prod, quality: '' }
                                            : prod
                                        )
                                      );
                                    } else {
                                      if (parseInt(value, 10) > item.stock)
                                        setErrors({
                                          stock: 'Cantidad Invalida',
                                        });
                                      else {
                                        setResults((prev) =>
                                          prev.map((prod) =>
                                            prod._id === item._id
                                              ? { ...prod, quality: value }
                                              : prod
                                          )
                                        );
                                      }
                                    }
                                  }}
                                  placeHolder="Cantidad"
                                  bsClass="form-control"
                                  value={item.quality}
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
                          {!Boolean(errors.stock) &&
                            item.price &&
                            item.quality && (
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
                        <td>
                          {
                            <Button
                              bsStyle="danger"
                              onClick={() =>
                                setResults((prev) =>
                                  prev.filter((prod) => prod._id !== item._id)
                                )
                              }
                            >
                              <i
                                className="fa fa-times"
                                style={{ fontSize: '21px' }}
                              >
                                {' '}
                              </i>
                            </Button>
                          }
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
      <ModalComponent title="Lista de productos">
        <ProductList
          {...{ actions: false, onlyCode: true, onSelect: handleSelectProduct }}
        />
      </ModalComponent>
    </div>
  );
};

export default SearchProduct;
