import { describe, expect, test } from 'vitest';

import { Router, Route } from './Router';

describe('Router', () => {
    describe('should match', () => {
        describe('plain route', () => {
            test('without parameter', () => {
                const routes: Route[] = [
                    {
                        path: '/test/123/',
                        metadata: {
                            title: 'Test',
                        },
                    },
                ];
                const router = new Router(routes);
                const actual = router.match('/test/123');
                expect(actual).toMatchObject({
                    metadata: {
                        title: 'Test',
                    },
                });
            });

            test('with parameter', () => {
                const routes: Route[] = [
                    {
                        path: '/test/:id/:name/abc',
                        metadata: {
                            title: 'Test',
                        },
                    },
                ];
                const router = new Router(routes);
                const actual = router.match('/test/123/test/abc');
                expect(actual).toMatchObject({
                    metadata: {
                        title: 'Test',
                    },
                    params: {
                        id: '123',
                        name: 'test',
                    },
                });
            });
        });
        describe('nested route', () => {
            test('without parameter', () => {
                const routes: Route[] = [
                    {
                        path: '/test/',
                        metadata: {
                            title: 'Parent',
                        },
                        children: [
                            {
                                path: '/child/',
                                metadata: {
                                    title: 'Child',
                                },
                            },
                        ],
                    },
                ];
                const router = new Router(routes);
                const actual = router.match('/test/child');
                expect(actual).toMatchObject({
                    metadata: {
                        title: 'Child',
                    },
                });
            });

            test('with parameter', () => {
                const routes: Route[] = [
                    {
                        path: '/test/',
                        metadata: {
                            title: 'Parent',
                        },
                        children: [
                            {
                                path: ':id/child/',
                                metadata: {
                                    title: 'Child',
                                },
                            },
                        ],
                    },
                ];
                const router = new Router(routes);
                const actual = router.match('/test/abc/child');
                expect(actual).toMatchObject({
                    metadata: {
                        title: 'Child',
                    },
                    params: {
                        id: 'abc',
                    },
                });
            });

            test('with deep nesting', () => {
                const routes: Route[] = [
                    {
                        path: '/test/',
                        metadata: {
                            title: 'Parent',
                        },
                        children: [
                            {
                                path: '/child1/',
                                metadata: {
                                    title: 'Child1',
                                },
                                children: [
                                    {
                                        path: '/child2/',
                                        metadata: {
                                            title: 'Child2',
                                        },
                                        children: [
                                            {
                                                path: '/child3/',
                                                metadata: {
                                                    title: 'Child3',
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ];
                const router = new Router(routes);
                const actual = router.match('/test/child1/child2/child3');
                expect(actual).toMatchObject({
                    metadata: {
                        title: 'Child3',
                    },
                });
            });
        });
    });
});
