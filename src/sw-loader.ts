/* eslint-disable no-console */
import workerUrl from './service-worker/sw?worker&url';

export const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(
                workerUrl,
                {
                    scope: '/',
                },
            );
            if (registration.installing) {
                console.info('Service worker installing');
            } else if (registration.waiting) {
                console.info('Service worker installed');
            } else if (registration.active) {
                console.info('Service worker active');
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};
