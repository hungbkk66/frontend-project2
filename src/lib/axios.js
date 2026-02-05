import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://backend-pj2-v1.onrender.com/api',
  withCredentials: true,
});
