const stand = process.env.NODE_ENV === 'production' 
  ? process.env.BASE_URL
  : 'http://localhost:8000/api';

const defaults = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
};

function client(url: string, options = {}) {
  return fetch(`${stand}/${url}`, {...options, ...defaults});
}

export default client;
