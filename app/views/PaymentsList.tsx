/*eslint-disable */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import apiCall from '../utils/apiCall';
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';
import Card from '../components/Card/Card';
import { setCategories } from '../features/selects/selectsSlice';

const PaymentsList = ({ notification }) => {
  useState;
  const dispatch = useDispatch();
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
                <div className="content">
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
                      categories.length > 0
                        ? categories.reduce(
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
                    editable={{
                      onRowUpdate: (newData, oldData) =>
                        new Promise(async (resolve, reject) => {
                          if (!newData.name) {
                            notification(
                              'tc',
                              'Nombre de la Tipo de pago es Requerido',
                              2
                            );
                            reject();
                          } else {
                            try {
                              var response = await apiCall({
                                url: `categories/${newData._id}`,
                                method: 'PUT',
                                body: JSON.stringify(newData),
                              });
                              notification('tc', 'Tipo de pago Actualizada', 1);
                              dispatch(setCategories(response.data));
                            } catch (error) {
                              notification('tc', 'Error Acualizar', 3);
                            }
                            resolve();
                          }
                        }),
                      onRowDelete: (oldData) =>
                        new Promise(async (resolve, reject) => {
                          try {
                            var response = await apiCall({
                              url: `categories/${oldData._id}`,
                              method: 'DELETE',
                            });

                            if (!response.succes) {
                              notification('tc', 'Error Borrar', 3);
                            } else {
                              notification('tc', 'Tipo de pago Borrada', 1);
                              dispatch(setCategories(response.data));
                            }
                          } catch (error) {
                            notification('tc', 'Error Borrar', 3);
                          }

                          resolve();
                        }),
                    }}
                  />
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default PaymentsList;
