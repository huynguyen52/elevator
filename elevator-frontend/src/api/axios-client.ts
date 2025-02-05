import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/',
});

axiosClient.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error),
);

export default axiosClient;
