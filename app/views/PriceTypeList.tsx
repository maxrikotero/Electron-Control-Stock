/*eslint-disable */
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import apiCall from '../utils/apiCall';
import { Button } from 'react-bootstrap';
import ConfirmModal from '../components/Confirm/Confirm';
import useModal from '../hooks/useModal';
import CustomWell from '../components/CustomWell';
import AddSimpleForm from '../components/AddSimpleForm';

const PriceTypeList = ({ notification }) => {
  const [priceTypes, setPriceTypes] = useState([]);
  const [showConfirm, setShowConfirm] = useState({
    show: false,
    id: null,
  });
  const [editPriceType, setEditPriceType] = useState({});
  const { ModalComponent, setModal } = useModal('large');

  const fetchPriceTypes = async () => {
    const data = await apiCall({ url: 'pricetype' });
    if (data) setPriceTypes(data);
  };

  useEffect(() => {
    fetchPriceTypes();
  }, []);

  const handleEdit = (id) => {
    setEditPriceType(priceTypes.filter((priceType) => priceType._id === id)[0]);
    setModal((prev) => !prev);
  };

  const handleDelete = (_id) => {
    setShowConfirm({ show: true, id: _id });
  };

  const handleSave = async (data) => {
    setModal((prev) => !prev);
    var response = await apiCall({
      url: `pricetype/${data._id}`,
      method: 'PUT',
      body: JSON.stringify({ name: data.name, description: data.description }),
    });

    if (response.success) {
      notification('tc', 'Tipo de precio Actualizado', 1);
      setPriceTypes(response.data);
      setEditPriceType({});
    } else {
      let message = 'Actualizar Error';
      notification('tc', message, 3);
    }
  };

  const deletePriceType = async () => {
    const url = `pricetype/${showConfirm.id}`;
    try {
      const response = await apiCall({ url, method: 'DELETE' });

      setShowConfirm({
        show: false,
        id: null,
      });

      if (response.success) {
        notification('tc', 'Tipo de precio Borrado', 1);
        fetchPriceTypes();
      } else {
        notification('tc', response.error, 3);
      }
    } catch (error) {
      notification('tc', 'Eliminar Error', 3);
    }
  };

  return (
    <CustomWell headerTitle={`Tipo Precios`} dynamicPath={'/admin/pricetype'}>
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
            priceTypes.length > 0
              ? priceTypes.reduce(
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

      <ModalComponent title="Tipo de precio">
        <AddSimpleForm
          title="Editar tipo de precio"
          onSave={handleSave}
          data={editPriceType}
        />
      </ModalComponent>
      <ConfirmModal
        {...{
          closeText: 'Cancelar',
          confirmText: 'Borrar',
          title: 'Borrar Tipo de precio',
          body: 'Esta seguro de borrar este tipo de precio.',
          show: showConfirm.show,
          onAction: deletePriceType,
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

export default PriceTypeList;
