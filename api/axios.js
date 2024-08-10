// api.js
import axios from 'axios';

export const API_KEY = "c8830c57bf7e4f06b24460d04a74cbb2";

const api = axios.create({
  baseURL: "https://api.rawg.io/api/",
});

// Adding an interceptor to include the API key in all requests
api.interceptors.request.use(
  config => {
    config.params = config.params || {};
    config.params.key = API_KEY;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
