/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import MaterialTable from 'material-table';
import { useDispatch } from 'react-redux';
import useApiCall from '../../hooks/useApiCall';
import ConfirmModal from '../../components/Confirm/Confirm';
import CustomWell from '../../components/CustomWell';
import materialLocation from '../../utils/materialLocation';
import useModal from '../../hooks/useModal';
import DailyEntry from '../forms/DailyEntry';

const DailyEntryList = ({ notification }) => {
  const [dailyEntries, setClients] = useState([]);
  const [showConfirm, setShowConfirm] = useState({
    show: false,
    id: null,
  });
  const [dailyEntrySelected, setDailyEntrySelected] = useState({});
  const { ModalComponent, setModal } = useModal('large');

  const dispatch = useDispatch();
  const fetchEntries = async () => {
    const data = await useApiCall({
      url: 'dailyentry',
      loadingOn: true,
      dispatch,
    });

    if (data) setClients(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleEdit = (id) => {
    setDailyEntrySelected(dailyEntries.find((daily) => daily._id === id));
    setModal((prev) => !prev);
  };

  const deleteDailyEntry = async () => {
    const url = `dailyentry/${showConfirm.id}`;
    try {
      const response = await useApiCall({ url, method: 'DELETE' });

      if (response.success) {
        setShowConfirm({
          show: false,
          id: null,
        }),
          setClients(response.data);
        notification('tc', 'Diaria Borrada', 1);
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
    <CustomWell headerTitle={`Diarias`}>
      <div>
        <MaterialTable
          title=""
          components={{ Container: (props) => props.children }}
          options={{
            actionsColumnIndex: -1,
          }}
          columns={[
            { title: 'Producto', field: 'product' },
            { title: 'Cantidad', field: 'amount' },

            {
              title: 'Funcion',
              field: 'worker',
            },
            {
              title: 'Descripcion',
              field: 'description',
            },
          ]}
          data={dailyEntries}
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
          localization={materialLocation}
        />
      </div>

      <ModalComponent title="Editar Diaria">
        <DailyEntry
          notification={notification}
          isEdit
          data={dailyEntrySelected}
          afterAction={() => {
            setModal((prev) => !prev);
            fetchEntries();
          }}
        />
      </ModalComponent>

      <ConfirmModal
        {...{
          closeText: 'Cancelar',
          confirmText: 'Si',
          title: 'Borrar Diaria',
          body: 'Esta seguro de borrar esta Diaria.',
          show: showConfirm.show,
          onAction: deleteDailyEntry,
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

export default DailyEntryList;
