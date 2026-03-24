const CACHE_NAME = 'rady-herbs-v1';
const assets = [
  '/',
  '/index.html',
  // أضف هنا مسارات أي ملفات CSS أو صور تستخدمها
];

// تثبيت الـ Service Worker وتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// تفعيل العمل بدون إنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
