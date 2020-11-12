import { useState } from 'react';

const useRedirect = () => {
  const [redirect, setRedirect] = useState(false);
  return {
    redirect,
    setRedirect,
  };
};

export default useRedirect;
