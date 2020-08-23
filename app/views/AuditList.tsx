/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import MaterialTable from 'material-table';
import apiCall from '../utils/apiCall';

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
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <MaterialTable
              title=""
              components={{ Container: (props) => props.children }}
              columns={[
                { title: 'Auditoria', field: 'audit' },
                {
                  title: 'Fecha',
                  render: (rowData) =>
                    moment(rowData.createdAt).format('YYYY-MM-DD'),
                },
                {
                  title: 'Usuario',
                  render: (rowData) =>
                    `${rowData.createdBy.firstName} ${rowData.createdBy.lastName}`,
                },
              ]}
              options={{
                exportButton: true,
                actionsColumnIndex: -1,
              }}
              data={audits}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default AuditList;
