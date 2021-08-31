/*eslint-disable */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import MaterialTable from 'material-table';
import apiCall from '../utils/apiCall';
import CustomWell from '../components/CustomWell';

const AuditList = () => {
  const [audits, setAudits] = useState([]);
  const fetchAudits = async () => {
    const response = await apiCall({ url: `users/audit` });
    setAudits(response);
  };

  useEffect(() => {
    fetchAudits();
  }, []);

  return (
    <CustomWell headerTitle={`Aditorias`}>
      <MaterialTable
        title=""
        components={{ Container: (props) => props.children }}
        columns={[
          { title: 'Auditoria', field: 'audit' },
          {
            title: 'Fecha',
            render: (rowData) => moment(rowData.createdAt).format('DD-MM-YYYY'),
          },
          {
            title: 'Usuario',
            render: (rowData) =>
              `${rowData.createdBy.firstName} ${rowData.createdBy.lastName}`,
          },
        ]}
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
              deleteText: 'Esta seguro de borrar esta auditoria?',
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
        options={{
          exportButton: true,
          actionsColumnIndex: -1,
        }}
        data={audits}
      />
    </CustomWell>
  );
};

export default AuditList;
