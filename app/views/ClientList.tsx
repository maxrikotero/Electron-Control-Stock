/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import MaterialTable from 'material-table';
import { useDispatch } from 'react-redux';
import EditClient from './EditClient';
import Card from '../components/Card/Card';
import useApiCall from '../hooks/useApiCall';

const ProductList = ({ notification }) => {
  const [clients, setClients] = useState([]);
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

  const deleteClient = async (id) => {
    // if (confirm('Esta seguro de borrar?')) {

    const url = `clients/${id}`;
    try {
      const response = await useApiCall({ url, method: 'DELETE' });

      if (response.success) {
        setClients(response.data);
      }
    } catch (error) {
      alert('error');
    }
    // }
  };

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Lista de Clientes"
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
                        onClick: (event, rowData) => deleteClient(rowData._id),
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
          <Modal.Title>Editar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditClient client={editClient} onEdit={handleUpdate} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductList;
