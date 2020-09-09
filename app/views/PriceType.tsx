/*eslint-disable */
import React, { useRef } from 'react';
import NotificationSystem from 'react-notification-system';
import { style } from '../variables/Variables';
import apiCall from '../utils/apiCall';
import AddSimpleForm from '../components/AddSimpleForm';

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
      let message = 'Agregar Tipo de Precio Error';
      // if (response.error) {
      //   if (response.error.indexOf('name') > -1)
      //     message = 'Tipo de Precio Existente';
      // }

      notification('tc', message, 3);
    }
  };

  return (
    <div className="content">
      <AddSimpleForm title={title} onSave={handleSubmit} />
      <NotificationSystem ref={notificationSystem} style={style} />
    </div>
  );
};

export default PriceType;
