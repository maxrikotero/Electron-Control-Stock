/*eslint-disable */
import React, { useRef } from 'react';
import NotificationSystem from 'react-notification-system';
import { style } from '../variables/Variables';
import apiCall from '../utils/apiCall';
import AddSimpleForm from '../components/AddSimpleForm';
import CustomWell from '../components/CustomWell';

const PriceType = ({
  notification,
  successMessage,
  method,
  title,
  url = 'priceType',
}) => {
  const notificationSystem = useRef<HTMLInputElement>();
  const handleSubmit = async (values: any) => {
    var response = await apiCall({
      url,
      method: method ? method : 'GET',
      body: JSON.stringify(values),
    });
    if (response.success) {
      notification('tc', successMessage, 1);
    } else {
      let message = 'Nuevo Tipo de Precio Error';

      notification('tc', message, 3);
    }
  };
  debugger;
  return (
    <CustomWell
      toLink={'/admin/principal'}
      headerTitle={`Nuevo Tipo de precio`}
      isEdit={!method ? true : false}
    >
      <AddSimpleForm onSave={handleSubmit} />
      <NotificationSystem ref={notificationSystem} style={style} />
    </CustomWell>
  );
};

export default PriceType;
