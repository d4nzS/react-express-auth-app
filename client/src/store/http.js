import axios from 'axios';

export const API_URL = 'https://peaceful-scrubland-08125.herokuapp.com/api';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

export default api;