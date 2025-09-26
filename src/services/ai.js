import axios from 'axios';

// Dynamic base URL for different environments
const getBaseURL = () => {
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:5000/api';
  }
  return 'https://mind-mate-backend.vercel.app/api';
};

const BASE_URL = getBaseURL();

console.log('🔧 API Base URL:', BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      url: error.config?.url
    });

    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - Please check your connection and try again');
    }
    
    if (!error.response) {
      throw new Error('Network error - Unable to reach the server. Please check your internet connection.');
    }
    
    const status = error.response.status;
    const message = error.response.data?.error || error.response.data?.message || 'An unexpected error occurred';

    switch (status) {
      case 400:
        throw new Error(message || 'Invalid request');
      case 401:
        throw new Error('Authentication error');
      case 404:
        throw new Error('Service not found');
      case 429:
        throw new Error('Too many requests - Please wait a moment and try again');
      case 500:
        throw new Error('Server error - Please try again later');
      case 503:
        throw new Error('Service temporarily unavailable - Please try again in a few moments');
      default:
        throw new Error(message || `Error ${status}`);
    }
  }
);

export const sendToAI = async (message) => {
  try {
    if (!message || message.trim().length === 0) {
      throw new Error('Message cannot be empty');
    }

    const response = await api.post('/ai/chat', {
      message: message.trim(),
      timestamp: new Date().toISOString()
    });

    if (!response.data.success) {
      throw new Error(response.data.error || 'AI service returned an error');
    }

    return response.data.response;
  } catch (error) {
    console.error('🤖 AI Service Error:', error);
    throw error;
  }
};

// Test connection function
export const testConnection = async () => {
  try {
    const response = await api.get('/health');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default api;