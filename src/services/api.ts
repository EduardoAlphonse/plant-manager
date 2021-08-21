import axios from 'axios';

const api = axios.create({
  // insert local IPV4 (e.g., http://192.168.0.101:3333/)
  baseURL: 'http://192.168.2.103:3333/'
});

export default api;