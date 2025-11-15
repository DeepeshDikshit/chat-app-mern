import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chat-app-mern-7s5d.onrender.com',
  withCredentials: true  // this enables sending cookies with requests
});

export default api;
