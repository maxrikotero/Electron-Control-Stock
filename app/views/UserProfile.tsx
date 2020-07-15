/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

import { Card } from '../components/Card/Card';
import { FormInputs } from '../components/FormInputs/FormInputs';
import { UserCard } from '../components/UserCard/UserCard';
import Button from '../components/CustomButton/CustomButton';

import avatar from '../assets/img/faces/face-3.jpg';

class UserProfile extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Editar Usuario"
                content={
                  <form>
                    <FormInputs
                      ncols={['col-md-4', 'col-md-4', 'col-md-4']}
                      properties={[
                        {
                          label: 'DNI',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'DNI',
                        },
                        {
                          label: 'Nombre',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Nombre',
                        },
                        {
                          label: 'Apellido',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Apellido',
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-6', 'col-md-6']}
                      properties={[
                        {
                          label: 'Usuario',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Usuario',
                        },
                        {
                          label: 'Email',
                          type: 'email',
                          bsClass: 'form-control',
                          placeholder: 'Email',
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-6', 'col-md-6']}
                      properties={[
                        {
                          label: 'Contraseña',
                          type: 'password',
                          bsClass: 'form-control',
                          placeholder: 'Contraseña',
                        },
                        {
                          label: 'Celular',
                          type: 'number',
                          bsClass: 'form-control',
                          placeholder: 'Celular',
                        },
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
                      Guardar
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
