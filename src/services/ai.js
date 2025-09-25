import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === 'production'
    ? 'https://mind-mate-backend.vercel.app/api'
    : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - Please check your connection');
    }
    if (!error.response) {
      throw new Error('Network error - Unable to reach server');
    }
    const status = error.response.status;
    const message = error.response.data?.error || 'An error occurred';
    switch (status) {
      case 500:
        throw new Error('Server error - Please try again later');
      case 503:
        throw new Error('Service unavailable - Database connection failed');
      default:
        throw new Error(message);
    }
  }
);

export const sendToAI = async (message) => {
  try {
    const response = await api.post('/ai/chat', {
      message,
      timestamp: new Date().toISOString()
    });
    return response.data.response;
  } catch (error) {
    throw error;
  }
};

export default api;
