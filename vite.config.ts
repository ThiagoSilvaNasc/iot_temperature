import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/iot_temperature/', // ⚠️ CONFIRME O NOME DO REPOSITÓRIO!
  plugins: [react()],
});