import { clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

clientsClaim();

registerRoute(
  ({ request }) => request.destination === 'document',
  new NetworkFirst({
    cacheName: 'html-cache',
    networkTimeoutSeconds: 3,
  })
);

registerRoute(
  ({ request }) =>
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'static-assets-cache',
  })
);

registerRoute(
  ({ url }) => url.pathname.startsWith('/games/'),
  new NetworkFirst({
    cacheName: 'games-cache',
    networkTimeoutSeconds: 5,
  })
);

registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'fonts-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

registerRoute(
  () => true,
  new StaleWhileRevalidate({
    cacheName: 'fallback-cache',
  })
);
