import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ['..'] // Allow serving files from one level up to include node_modules
    }
  }
});
