/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Row, Col, Button, Well, Modal } from 'react-bootstrap';
import MaterialTable from 'material-table';
import { useDispatch } from 'react-redux';
import apiCall from '../utils/apiCall';
import ConfirmModal from '../components/Confirm/Confirm';
import HeaderTitle from '../components/HeaderTitle';
import useRedirect from '../hooks/useRedirect';
import useApiCall from '../hooks/useApiCall';
import ModalForm from '../components/ModalForm';
import AddProvider from '../views/AddProvider';

const ProviderList = ({ notification }) => {
  const { redirect, setRedirect } = useRedirect();
  const dispatch = useDispatch();
  const [providers, setProviders] = useState([]);
  const [editProvider, setEditProvider] = useState({});
  const [show, setShow] = useState(false);
  const [dynamicRedirect, setDynamicRedirect] = useState(false);
  const [showConfirm, setShowConfirm] = useState({
    show: false,
    id: null,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchProviders = async () => {
    const response = await useApiCall({
      loadingOn: true,
      dispatch,
      url: 'providers',
    });
    if (response) setProviders(response.data);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleEdit = (id) => {
    setEditProvider(providers.filter((provider) => provider._id === id)[0]);
    handleShow();
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

        fetchProviders();
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

  const deleteProvider = async () => {
    const url = `providers/${showConfirm.id}`;
    try {
      const response = await apiCall({ url, method: 'DELETE' });

      if (response.success) {
        notification('tc', 'Proveedor Borrado', 1);
        setShowConfirm({
          show: false,
          id: null,
        }),
          fetchProviders();
      }
    } catch (error) {
      notification('tc', 'Error', 1);
    }
  };

  const handleSave = () => {
    handleClose((prev) => !prev);
    fetchProviders();
  };

  const materialConfig = {
    actions: [
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
    ],
    columns: [
      { title: 'Nombre', field: 'name' },
      { title: 'Razón Social', field: 'razonSocial' },
      { title: 'Dni', field: 'dni' },
      { title: 'Telefono', field: 'phone' },
      { title: 'Email', field: 'email' },
    ],
  };
  return (
    <div className="content">
      <HeaderTitle
        title="PROVEEDORES"
        redirect={redirect}
        onRedirect={() => setRedirect((prev) => !prev)}
        onDynamicRedirect={() => setDynamicRedirect((prev) => !prev)}
        dynamicRedirect={dynamicRedirect}
        dynamicPath={'/admin/provider'}
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
                  data={providers}
                  actions={materialConfig.actions}
                />
              </div>
            </Col>
          </Well>
        </Row>
      </Grid>
      <ModalForm {...{ show, handleClose, title: 'Editar Proveedor' }}>
        <AddProvider
          provider={editProvider}
          onEdit={handleUpdate}
          isEdit={!0}
          notification={notification}
          onSave={handleSave}
        />
      </ModalForm>

      <ConfirmModal
        {...{
          closeText: 'Cancelar',
          confirmText: 'Borrar',
          title: 'Borrar Proveedor',
          body: 'Esta seguro de borrar este Proveedor.',
          show: showConfirm.show,
          onAction: deleteProvider,
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

export default ProviderList;
