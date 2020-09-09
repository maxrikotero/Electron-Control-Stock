/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import MaterialTable from 'material-table';
import UserProfile from './UserProfile';
import Card from '../components/Card/Card';
import apiCall from '../utils/apiCall';
import ConfirmModal from '../components/Confirm/Confirm';

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
      }
    } catch (error) {
      alert('error');
    }
  };

  return (
    <div>
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Lista de Usuarios"
              ctTableFullWidth
              ctTableResponsive
              content={
                <div className="content">
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
                        render: (rowData) =>
                          `${rowData.firstName} ${rowData.lastName}`,
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
              }
            />
          </Col>
        </Row>
      </Grid>
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
          confirmText: 'Borrar',
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
    </div>
  );
};

export default UserList;
