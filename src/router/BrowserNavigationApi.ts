export interface NavigateOptions {
    replace?: boolean;
    state?: unknown;
}

export interface Location {
    path: string;
    search: string;
}

export interface NavigationApi {
    navigate(path: string, options?: NavigateOptions): void;
    subscribe(listener: (state: unknown) => void);
    get location(): Location;
}

export class BrowserNavigationApi implements NavigationApi {
    navigate(path: string, options?: NavigateOptions): void {
        if (options?.replace) {
            window.history.replaceState({}, '', path);
            return;
        }
        window.history.pushState({}, '', path);
    }

    subscribe(listener: (state: unknown) => void) {
        window.addEventListener('popstate', (e) => {
            listener(e.state);
        });
    }

    get location(): Location {
        const loc = window.location;
        return {
            path: loc.pathname,
            search: loc.search,
        };
    }
}
