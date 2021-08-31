/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import MaterialTable from 'material-table';
import moment from 'moment';
import apiCall from '../utils/apiCall';

const MovementList = ({ id, onClose, url = 'products' }) => {
  const [movements, setMovements] = useState([]);
  const [show, setShow] = useState(true);

  const fetchMovement = async () => {
    const response = await apiCall({ url: `${url}/movement/${id}` });
    setMovements(response);
  };

  useEffect(() => {
    fetchMovement();
  }, []);

  const handleClose = () => {
    setShow((prev) => !prev);
    onClose();
  };

  return (
    <div className="content">
      <Modal show={show} onHide={handleClose} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Lista de movimiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid fluid>
            <Row>
              <Col md={12}>
                <MaterialTable
                  title=""
                  components={{ Container: (props) => props.children }}
                  options={{
                    actionsColumnIndex: -1,
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
                  columns={[
                    {
                      title: 'Fecha',
                      render: (rowData) =>
                        moment(rowData.dateAt).format('DD-MM-YYYY, h:mm:ss a'),
                    },
                    { title: 'Cantidad', field: 'quality' },
                    {
                      title: 'Entrada',
                      render: (rowData) =>
                        Boolean(rowData.input) ? 'Si' : 'No',
                    },
                    {
                      title: 'Salida',
                      render: (rowData) =>
                        Boolean(rowData.output) ? 'Si' : 'No',
                    },
                    {
                      title: 'Fue Venta',
                      render: (rowData) =>
                        Boolean(rowData.isSale) ? 'Si' : 'No',
                    },
                    {
                      title: 'Fue Actualizado',
                      render: (rowData) =>
                        Boolean(rowData.isUpdated) ? 'Si' : 'No',
                    },
                  ]}
                  data={movements}
                />
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovementList;
