import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
  server: {
    port: 3000,
  },
});
