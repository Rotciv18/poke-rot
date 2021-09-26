import axios from 'axios';
import store from '../store';

const fetchClient = () => {
  const defaultOptions = {
    baseURL: 'https://pokerot.com',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(function (config) {
    const token = store.getState().twitchAuth.auth.token;
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
}

export default fetchClient();

// const api = axios.create({
//   // baseURL: 'http://localhost:3333',
//   baseURL: 'https://pokerot.com',
//   headers: {
//     // Authorization: `Bearer ${sessionStorage.getItem('token')}`
//     // Authorization: `Bearer ${token}`
//   },
// });

// function setAuth() {
//   if (store) {
//     api.defaults.headers.common['Authorization'] = store.getState().twitchAuth.auth.state.token;
//   } else {
//     api.defaults.headers.common['Authorization'] = null;
//   }
// }

// setAuth();

// export default api;
