/*eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import NotificationSystem from 'react-notification-system';
import Loader from 'react-loader-spinner';
import { Formik } from 'formik';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Collapse,
} from 'react-bootstrap';
import MaterialTable from 'material-table';
import Checkbox from '../components/CustomCheckbox/CustomCheckbox';
import { style } from '../variables/Variables';
import apiCall from '../utils/apiCall';
import Button from '../components/CustomButton/CustomButton';
import CustomWell from '../components/CustomWell';
import CurrencyInput from '../components/CurrencyInput/CurrencyInput';

const initialState = {
  _id: '',
  isOpen: false,
  amount: null,
  date: null,
  income: false,
  exit: false,
  incomes: [],
  exits: [],
};

const Balance = ({ notification, data, isEdit }: { notification: any }) => {
  const [state, setState] = useState(initialState);

  const [isLoading, setIsLoading] = useState(false);

  const [entry, setStateEntryType] = useState({
    income: false,
    exit: false,
  });

  const fetchBalance = async () => {
    const data = await apiCall({
      url: 'balance/openbalance',
    });

    const balance = data.find((b) => b.isOpen === true);

    if (balance && Object.keys(balance).length > 0) setState(balance);
  };

  useEffect(() => {
    setIsLoading((prev) => !prev);
    fetchBalance();
  }, []);
  const notificationSystem = useRef<HTMLInputElement>();

  const { incomes, exits, isOpen } = state;

  const { income, exit } = entry;

  const handleSubmit = async (values: any) => {
    var response = await apiCall({
      url: `balance/${state._id}`,
      method: 'PUT',
      body: JSON.stringify({
        ...state,
        incomes: income ? [...incomes, values] : incomes,
        exits: exit ? [...exits, values] : exits,
      }),
    });
    if (response.success) {
      notification('tc', `${income ? 'Ingreso' : 'Egreso'} Guardado`, 1);
      setState(response.data);
    } else {
      const message = `${income ? 'Ingreso' : 'Egreso'} Error`;

      notification('tc', message, 3);
    }
  };

  const handleClose = async () => {
    var response = await apiCall({
      url: `balance/${state._id}`,
      method: 'PUT',
      body: JSON.stringify({
        ...state,
        isOpen: false,
      }),
    });
    if (response.success) {
      notification('tc', 'Caja Cerrada', 1);
      setState(initialState);
    } else {
      const message = 'Caja Cerrada Error';

      notification('tc', message, 3);
    }
  };

  const handleBalance = ({ target: { name, value } }) => {
    setStateEntryType({
      income: name === 'income' && value === 'on',
      exit: name === 'exit' && value === 'on',
    });
  };

  const handleOpen = async () => {
    var response = await apiCall({
      url: `balance`,
      method: 'POST',
      body: JSON.stringify({
        isOpen: true,
      }),
    });
    if (response.success) {
      setState(response.data);
      notification('tc', 'Caja Abierta', 1);
    } else {
      const message = 'Apertura de caja Error';

      notification('tc', message, 3);
    }
  };

  return (
    <React.Fragment>
      <CustomWell toLink={'/admin/principal'} headerTitle={`Caja`} link={false}>
        <Formik
          initialValues={{
            amount: 0,
            description: '',
            movement: false,
          }}
          validate={(values) => {
            const errors: any = {};
            if (!values.amount) {
              errors.amount = 'Requerido';
            }

            if (!income && !exit) errors.movement = 'Requerido';

            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values);
            setStateEntryType({
              income: false,
              exit: false,
            });
            setSubmitting(false);
            resetForm({});
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} md={4}>
                  <Button
                    bsStyle="info"
                    pullRight
                    fill
                    type="submit"
                    onClick={isOpen ? handleClose : handleOpen}
                  >
                    {`${(isOpen && 'Cerrar Caja') || 'Abrir Caja'}`}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={4}>
                  <FormGroup controlId="nameControl">
                    <ControlLabel>Monto</ControlLabel>
                    <CurrencyInput
                      placeholder="$0.00"
                      type="text"
                      name="amount"
                      onChange={handleChange}
                      value={values.amount}
                      disabled={!isOpen}
                    />
                  </FormGroup>
                  <span
                    style={{
                      color: 'red',
                      display: isOpen ? 'initial' : 'none',
                    }}
                  >
                    {' '}
                    {errors.amount}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <FormGroup controlId="descrControl">
                    <ControlLabel>Descripción</ControlLabel>
                    <FormControl
                      rows="5"
                      componentClass="textarea"
                      name="description"
                      onChange={handleChange}
                      bsClass="form-control"
                      value={values.description}
                      disabled={!isOpen}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Collapse in={isOpen}>
                <Row>
                  <Col xs={12} md={12}>
                    <Checkbox
                      name="income"
                      number={1}
                      isChecked={income}
                      label="Ingreso"
                      onChange={handleBalance}
                    />
                    <Checkbox
                      number={2}
                      isChecked={exit}
                      name="exit"
                      label="Egreso"
                      onChange={handleBalance}
                    />
                    {!income && !exit && (
                      <span style={{ color: 'red' }}> {errors?.movement}</span>
                    )}
                  </Col>
                </Row>
              </Collapse>
              <Button
                bsStyle="info"
                pullRight
                fill
                type="submit"
                disabled={isSubmitting}
              >
                Guardar
              </Button>
              <div className="clearfix" />
            </form>
          )}
        </Formik>

        <NotificationSystem ref={notificationSystem} style={style} />

        <Row>
          <Col md={6}>
            <h4>Ingresos</h4>
            <MaterialTable
              title=""
              components={{ Container: (props) => props.children }}
              options={{
                actionsColumnIndex: -1,
              }}
              columns={[
                { title: 'Monto', field: 'amount' },
                { title: 'Descripcion', field: 'description' },
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
                    deleteText: 'Esta seguro de borrar?',
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
              }}
              data={incomes}
            />
          </Col>

          <Col md={6}>
            <h4>Egresos</h4>
            <MaterialTable
              title=""
              components={{ Container: (props) => props.children }}
              options={{
                actionsColumnIndex: -1,
              }}
              columns={[
                { title: 'Monto', field: 'amount' },
                { title: 'Descripcion', field: 'description' },
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
                    deleteText: 'Esta seguro de borrar?',
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
              }}
              data={exits}
            />
          </Col>
        </Row>
      </CustomWell>
    </React.Fragment>
  );
};

export default Balance;
