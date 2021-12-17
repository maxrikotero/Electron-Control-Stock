/*eslint-disable */
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import apiCall from '../utils/apiCall';
import ConfirmModal from '../components/Confirm/Confirm';
import useModal from '../hooks/useModal';
import AddSimpleForm from '../components/AddSimpleForm';

const ProcessList = ({ notification, refreshList = false }) => {
  const [processes, setProcesses] = useState([]);
  const [showConfirm, setShowConfirm] = useState({
    show: false,
    id: null,
  });
  const [editProcess, setEditProcess] = useState({});
  const { ModalComponent, setModal } = useModal('large');

  const fetchPriceTypes = async () => {
    const data = await apiCall({ url: 'process' });
    if (data) setProcesses(data);
  };

  useEffect(() => {
    fetchPriceTypes();
  }, [refreshList]);

  const handleEdit = (id) => {
    setEditProcess(processes.filter((process) => process._id === id)[0]);
    setModal((prev) => !prev);
  };

  const handleDelete = (_id) => {
    setShowConfirm({ show: true, id: _id });
  };

  const handleSave = async (data) => {
    setModal((prev) => !prev);
    var response = await apiCall({
      url: `process/${data._id}`,
      method: 'PUT',
      body: JSON.stringify(data),
    });
    if (response.success) {
      notification('tc', 'Proceso Actualizado', 1);
      setProcesses(response.data);
      setEditProcess({});
    } else {
      let message = 'Actualizar Error';
      notification('tc', message, 3);
    }
  };

  const deleteProcess = async () => {
    const url = `process/${showConfirm.id}`;
    try {
      const response = await apiCall({ url, method: 'DELETE' });

      setShowConfirm({
        show: false,
        id: null,
      });

      if (response.success) {
        notification('tc', 'Proceso Borrado', 1);
        fetchPriceTypes();
      } else {
        notification('tc', response.error, 3);
      }
    } catch (error) {
      notification('tc', 'Error', 3);
    }
  };

  return (
    <React.Fragment>
      <div>
        <MaterialTable
          title=""
          components={{ Container: (props) => props.children }}
          columns={[
            { title: 'Nombre', field: 'name' },
            { title: 'Descripción', field: 'description' },
            {
              title: 'Descripción',
              render: (rowData) =>
                moment.utc(rowData.createAt).format('YYYY-MM-DD'),
            },
          ]}
          options={{
            exportButton: true,
            actionsColumnIndex: -1,
          }}
          data={
            processes.length > 0
              ? processes.reduce(
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
          actions={[
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
          ]}
        />
      </div>

      <ModalComponent title="Proceso">
        <AddSimpleForm
          title="Editar proceso"
          onSave={handleSave}
          data={editProcess}
        />
      </ModalComponent>
      <ConfirmModal
        {...{
          closeText: 'Cancelar',
          confirmText: 'Borrar',
          title: 'Borrar Proceso',
          body: 'Esta seguro de borrar este proceso.',
          show: showConfirm.show,
          onAction: deleteProcess,
          onClose: () =>
            setShowConfirm({
              show: false,
              id: null,
            }),
        }}
      />
    </React.Fragment>
  );
};

export default ProcessList;
