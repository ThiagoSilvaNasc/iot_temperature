import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/bitbucket.org/electronics-projects-saframax/front_iot_temperature/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
      host:"0.0.0.0",
      port:5173
    },
});
