/* eslint react/jsx-props-no-spreading: off, @typescript-eslint/ban-ts-comment: off */
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { waitFor } from '@testing-library/react';
import Login from '../../../app/views/Login';
import * as userSlice from '../../../app/features/user/userSlice';

Enzyme.configure({ adapter: new Adapter() });
// jest.useFakeTimers();

interface useData {
  name: string;
}

function setup(
  preloadedState: { user: { sessionData: useData } } = {
    user: { sessionData: { name: 'Maxi' } },
  }
) {
  const store = configureStore({
    reducer: { user: userSlice.default },
    preloadedState,
  });

  const shallowComponent = shallow(
    <Provider {...{ store }}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  const getWrapper = () =>
    mount(
      <Provider {...{ store }}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

  const component = getWrapper();

  return {
    store,
    component,
    shallowComponent,
  };
}

describe('Login Component', () => {
  it("should render correctly in 'debuge' mode", () => {
    const { store } = setup();

    const component = shallow(
      <Provider {...{ store }}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
  it('should update email field on change', async () => {
    const { component } = setup();

    const emailInput = component.find("input[name='email']");

    emailInput.simulate('change', {
      persist: () => {},
      target: {
        name: 'email',
        value: 'email@test.com',
      },
    });

    await waitFor(() => {
      expect(emailInput.html()).toMatch('email@test.com');
    });
  });

  it('should update password field onChange', async () => {
    const { component } = setup();

    const passwordInput = component.find("input[name='password']");

    passwordInput.simulate('change', {
      persist: () => {},
      target: {
        name: 'password',
        value: '1234',
      },
    });

    await waitFor(() => {
      expect(passwordInput.html()).toMatch('1234');
    });
  });

  // it('should return error form invalid email address', async () => {
  //   const { store } = setup();

  //   const shallowComponent = shallow(
  //     <Provider {...{ store }}>
  //       <Router>
  //         <Login />
  //       </Router>
  //     </Provider>,
  //     {
  //       wrappingComponent: Provider,
  //       wrappingComponentProps: { store },
  //     }
  //   );

  //   const loginForm = (props: {
  //     errors: {};
  //     touched: { email: boolean };
  //     isSubmitting: boolean;
  //   }) =>
  //     shallowComponent.find(Login).dive().find(Formik).renderProp('children')(
  //       props
  //     );

  //   const formWithInvalidEmailErrors = loginForm({
  //     errors: {
  //       email: 'Invalid Email Address',
  //     },
  //     touched: { email: true },
  //     isSubmitting: false,
  //   });

  //   await waitFor(() => {
  //     expect(formWithInvalidEmailErrors.html()).toMatch(
  //       /Invalid Email Address/
  //     );
  //   });
  // });
});
