import axios from 'axios';

export default axios.create({
  baseURL: 'https://urban-mart-server.vercel.app/api/',
  // baseURL: 'http://localhost:8080/api/',
});
