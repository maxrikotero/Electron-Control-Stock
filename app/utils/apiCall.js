const apiCall = async ({ url, ...res }) => {
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
};

export default apiCall;
