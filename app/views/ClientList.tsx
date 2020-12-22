/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import MaterialTable from 'material-table';
import { useDispatch } from 'react-redux';
import EditClient from './EditClient';
import useApiCall from '../hooks/useApiCall';
import ConfirmModal from '../components/Confirm/Confirm';
import CustomWell from '../components/CustomWell';

const ClientList = ({ notification }) => {
  const [clients, setClients] = useState([]);
  const [showConfirm, setShowConfirm] = useState({
    show: false,
    id: null,
  });
  const [editClient, setEditClient] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const fetchClients = async () => {
    const data = await useApiCall({
      url: 'clients',
      loadingOn: true,
      dispatch,
    });

    if (data) setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleEdit = (id) => {
    setEditClient(clients.filter((client) => client._id === id)[0]);
    handleShow();
  };

  const handleUpdate = async (data: any) => {
    try {
      var response = await useApiCall({
        url: `clients/${data._id}`,
        method: 'PUT',
        body: JSON.stringify(data),
      });

      if (response.success) {
        notification('tc', 'Cliente Actualizado', 1);
        handleClose();

        setClients(response.data);
      } else {
        let message = 'Error Actualizar';

        notification('tc', message, 3);
      }
    } catch (error) {
      notification('tc', 'Error al Actualizar Cliente', 3);
    }
  };

  const deleteClient = async () => {
    const url = `clients/${showConfirm.id}`;
    try {
      const response = await useApiCall({ url, method: 'DELETE' });

      if (response.success) {
        setShowConfirm({
          show: false,
          id: null,
        }),
          setClients(response.data);
        notification('tc', 'Cliente Borrado', 1);
      } else {
        notification('tc', 'Error', 3);
      }
    } catch (error) {
      notification('tc', 'Error', 3);
    }
  };

  const handleDelete = (_id) => {
    setShowConfirm({ show: true, id: _id });
  };

  return (
    <CustomWell headerTitle={`Clientes`}>
      <div>
        <MaterialTable
          title=""
          components={{ Container: (props) => props.children }}
          options={{
            actionsColumnIndex: -1,
          }}
          columns={[
            { title: 'Nombre', field: 'name' },
            { title: 'Dirección', field: 'address' },

            {
              title: 'Telefono Fijo',
              field: 'phone',
            },
            {
              title: 'Celular',
              field: 'mobile',
            },

            {
              title: 'Cuil',
              field: 'cuil',
            },
            {
              title: 'Descripción',
              field: 'description',
            },
          ]}
          data={clients}
          actions={[
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
          ]}
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
        />
      </div>

      <Modal show={show} onHide={handleClose} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditClient client={editClient} onEdit={handleUpdate} />
        </Modal.Body>
      </Modal>
      <ConfirmModal
        {...{
          closeText: 'Cancelar',
          confirmText: 'Si',
          title: 'Borrar Cliente',
          body: 'Esta seguro de borrar este Cliente.',
          show: showConfirm.show,
          onAction: deleteClient,
          onClose: () =>
            setShowConfirm({
              show: false,
              id: null,
            }),
        }}
      />
    </CustomWell>
  );
};

export default ClientList;
