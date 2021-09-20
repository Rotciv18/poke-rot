import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3333',
  baseURL: 'https://pokerot.com',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export default api;
