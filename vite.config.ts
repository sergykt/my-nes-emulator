import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
// import legacy from '@vitejs/plugin-legacy';
import path from 'path';
import UnpluginInjectPreload from 'unplugin-inject-preload/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import autoprefixer from 'autoprefixer';
import browserslistToEsbuild from 'browserslist-to-esbuild';

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
    splitVendorChunkPlugin(),
    ViteImageOptimizer({
      includePublic: true,
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: true,
      },
    }),
    // legacy({
    //   targets: ['defaults', 'not IE 11'],
    // }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]-[local]-[hash:base64:4]',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@components': path.resolve(__dirname, '/src/components'),
      '@pages': path.resolve(__dirname, '/src/pages'),
      '@store': path.resolve(__dirname, '/src/store'),
      '@services': path.resolve(__dirname, '/src/services'),
      '@resources': path.resolve(__dirname, '/src/resources'),
    },
  },
  build: {
    target: browserslistToEsbuild(),
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (
            id.includes('react-device-detect') ||
            id.includes('react-router-dom') ||
            id.includes('react-icons') ||
            id.includes('react-redux') ||
            id.includes('redux') ||
            id.includes('@reduxjs/toolkit')
          ) {
            return '@react-tools';
          }
          if (id.includes('jsnes')) {
            return '@jsnes';
          }
          if (id.includes('axios')) {
            return '@axios';
          }
          if (id.includes('swiper')) {
            return '@swiper';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});
