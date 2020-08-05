import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useApiUrl from '../hooks/useApiUrl';
import { set } from '../features/user/userSlice';

type Props = {
  children: ReactNode;
};

const App = (props: Props) => {
  const apiUrl = useApiUrl();
  const dispatch = useDispatch();

  useEffect(() => {
    debugger;
    const fetchUser = (token) => {
      fetch(`${apiUrl}/users/userdata`, {
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          debugger;
          dispatch(set(data));
        })
        .catch((err) => {
          debugger;
        });
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    }
  }, []);
  const { children } = props;
  return <>{children}</>;
};

export default App;
