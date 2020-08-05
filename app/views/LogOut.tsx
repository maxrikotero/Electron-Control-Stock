import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const LogOut = () => {
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);
  return <Redirect to="/" />;
};

export default LogOut;
