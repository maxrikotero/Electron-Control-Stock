/*eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Row,
  Col,
  Button,
  Modal,
  FormControl,
  Well,
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';
import MaterialTable from 'material-table';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Movement from '../views/ProductMovement';
import apiCall from '../utils/apiCall';
import ConfirmModal from '../components/Confirm/Confirm';
import HeaderTitle from '../components/HeaderTitle';
import AddProduct from './AddProduct';
import useRedirect from '../hooks/useRedirect';
import useApiCall from '../hooks/useApiCall';
import useModal from '../hooks/useModal';
import materialLocation from '../utils/materialLocation';

const ExpireList = ({
  expires = [],
  productId,
  handleSaveExpire,
  handleDeleteExpire,
}) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    setState(
      expires.map((exp) => ({
        ...exp,
        expire: moment(exp?.expire).utc().format('YYYY-MM-DD'),
        entryDate: moment(exp?.entryDate).utc().format('YYYY-MM-DD'),
      }))
    );
  }, [expires]);
  return (
    <MaterialTable
      title=""
      components={{ Container: (props) => props.children }}
      options={{
        actionsColumnIndex: -1,
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            const newArray = state.concat(newData);
            resolve(handleSaveExpire(productId, newArray));
          }),
        onRowUpdate: (rowData) =>
          new Promise((resolve, reject) => {
            const newArray = state.map((i) =>
              i._id === rowData._id ? rowData : i
            );
            resolve(handleSaveExpire(productId, newArray));
          }),
        onRowDelete: (rowData) =>
          new Promise((resolve, reject) => {
            resolve(handleDeleteExpire(productId, rowData, state));
          }),
      }}
      localization={materialLocation}
      columns={[
        {
          title: 'Fecha',
          field: 'expire',
          editComponent: (rowData) => {
            return (
              <FormGroup controlId="expireControl">
                <FormControl
                  type="date"
                  name="expire"
                  bsClass="form-control"
                  value={rowData?.rowData?.value || rowData.value}
                  onChange={(e) => rowData.onChange(e.target.value)}
                />
              </FormGroup>
            );
          },
          cellStyle: (cellValue, rowData) => {
            return rowData?._id &&
              !rowData?.tableData?.editing &&
              moment.utc(cellValue).format('YYYY-MM-DD') <=
                moment(new Date()).format('YYYY-MM-DD')
              ? {
                  backgroundColor: 'red',
                  color: '#FFF',
                }
              : {};
          },
        },
        {
          title: 'Fecha Ingreso',
          field: 'entryDate',
          editComponent: (rowData) => (
            <FormGroup controlId="expireControl">
              <FormControl
                type="date"
                name="entryDate"
                bsClass="form-control"
                value={rowData?.rowData?.value || rowData.value}
                onChange={(e) => rowData.onChange(e.target.value)}
              />
            </FormGroup>
          ),
        },
      ]}
      data={state}
    />
  );
};
const ProductList = ({
  notification,
  onlyCode = false,
  actions = true,
  onSelect,
  hasLink = true,
}) => {
  const { redirect, setRedirect } = useRedirect();
  const { ModalComponent, setModal } = useModal('large');
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({});
  const [show, setShow] = useState(false);

  const [movement, setMovementId] = useState({
    showMovement: false,
    movementId: 0,
  });

  const [expires, setExpires] = useState({
    expiresData: [],
  });

  const [showConfirm, setShowConfirm] = useState({
    show: false,
    id: null,
  });

  const { showMovement, movementId } = movement;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchProducts = async () => {
    const response = await useApiCall({
      url: 'products',
    });
    if (response) setProducts(response);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    setEditProduct(products.filter((product) => product._id === id)[0]);
    handleShow();
  };

  const handleShowMovement = (id) => {
    setMovementId({
      showMovement: true,
      movementId: id,
    });
  };

  const handleShowExpiresData = (data) => {
    setExpires({
      productId: data._id,
      expiresData: data.expires,
    });
    setModal(true);
  };

  const handleCloseMovement = () => {
    setMovementId(0);
  };

  const handleUpdate = async (data) => {
    try {
      var response = await apiCall({
        url: `products/${data._id}`,
        method: 'PUT',
        body: JSON.stringify(data),
      });

      if (response.success) {
        notification('tc', 'Producto Actualizado', 1);
        handleClose();

        fetchProducts();
      } else {
        let message = 'Error Actualizar';
        if (response.error.indexOf('name') > -1) message = 'Producto Existente';
        if (response.error.indexOf('code') > -1) message = 'Codigo Existente';

        notification('tc', message, 3);
      }
    } catch (error) {
      notification('tc', 'Error al Actualizar producto', 3);
    }
  };

  const handleDelete = (_id) => {
    setShowConfirm({ show: true, id: _id });
  };

  const handleDeleteExpire = (productId, data, expiresList) => {
    const product = products.find((prod) => productId === prod._id);
    if (product?._id) {
      const prodToSave = {
        ...product,
        expires: expiresList.filter((exp) => exp._id !== data._id),
      };
      handleUpdate(prodToSave);
      setExpires({
        expiresData: [],
      });
      setModal(false);
    }
  };

  const handleSaveExpire = (productId, data) => {
    const product = products.find((prod) => productId === prod._id);
    if (product?._id && (data || []).length > 0) {
      const prodToSave = { ...product, expires: data };
      handleUpdate(prodToSave);
      setExpires({
        expiresData: [],
      });
      setModal(false);
    }
  };

  const deleteProduct = async () => {
    const url = `products/${showConfirm.id}`;
    try {
      const response = await apiCall({ url, method: 'DELETE' });

      if (response.success) {
        setShowConfirm({
          show: false,
          id: null,
        }),
          fetchProducts();
      }
    } catch (error) {
      alert('error');
    }
  };
  const materialConfig = {
    actions: actions
      ? [
          {
            icon: () => {
              return <Button bsStyle="info">Editar</Button>;
            },
            onClick: (event, rowData) => handleEdit(rowData._id),
          },
          {
            icon: () => <Button bsStyle="danger">Borrar</Button>,
            onClick: (event, rowData) => handleDelete(rowData._id),
          },
        ]
      : [],

    columns: !onlyCode
      ? [
          { title: 'Codigo', field: 'code' },
          { title: 'Nombre', field: 'name' },

          {
            title: 'Precio',
            render: (rowData) => {
              return (
                <div style={{ width: '100px' }}>
                  <FormGroup controlId="formControlsSelect">
                    <FormControl
                      componentClass="select"
                      placeholder="select"
                      name="category"
                    >
                      {rowData.prices.map(
                        (item) =>
                          item.priceType && (
                            <option
                              value={item._id}
                            >{`${item.priceType.name} $${item.price}`}</option>
                          )
                      )}
                    </FormControl>
                  </FormGroup>
                </div>
              );
            },
          },
          {
            title: 'Stock',
            field: 'stock',
            cellStyle: (cellValue, rowData) => {
              return rowData.minStock >= cellValue
                ? {
                    backgroundColor: 'red',
                    color: '#FFF',
                  }
                : '';
            },
          },

          {
            title: 'Min Stock',
            field: 'minStock',
          },
          {
            title: 'Vencimientos',
            render: (rowData) => (
              <Button
                bsStyle="info"
                onClick={() => handleShowExpiresData(rowData)}
              >
                Ver
              </Button>
            ),
          },
          {
            title: 'Movimientos',
            render: (rowData) => (
              <Button
                bsStyle="info"
                onClick={() => handleShowMovement(rowData._id)}
              >
                Ver
              </Button>
            ),
          },
        ]
      : [
          { title: 'Codigo', field: 'code' },
          { title: 'Nombre', field: 'name' },
          {
            render: (rowData) => (
              <Button bsStyle="info" onClick={() => onSelect(rowData)}>
                Agregar
              </Button>
            ),
          },
        ],
  };
  return (
    <div className="content">
      {hasLink && (
        <HeaderTitle
          title="PRODUCTOS"
          link={hasLink}
          redirect={redirect}
          onRedirect={() => setRedirect((prev) => !prev)}
        />
      )}

      <Grid fluid>
        <Row>
          <Well
            style={{
              background: '#fff',
            }}
          >
            <Col>
              <div>
                <MaterialTable
                  title=""
                  components={{ Container: (props) => props.children }}
                  options={{
                    actionsColumnIndex: -1,
                    exportButton: true,
                  }}
                  localization={materialLocation}
                  columns={materialConfig.columns}
                  data={products}
                  actions={materialConfig.actions}
                />
              </div>
            </Col>
          </Well>
        </Row>
      </Grid>
      <Modal show={show} onHide={handleClose} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProduct
            product={editProduct}
            onEdit={handleUpdate}
            isEdit={!0}
            notification={notification}
          />
        </Modal.Body>
      </Modal>
      {showMovement && (
        <Movement id={movementId} onClose={handleCloseMovement} />
      )}
      <ModalComponent title="Fecha de vencimientos">
        <ExpireList
          {...{
            expires: expires.expiresData,
            productId: expires.productId,
            handleSaveExpire,
            handleDeleteExpire,
          }}
        />
      </ModalComponent>
      <ConfirmModal
        {...{
          closeText: 'Cancelar',
          confirmText: 'Borrar',
          title: 'Borrar Producto',
          body: 'Esta seguro de borrar este Producto.',
          show: showConfirm.show,
          onAction: deleteProduct,
          onClose: () =>
            setShowConfirm({
              show: false,
              id: null,
            }),
        }}
      />
    </div>
  );
};

export default ProductList;
