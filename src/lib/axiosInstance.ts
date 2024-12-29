import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Base URL API RajaOngkir
  headers: {
    key: process.env.NEXT_PUBLIC_API_KEY,
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
