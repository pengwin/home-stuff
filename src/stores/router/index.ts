import { computed } from 'nanostores';
import { createRouter } from '@nanostores/router';
import { Component, lazy } from 'solid-js';
import { useStore } from '@nanostores/solid';

export interface RouteMetadata {
    title: string;
    component?: Component;
}
const metadata: Record<string, RouteMetadata> = {
    home: {
        title: 'Home',
        component: lazy(() => import('~/pages/index')),
    },
    testState: {
        title: 'Test',
        component: lazy(() => import('~/pages/test/state')),
    },
    testComp: {
        title: 'Test',
        component: lazy(() => import('~/pages/test/Сomp')),
    },
};

const router = createRouter(
    {
        home: '/',
        testState: '/test/state',
        testComp: '/test/comp/:text',
    } as const,
    { links: false },
);

const routerMetadata = computed(router, currentRoute => {
    const route = currentRoute?.route;
    if (!route) return;
    return metadata[route];
});

export function open(path: string) {
    router.open(path);
}

export function useRouter() {
    return useStore(router);
}

export function useRouterMetadata() {
    return useStore(routerMetadata);
}
