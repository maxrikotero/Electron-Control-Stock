/*eslint-disable */
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import apiCall from '../utils/apiCall';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Card from '../components/Card/Card';
import ConfirmModal from '../components/Confirm/Confirm';
import useModal from '../hooks/useModal';
import AddSimpleForm from '../components/AddSimpleForm';

const PaymentsList = ({ notification }) => {
  const [payments, setPayments] = useState([]);
  const [showConfirm, setShowConfirm] = useState({
    show: false,
    id: null,
  });
  const [editPayment, setEditPayment] = useState({});
  const { ModalComponent, setModal } = useModal('large');

  const fetchPayments = async () => {
    const data = await apiCall({ url: 'payments' });
    if (data) setPayments(data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleEdit = (id) => {
    setEditPayment(payments.filter((user) => user._id === id)[0]);
    setModal((prev) => !prev);
  };

  const handleDelete = (_id) => {
    setShowConfirm({ show: true, id: _id });
  };

  const handleSave = async (data) => {
    setModal((prev) => !prev);
    var response = await apiCall({
      url: `payments/${data._id}`,
      method: 'PUT',
      body: JSON.stringify({ name: data.name, description: data.description }),
    });
    if (response.success) {
      notification('tc', 'Tipo de pago Actualizado', 1);
      setPayments(response.data);
      setEditPayment({});
    } else {
      let message = 'Actualizar Error';
      notification('tc', message, 3);
    }
  };

  const deletePayment = async () => {
    const url = `payments/${showConfirm.id}`;
    try {
      const response = await apiCall({ url, method: 'DELETE' });

      if (response.success) {
        setShowConfirm({
          show: false,
          id: null,
        }),
          notification('tc', 'Tipo de pago Borrado', 1);
        fetchPayments();
      } else {
        notification('tc', 'Error', 3);
      }
    } catch (error) {
      notification('tc', 'Error', 3);
    }
  };

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Lista de Tipo de pagos"
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  <MaterialTable
                    title=""
                    components={{ Container: (props) => props.children }}
                    columns={[
                      { title: 'Nombre', field: 'name' },
                      { title: 'Descripción', field: 'description' },
                    ]}
                    options={{
                      exportButton: true,
                      actionsColumnIndex: -1,
                    }}
                    data={
                      payments.length > 0
                        ? payments.reduce(
                            (acc, item) => [
                              ...acc,
                              {
                                _id: item._id,
                                name: item.name,
                                description: item.description || '',
                              },
                            ],
                            []
                          )
                        : []
                    }
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
                          deleteText: 'Esta seguro de borrar esta categoria?',
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
              }
            />
          </Col>
        </Row>
      </Grid>
      <ModalComponent title="Editar tipo de pago">
        <AddSimpleForm
          // title="Editar tipo de pago"
          onSave={handleSave}
          data={editPayment}
        />
      </ModalComponent>
      <ConfirmModal
        {...{
          closeText: 'Cancelar',
          confirmText: 'Si',
          title: 'Borrar Tipo de pago',
          body: 'Esta seguro de borrar este tipo de pago.',
          show: showConfirm.show,
          onAction: deletePayment,
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

export default PaymentsList;
