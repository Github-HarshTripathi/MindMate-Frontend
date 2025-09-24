// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false, // ✅ Disable overlay for better dev experience
    },
    proxy: {
      // ✅ API Proxy to avoid CORS issues
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  optimizeDeps: {
    include: ['@emoji-mart/react', '@emoji-mart/data'] // ✅ Ensures smooth emoji picker usage
  }
});
