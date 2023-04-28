/// <reference lib="webworker" />

const defaultCacheName = 'home-stuff-cache-v1';

interface Logger {
    info: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
}

class NoOpLogger implements Logger {
    public info(..._args: unknown[]) {
        // do nothing
    }

    public error(..._args: unknown[]) {
        // do nothing
    }
}

class AppServiceWorker {
    constructor(
        private readonly useCache: boolean,
        private readonly cacheName,
        private readonly logger: Logger,
    ) {}

    public setup(sw: ServiceWorkerGlobalScope) {
        if (import.meta.env.DEV) {
            return;
        }
        sw.addEventListener('install', e => this.install(e));
        sw.addEventListener('fetch', this.fetch.bind(this));
    }

    public async install(event: ExtendableEvent) {
        if (!this.useCache) {
            return;
        }
        event.waitUntil(this.addResourcesToCache(['/', '/index.html']));
    }

    public async fetch(event: FetchEvent) {
        if (!this.useCache) {
            return;
        }
        event.respondWith(
            (async () => {
                const r = await caches.match(event.request);
                // eslint-disable-next-line no-console
                this.logger.info(
                    `[Service Worker] Fetching resource: ${event.request.url}`,
                );
                if (r) {
                    return r;
                }
                const response = await fetch(event.request);
                const cache = await caches.open(this.cacheName);
                cache.put(event.request, response.clone());
                this.logger.info(
                    `[Service Worker] Caching new resource: ${event.request.url}`,
                );
                return response;
            })(),
        );
    }

    private async addResourcesToCache(resources: string[]) {
        const cache = await caches.open(this.cacheName);
        await cache.addAll(resources);
    }
}

const instance = new AppServiceWorker(
    false,
    defaultCacheName,
    new NoOpLogger(),
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
instance.setup(self as any as ServiceWorkerGlobalScope);
