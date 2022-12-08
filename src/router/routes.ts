import { Route } from './Router';
import { lazy } from 'solid-js';

export const routes: Route[] = [
    {
        path: '/test/',
        metadata: {
            title: 'Test',
        },
        children: [
            {
                path: '/state',
                metadata: {
                    title: 'TestState',
                    component: lazy(() => import('~/pages/test/state')),
                },
            },
            {
                path: '/comp/:text',
                metadata: {
                    title: 'Comp',
                    component: lazy(() => import('~/pages/test/Сomp')),
                },
            },
        ],
    },
];
