/*eslint-disable */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import apiCall from '../utils/apiCall';
import { Grid, Row, Col, Table, Button } from 'react-bootstrap';
import Card from '../components/Card/Card';
import { setCategories } from '../features/selects/selectsSlice';

const CategoryList = ({ notification }) => {
  const { categories } = useSelector(({ selects }) => selects);
  const dispatch = useDispatch();
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Lista de Categorias"
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
                    editable={{
                      onRowUpdate: (newData) =>
                        new Promise(async (resolve, reject) => {
                          if (!newData.name) {
                            notification(
                              'tc',
                              'Nombre de la categoria es Requerido',
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
                              notification('tc', 'Categoria Actualizada', 1);
                              dispatch(setCategories(response.data));
                              resolve();
                            } catch (error) {
                              notification('tc', 'Error Acualizar', 3);
                            }
                          }
                        }),
                      onRowDelete: (oldData) =>
                        new Promise(async (resolve, reject) => {
                          try {
                            var response = await apiCall({
                              url: `categories/${oldData._id}`,
                              method: 'DELETE',
                            });
                            if (!response.success) {
                              notification('tc', 'Error Borrar', 3);
                              reject();
                            } else {
                              notification('tc', 'Categoria Borrada', 1);
                              dispatch(setCategories(response.data));
                              resolve();
                            }
                          } catch (error) {
                            notification('tc', 'Error Borrar', 3);
                            reject();
                          }
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

export default CategoryList;
