const CACHE_NAME = 'rady-healing-v3';
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/IMG-20250801-WA0004 (3).jpeg',
  '/IMG-20250801-WA0004 (3) (2).jpeg'
];

// تثبيت ملفات التطبيق في ذاكرة الهاتف
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// استدعاء الملفات من الذاكرة عند عدم وجود إنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
