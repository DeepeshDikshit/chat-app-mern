import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true  // this enables sending cookies with requests
});

export default api;
