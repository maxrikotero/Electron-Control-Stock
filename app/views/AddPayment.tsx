/*eslint-disable */
import React, { useRef } from 'react';
import NotificationSystem from 'react-notification-system';
import { style } from '../variables/Variables';
import apiCall from '../utils/apiCall';
import AddSimpleForm from '../components/AddSimpleForm';
import CustomWell from '../components/CustomWell';

const AddPayment = ({
  notification,
  isSale = null,
  onCancelSale,
  afterSave = null,
}: {
  notification: any;
}) => {
  const notificationSystem = useRef<HTMLInputElement>();

  const handleSubmit = async (values: any) => {
    var response = await apiCall({
      url: 'payments',
      method: 'POST',
      body: JSON.stringify(values),
    });
    if (response.success) {
      notification('tc', 'Tipo de pago Agregado', 1);
      if (typeof afterSave === 'function') afterSave();
    } else {
      let message = 'Nueva Forma de pago Error';
      if (response.error.indexOf('name') > -1)
        message = 'Tipo de pago Existente';

      notification('tc', message, 3);
    }
  };

  return (
    <CustomWell
      toLink={'/admin/principal'}
      headerTitle={`Nueva Forma de pago`}
      dynamicPath={'/admin/payments'}
      hideHeader={isSale}
    >
      <AddSimpleForm
        onSave={handleSubmit}
        onCancel={onCancelSale}
        cancelButton={true}
      />

      <NotificationSystem ref={notificationSystem} style={style} />
    </CustomWell>
  );
};

export default AddPayment;
