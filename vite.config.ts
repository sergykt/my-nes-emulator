import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import UnpluginInjectPreload from 'unplugin-inject-preload/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { VitePWA } from 'vite-plugin-pwa';

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
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['index.html', 'favicon.ico', 'logo192.png', 'logo512.png'],
      manifest: {
        short_name: 'Nes Emulator',
        name: 'Nes Emulator',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
          {
            src: 'logo192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: 'logo512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
        start_url: '/',
        display: 'standalone',
        theme_color: '#16181e',
        background_color: '#16181e',
      },
      workbox: {
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /\.(?:html)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'html-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\/games\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'games-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(?:woff2|woff|ttf|otf)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'font-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 365 * 24 * 60 * 60,
              },
            },
          },
        ],
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
