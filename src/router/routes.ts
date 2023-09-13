import { Route } from './Router';
import { lazy } from 'solid-js';

export const routes: ReadonlyArray<Route> = [
    {
        path: '/',
        metadata: {
            title: 'Home',
            component: lazy(() => import('~/pages/index')),
            hideInMenu: true,
        },
    },
    {
        path: '/test/',
        metadata: {
            title: 'Test',
            hideInMenu: true,
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
                    hideInMenu: true,
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
    {
        path: '/wordplay/cases',
        metadata: {
            title: 'Wordplay.Cases',
            component: lazy(() => import('~/pages/wordplay/cases/Cases')),
        },
    },
];
