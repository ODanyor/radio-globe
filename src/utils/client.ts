// TODO: env varibales
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

export function abortableFetch(request: string, opts = {}) {
  const controller = new AbortController();
  const signal = controller.signal;

  return {
    ready: client(request, { ...opts, signal }),
    abort: () => controller.abort(),
  };
}

export default client;
