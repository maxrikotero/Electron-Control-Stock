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
import AddRawMaterial from './AddRawMaterial';
import useRedirect from '../hooks/useRedirect';
import useApiCall from '../hooks/useApiCall';
import ModalForm from '../components/ModalForm';

const RawMaterialList = ({ notification, actions = true, onSelect }) => {
  const { redirect, setRedirect } = useRedirect();
  const dispatch = useDispatch();
  const [rawMaterials, setRawMaterials] = useState([]);
  const [editRawMaterial, setEditRawMaterial] = useState({});
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

  const fetchRawMaterials = async () => {
    const response = await useApiCall({
      loadingOn: true,
      dispatch,
      url: 'rawmaterial',
    });
    if (response) setRawMaterials(response);
  };
  useEffect(() => {
    fetchRawMaterials();
  }, []);

  const handleEdit = (id) => {
    setEditRawMaterial(
      rawMaterials.filter((rawMaterial) => rawMaterial._id === id)[0]
    );
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
        url: `rawmaterial/${data._id}`,
        method: 'PUT',
        body: JSON.stringify(data),
      });
      if (response.success) {
        notification('tc', 'Materia Prima Actualizado', 1);
        handleClose();
        fetchRawMaterials();
      } else {
        let message = 'Error Actualizar';
        if (response.error.indexOf('name') > -1)
          message = 'Materia Prima Existente';
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

  const deleteRawMaterial = async () => {
    const url = `rawmaterial/${showConfirm.id}`;
    try {
      const response = await apiCall({ url, method: 'DELETE' });

      if (response.success) {
        setShowConfirm({
          show: false,
          id: null,
        }),
          notification('tc', 'Materia Prima Borrada', 1);
        fetchRawMaterials();
      }
    } catch (error) {
      notification('tc', 'Error', 3);
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

    columns: [
      { title: 'Nombre', field: 'name' },
      {
        title: 'Proveedores',
        render: (rowData) => {
          return (
            <div style={{ width: '100px' }}>
              <FormGroup controlId="formControlsSelect">
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  name="category"
                >
                  {rowData.providers.map(
                    (item) =>
                      item.provider &&
                      item.provider.name && (
                        <option
                          value={item._id}
                        >{`${item.provider.name} $${item.price}`}</option>
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
        render: (rowData) => moment.utc(rowData.expire).format('YYYY-MM-DD'),
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
    ],
  };
  return (
    <div className="content">
      <HeaderTitle
        title="Materia Prima"
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
                  data={rawMaterials}
                  actions={materialConfig.actions}
                />
              </div>
            </Col>
          </Well>
        </Row>
      </Grid>
      <ModalForm {...{ show, handleClose, title: 'Editar Materia Prima' }}>
        <AddRawMaterial
          rawMaterial={editRawMaterial}
          onEdit={handleUpdate}
          isEdit={!0}
          notification={notification}
        />
      </ModalForm>

      {showMovement && (
        <Movement
          id={movementId}
          onClose={handleCloseMovement}
          url="rawMaterial"
        />
      )}
      <ConfirmModal
        {...{
          closeText: 'Cancelar',
          confirmText: 'Borrar',
          title: 'Borrar Materia Prima',
          body: 'Esta seguro de borrar esta Materia Prima.',
          show: showConfirm.show,
          onAction: deleteRawMaterial,
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

export default RawMaterialList;
