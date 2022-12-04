import { lazy } from 'solid-js';
import { RouteDefinition, useRoutes } from '@solidjs/router';

const routes = [
    {
        path: '/',
        component: lazy(() => import('~/pages/index')),
    },
    {
        path: '/test',
        children: [
            {
                path: '/state',
                component: lazy(() => import('~/pages/test/StatefulComponent')),
            },
            {
                path: '/comp/:text',
                component: lazy(() => import('~/pages/test/Comp')),
            },
        ],
    },
    /*{
    path: '/users/:id',
    component: lazy(() => import('/pages/users/[id].js')),
    children: [
      { path: '/', component: lazy(() => import('/pages/users/[id]/index.js')) },
      { path: '/settings', component: lazy(() => import('/pages/users/[id]/settings.js')) },
      { path: '/*all', component: lazy(() => import('/pages/users/[id]/[...all].js')) }
    ]
  },
  {
    path: '/',
    component: lazy(() => import('/pages/index.js'))
  },
  {
    path: '/*all',
    component: lazy(() => import('/pages/[...all].js'))
  }*/
];

export function useRouter() {
    return useRoutes(routes as RouteDefinition[]);
}
