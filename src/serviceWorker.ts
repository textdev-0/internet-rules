// Service worker for faster subsequent loads
const CACHE_NAME = 'internet-rules-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/main/rules.html',
  '/main/laws.html',
  '/css/styles.css',
  '/dist/darkMode.js',
  '/assets/icons/favicon.png',
  '/assets/icons/cool.png',
  '/assets/icons/moon.png'
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
}); 