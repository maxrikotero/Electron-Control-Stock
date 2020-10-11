/*eslint-disable */
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import apiCall from '../utils/apiCall';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Card from '../components/Card/Card';
import ConfirmModal from '../components/Confirm/Confirm';
import useModal from '../hooks/useModal';
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
      url: `payments/${data._id}`,
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

  const deleteUser = async () => {
    const url = `pricetype/${showConfirm.id}`;
    try {
      const response = await apiCall({ url, method: 'DELETE' });

      if (response.success) {
        setShowConfirm({
          show: false,
          id: null,
        }),
          notification('tc', 'Tipo de precio Borrado', 1);
        fetchPriceTypes();
      }
    } catch (error) {
      alert('error');
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

export default PriceTypeList;
