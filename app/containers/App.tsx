import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import apiCall from '../utils/apiCall';
import { set } from '../features/user/userSlice';
import { setCategories } from '../features/selects/selectsSlice';

type Props = {
  children: ReactNode;
};

const App = (props: Props) => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);

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

        if (userData.error) {
          setRedirect(true);
        } else {
          dispatch(set(userData));
          dispatch(setCategories(categories));
        }
      } catch (error) {
        setRedirect(true);
      }
    };
    if (localStorage.getItem('token')) getUserData();
    else {
      setRedirect(true);
    }
  }, []);
  const { children } = props;
  return (
    <>
      {redirect && <Redirect to="/" />}
      {children}
    </>
  );
};

export default App;
