import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import apiCall from '../utils/apiCall';
import { set } from '../features/user/userSlice';
import { setCategories } from '../features/selects/selectsSlice';

type Props = {
  children: ReactNode;
};

const App = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      try {
        let [userData, categories] = await Promise.all([
          apiCall({
            url: 'users/userdata',
          }),
          apiCall({
            url: 'categories',
          }),
        ]);

        dispatch(set(userData));
        dispatch(setCategories(categories));
      } catch (error) {
        alert('Error Cargando Usuario');
      }
    };

    getUserData();
  }, []);
  const { children } = props;
  return <>{children}</>;
};

export default App;
