// src/services/ai.js
import axios from 'axios';

// Setup the axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// AI Chat API function
export const sendToAI = async (message) => {
  try {
    const response = await api.post('/ai/chat', { message });
    return response.data.response;
  } catch (error) {
    console.error("🛑 AI request failed:", error);

    // ✅ Improved error handling
    if (error.response) {
      console.error("📡 Response data:", error.response.data);
      throw new Error(error.response.data.error || 'Failed to get AI response');
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error('Network error');
    }
  }
};

export default api;
