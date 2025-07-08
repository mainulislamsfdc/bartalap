// sw.js
const CACHE_NAME = 'bartalap-v1.0.2'; // Increment version when you make changes

// For localhost development
const isLocalhost = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';

const ASSETS_TO_CACHE = isLocalhost ? [
    // Localhost paths
    '/',
    '/index.html',
    '/css/main.css',
    '/bundle.js',
    '/images/icon-192x192.png',
    '/images/icon-512x512.png',
    '/images/logo.png',
    '/manifest.json',
    '/favicon.ico'
] : [
    // GitHub Pages paths
    '/bartalap/',
    '/bartalap/index.html',
    '/bartalap/css/main.css',
    '/bartalap/bundle.js',
    '/bartalap/images/icon-192x192.png',
    '/bartalap/images/icon-512x512.png',
    '/bartalap/images/logo.png',
    '/bartalap/manifest.json',
    '/bartalap/favicon.ico'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching app shell');
                return cache.addAll(ASSETS_TO_CACHE).catch(error => {
                    console.warn('Some assets failed to cache:', error);
                    // Don't fail the installation if some assets can't be cached
                    return Promise.resolve();
                });
            })
            .then(() => {
                console.log('Service Worker installed successfully');
                // Force activation of new service worker
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker activated successfully');
            // Take control of all pages immediately
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // If we have a cached response, use it
                if (cachedResponse) {
                    console.log('Serving from cache:', event.request.url);
                    return cachedResponse;
                }

                console.log('Fetching from network:', event.request.url);
                
                // Otherwise, fetch from network
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Check if we received a valid response
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        // Clone the response for caching
                        const responseToCache = networkResponse.clone();

                        // Cache the response for future use
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('Fetch failed:', error);
                        
                        // You could return a fallback page here
                        if (event.request.destination === 'document') {
                            return caches.match(isLocalhost ? '/index.html' : '/bartalap/index.html');
                        }
                        
                        throw error;
                    });
            })
    );
});

// Handle background sync (optional)
self.addEventListener('sync', (event) => {
    console.log('Background sync event:', event.tag);
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Perform background sync tasks here
            console.log('Performing background sync...')
        );
    }
});

// Handle push notifications (optional)
self.addEventListener('push', (event) => {
    console.log('Push event received');
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: isLocalhost ? '/images/icon-192x192.png' : '/bartalap/images/icon-192x192.png',
            badge: isLocalhost ? '/images/icon-192x192.png' : '/bartalap/images/icon-192x192.png',
            vibrate: [100, 50, 100],
            data: data.data
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked');
    event.notification.close();

    event.waitUntil(
        clients.openWindow(isLocalhost ? '/' : '/bartalap/')
    );
});