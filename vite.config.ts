import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import UnpluginInjectPreload from 'unplugin-inject-preload/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnpluginInjectPreload({
      files: [
        {
          outputMatch: /Nes-font-[a-zA-Z-0-9]*\.otf$/,
          attributes: {
            type: 'font/otf',
            as: 'font',
            crossorigin: 'anonymous',
          },
        },
      ],
      injectTo: 'head-prepend',
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '/src'),
      '@components': path.resolve(__dirname, '/src/components'),
      '@pages': path.resolve(__dirname, '/src/pages'),
      '@store': path.resolve(__dirname, '/src/store'),
      '@services': path.resolve(__dirname, '/src/services'),
      '@resources': path.resolve(__dirname, '/src/resources'),
    },
  },
  server: {
    port: 3000,
  },
});
