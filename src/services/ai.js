import axios from 'axios';

const BASE_URL =
  import.meta.env.VITE_API_URL ||
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
    console.log(`🚀 API request: ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) throw new Error('Network error - Cannot reach server');
    const status = error.response.status;
    const message = error.response.data?.error || 'An error occurred';
    switch (status) {
      case 500:
        throw new Error('Server error - Try later');
      case 503:
        throw new Error('Service unavailable - DB issue');
      default:
        throw new Error(message);
    }
  }
);

export const sendToAI = async (message) => {
  const response = await api.post('/ai/chat', { message });
  return response.data.response;
};

export default api;
