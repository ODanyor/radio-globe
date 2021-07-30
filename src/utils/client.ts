const stand = process.env.NODE_ENV === 'production' 
  ? process.env.BASE_URL
  : 'http://localhost:8000/api';

function client(url: string, options = {}) {
  return fetch(`${stand}/${url}`, options);
}

export default client;
