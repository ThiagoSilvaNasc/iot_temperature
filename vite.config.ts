import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', //  CONFIRME O NOME DO REPOSITÓRIO!
  plugins: [react()],
});