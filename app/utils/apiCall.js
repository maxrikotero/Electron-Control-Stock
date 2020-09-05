const apiCall = async ({ url, ...res }) => {
  try {
    const response = await fetch(`${process.env.API_URL}/${url}`, {
      ...res,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    let data = await response.json();

    return data;
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export default apiCall;
