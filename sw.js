// sw.js
const CACHE_NAME = 'bartalap1-v1';
const ASSETS_TO_CACHE = [
    '.',
    './index.html',
    './css/styles.css',
    './js/app.js',
    './js/audioHandler.js',
    './js/translationService.js',
    './js/uiController.js',
    './images/icon-192x192.png',
    './images/icon-512x512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});