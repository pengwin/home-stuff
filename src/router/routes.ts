import { Route } from './Router';
import { lazy } from 'solid-js';

export const routes: Route[] = [
    {
        path: '/',
        metadata: {
            title: 'Home',
            component: lazy(() => import('~/pages/index')),
        },
    },
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
                path: '/table-perf',
                metadata: {
                    title: 'TablePerf',
                    component: lazy(() => import('~/pages/test/table-perf')),
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
    {
        path: '/calories/calculator',
        metadata: {
            title: 'Calories.Calculator',
            component: lazy(
                () => import('~/pages/calories/CaloriesCalculator'),
            ),
        },
    },
];
