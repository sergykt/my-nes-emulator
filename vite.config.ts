import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import UnpluginInjectPreload from 'unplugin-inject-preload/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import browserslistToEsbuild from 'browserslist-to-esbuild';

export default defineConfig({
  plugins: [
    react(),
    UnpluginInjectPreload({
      files: [
        {
          outputMatch: /PressStart2P-Regular-[a-zA-Z-0-9]*\.woff$/,
          attributes: {
            type: 'font/woff',
            as: 'font',
            crossorigin: 'anonymous',
          },
        },
        {
          outputMatch: /PressStart2P-Regular-[a-zA-Z-0-9]*\.woff2$/,
          attributes: {
            type: 'font/woff2',
            as: 'font',
            crossorigin: 'anonymous',
          },
        },
      ],
      injectTo: 'head-prepend',
    }),
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
  ],
  css: {
    postcss: {
      plugins: [autoprefixer(), postcssPresetEnv()],
    },
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]-[local]-[hash:base64:4]',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  build: {
    target: browserslistToEsbuild(),
    minify: 'terser',
  },
  server: {
    port: 3000,
  },
});
