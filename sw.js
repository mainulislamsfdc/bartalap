// sw.js
const CACHE_NAME = 'bartalap1-v1';
const REPOSITORY_NAME = 'bartalap'; // Match your repository name

const ASSETS_TO_CACHE = [
    `/${REPOSITORY_NAME}/`,
    `/${REPOSITORY_NAME}/index.html`,
    `/${REPOSITORY_NAME}/css/styles.css`,
    `/${REPOSITORY_NAME}/bundle.js`,
    `/${REPOSITORY_NAME}/images/icon-192x192.png`,
    `/${REPOSITORY_NAME}/images/icon-512x512.png`
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
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then((response) => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    });
            })
    );
});