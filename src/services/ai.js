// src/services/ai.js
import axios from 'axios';

// Production और Development URLs
const BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://your-backend-url.vercel.app/api'
    : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making API request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response received');
    return response;
  },
  (error) => {
    console.error('❌ API Response error:', error);
    
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
    console.log('📨 Sending message to AI:', message.substring(0, 50) + '...');
    
    const response = await api.post('/ai/chat', { 
      message,
      timestamp: new Date().toISOString()
    });
    
    console.log('🤖 AI Response received');
    return response.data.response;
    
  } catch (error) {
    console.error('🛑 AI request failed:', error);
    throw error;
  }
};

export default api;