/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import MaterialTable from 'material-table';
import UserProfile from './UserProfile';
import apiCall from '../utils/apiCall';
import ConfirmModal from '../components/Confirm/Confirm';
import CustomWell from '../components/CustomWell';

const UserList = ({ notification }) => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({});
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState({
    show: false,
    id: null,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchUsers = async () => {
    const data = await apiCall({ url: 'users' });
    if (data) setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    setEditUser(users.filter((user) => user._id === id)[0]);
    handleShow();
  };

  const handleUpdate = () => {
    fetchUsers();
    handleClose();
  };

  const handleDelete = (_id) => {
    setShowConfirm({ show: true, id: _id });
  };
  const deleteUser = async () => {
    const url = `users/${showConfirm.id}`;
    try {
      const response = await apiCall({ url, method: 'DELETE' });

      if (response.success) {
        setShowConfirm({
          show: false,
          id: null,
        }),
          notification('tc', 'Usuario Borrado', 1);
        fetchUsers();
      } else {
        notification('tc', 'Error', 3);
      }
    } catch (error) {
      notification('tc', 'Error', 3);
    }
  };

  return (
    <CustomWell headerTitle={`Usuarios`}>
      <div>
        <MaterialTable
          title=""
          components={{ Container: (props) => props.children }}
          options={{
            actionsColumnIndex: -1,
          }}
          columns={[
            { title: 'DNI', field: 'dni' },
            { title: 'CUIL', field: 'cuil' },

            {
              title: 'Nombre',
              render: (rowData) => `${rowData.firstName} ${rowData.lastName}`,
            },
            {
              title: 'Usuario',
              field: 'userName',
            },

            {
              title: 'Email',
              field: 'email',
            },
            {
              title: 'Telefono',
              field: 'phone',
            },
            {
              title: 'Celular',
              field: 'mobile',
            },
          ]}
          data={users}
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
        />
      </div>

      <Modal show={show} onHide={handleClose} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserProfile
            _id={editUser._id}
            onSave={handleUpdate}
            notification={notification}
          />
        </Modal.Body>
      </Modal>
      <ConfirmModal
        {...{
          closeText: 'Cancelar',
          confirmText: 'Si',
          title: 'Borrar Usuario',
          body: 'Esta seguro de borrar este usuaria.',
          show: showConfirm.show,
          onAction: deleteUser,
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

export default UserList;
