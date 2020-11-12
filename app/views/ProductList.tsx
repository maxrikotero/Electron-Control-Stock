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

const ProductList = ({
  notification,
  onlyCode = false,
  actions = true,
  onSelect,
}) => {
  const { redirect, setRedirect } = useRedirect();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({});
  const [show, setShow] = useState(false);
  const [movement, setMovementId] = useState({
    showMovement: false,
    movementId: 0,
  });
  const [showConfirm, setShowConfirm] = useState({
    show: false,
    id: null,
  });

  const { showMovement, movementId } = movement;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await useApiCall({
        loadingOn: true,
        dispatch,
        url: 'products',
      });
      if (response) setProducts(response);
    };
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
              return <Button bsStyle="info">Edit</Button>;
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
            title: 'Vencimiento',
            render: (rowData) =>
              moment.utc(rowData.expire).format('YYYY-MM-DD'),
            cellStyle: (cellValue, rowData) => {
              return moment.utc(rowData.expire).format('YYYY-MM-DD') <=
                moment(new Date()).format('YYYY-MM-DD')
                ? {
                    backgroundColor: 'red',
                    color: '#FFF',
                  }
                : '';
            },
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
            title: 'Precio',
            field: 'price',
          },
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
      <HeaderTitle
        title="PRODUCTOS"
        redirect={redirect}
        onRedirect={() => setRedirect((prev) => !prev)}
      />
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
                  localization={{
                    body: {
                      emptyDataSourceMessage: 'No hay registros',
                      addTooltip: 'Agregar',
                      deleteTooltip: 'Eliminar',
                      editTooltip: 'Editar',
                      filterRow: {
                        filterTooltip: 'Filtrar',
                      },
                      editRow: {
                        deleteText: 'Esta seguro de borrar?',
                        cancelTooltip: 'Cancelar',
                      },
                    },
                    header: {
                      actions: 'Acciones',
                    },
                    pagination: {
                      labelDisplayedRows: '{from}-{to} de {count}',
                      labelRowsSelect: 'Filas',
                      labelRowsPerPage: 'Filas por pagina:',
                    },
                    toolbar: {
                      nRowsSelected: '{0} Filas(s) seleccionadas(s)',
                      exportTitle: 'Exportar',
                      exportAriaLabel: 'Exportar',
                      exportName: 'Exportar en CSV',
                      searchTooltip: 'Buscar',
                      searchPlaceholder: 'Buscar',
                    },
                  }}
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
