/// <reference lib="webworker" />

const cacheName = 'home-stuff-cache-v1';

const addResourcesToCache = async resources => {
    const cache = await caches.open(cacheName);
    await cache.addAll(resources);
};

self.addEventListener('install', event => {
    event.waitUntil(addResourcesToCache(['/', '/index.html']));
});

self.addEventListener('fetch', e => {
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);
            // eslint-disable-next-line no-console
            console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
            if (r) {
                return r;
            }
            const response = await fetch(e.request);
            const cache = await caches.open(cacheName);
            // eslint-disable-next-line no-console
            console.log(
                `[Service Worker] Caching new resource: ${e.request.url}`,
            );
            cache.put(e.request, response.clone());
            return response;
        })(),
    );
});
