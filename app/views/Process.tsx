/*eslint-disable */
import React, { useState, useRef } from 'react';
import NotificationSystem from 'react-notification-system';
import { style } from '../variables/Variables';
import apiCall from '../utils/apiCall';
import AddSimpleForm from '../components/AddSimpleForm';
import CustomWell from '../components/CustomWell';
import ProcessList from '../views/ProcessList';

const Process = ({ notification, url = 'process' }) => {
  const notificationSystem = useRef<HTMLInputElement>();
  const [refreshList, setRefreshList] = useState(false);
  const handleSubmit = async (values: any) => {
    var response = await apiCall({
      url,
      method: 'POST',
      body: JSON.stringify(values),
    });
    if (response.success) {
      notification('tc', 'Proceso Creado.', 1);
      setRefreshList((prev) => !prev);
    } else {
      let message = 'Nuevo Proceso Error';
      notification('tc', message, 3);
    }
  };

  return (
    <CustomWell
      toLink={'/admin/principal'}
      headerTitle={`Proceso`}
      link={false}
    >
      <AddSimpleForm onSave={handleSubmit} />
      <NotificationSystem ref={notificationSystem} style={style} />
      <ProcessList notification={notification} refreshList={refreshList} />
    </CustomWell>
  );
};

export default Process;
