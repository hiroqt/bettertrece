import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.md'],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    proxy: {
      '/dpwh-api': {
        target: 'https://api.transparency.dpwh.gov.ph',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/dpwh-api/, ''),
      },
    },
  },
});
