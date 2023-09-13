import { Component } from 'solid-js';
import { routes as defaultRoutes } from './routes';

export interface RouteMetadata {
    readonly title: string;
    readonly component?: Component;
    readonly hideInMenu?: boolean;
}

export interface Route {
    readonly path: string;
    readonly metadata: RouteMetadata;
    readonly children?: ReadonlyArray<Route>;
}

interface RouteMatch {
    normalizedPath: string;
    metadata: RouteMetadata;
    params?: {
        [key: string]: string;
    };
}

class PathMatcher {
    constructor(
        private readonly reg: RegExp,
        private readonly metadata: RouteMetadata,
    ) {}

    match(path: string): RouteMatch | undefined {
        path = normalizePath(path);
        const match = this.reg.exec(path);

        if (!match) {
            return;
        }

        return {
            normalizedPath: path,
            metadata: this.metadata,
            params: match.groups,
        };
    }
}

export class Router {
    private readonly matchers: PathMatcher[];

    constructor(routes?: ReadonlyArray<Route>) {
        routes = routes || defaultRoutes;
        this.matchers = routes.reduce<PathMatcher[]>(
            (a, r) => a.concat(this.resolveMatchers(r)),
            [],
        );
    }

    match(path: string): RouteMatch | undefined {
        for (const m of this.matchers) {
            const match = m.match(path);
            if (match) {
                return match;
            }
        }
    }

    private resolveMatchers(route: Route, parentPath?: string): PathMatcher[] {
        const path = (parentPath || '') + normalizePath(route.path);
        if (!route.children) {
            return [this.resolveMatcher(path, route.metadata)];
        }

        return route.children.reduce<PathMatcher[]>(
            (a, r) => a.concat(this.resolveMatchers(r, path)),
            [],
        );
    }

    private resolveMatcher(path: string, metadata: RouteMetadata): PathMatcher {
        path =
            '^' +
            path
                .split('/')
                .filter(s => s?.length > 0)
                .map(s => (s.startsWith(':') ? `(?<${s.substring(1)}>.+)` : s))
                .join('\\/') +
            '\\/$';

        return new PathMatcher(new RegExp(path), metadata);
    }
}

export function normalizePath(path: string) {
    return (
        path
            .split('/')
            .filter(s => s?.length > 0)
            .join('/') + '/'
    );
}
