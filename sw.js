// sw.js - Service Worker (create this file in your root directory)
const CACHE_NAME = 'bartalap-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/main.css',
  '/bundle.js',
  '/manifest.json',
  '/images/logo.png',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
  '/favicon.ico'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker: Install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Service Worker: Cache addAll failed:', error);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate event');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle background sync, push notifications, etc.
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync');
});

self.addEventListener('push', (event) => {
  console.log('Service Worker: Push event');
});

// Handle navigation requests
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html')
        .then((response) => {
          return response || fetch('/index.html');
        })
    );
  }
});