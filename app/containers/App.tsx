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
      let [userData, categories] = await Promise.all([
        apiCall({
          url: 'users/userdata',
        }),
        apiCall({
          url: 'categories',
        }),
      ]);
      debugger;
      dispatch(set(userData));
      dispatch(setCategories(categories));
    };

    getUserData();
  }, []);
  const { children } = props;
  return <>{children}</>;
};

export default App;
