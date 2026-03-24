const CACHE_NAME = 'rady-cache-v2';
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/IMG-20250801-WA0004 (3).jpeg',
  '/IMG-20250801-WA0004 (3) (2).jpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
