import { set } from '../features/apiCallStatus/apiCallStatusSlice';

const useApiCall = async ({ url, loadingOn = false, dispatch, ...res }) => {
  try {
    if (loadingOn) dispatch(set(true));

    const response = await fetch(`${process.env.API_URL}/${url}`, {
      ...res,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    let data = await response.json();

    if (loadingOn) dispatch(set(false));
    return data;
  } catch (error) {
    if (loadingOn) dispatch(set(false));
    return {
      success: false,
      error: error,
    };
  }
};

export default useApiCall;
