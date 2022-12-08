import { createStore, produce } from 'solid-js/store';
import { createContext, createEffect, ParentProps, useContext } from 'solid-js';

import {
    NavigateOptions,
    NavigationApi,
    RouteMetadata,
    Router,
} from '~/router';

interface RouterState {
    currentRoute?: RouteMetadata;
    params?: {
        [key: string]: string;
    };
}

interface RouterStore {
    navigate(path: string, options?: NavigateOptions): void;
}

type RouterModule = [RouterState, RouterStore];

const RouterContext = createContext<RouterModule>();

interface RouterProviderProps {
    router: Router;
    api: NavigationApi;
}

function createRouterStore(props: RouterProviderProps): RouterModule {
    const routeMatch = matchRoute();

    const [state, setState] = createStore<RouterState>({
        currentRoute: routeMatch?.metadata,
        params: routeMatch?.params,
    });

    const store: RouterStore = {
        navigate(path: string, options?: NavigateOptions) {
            props.api.navigate(path, options);
            updateState();
        },
    };

    createEffect(() => {
        props.api.subscribe(() => updateState());
    });

    return [state, store];

    function matchRoute() {
        const location = props.api.location;
        const r = props.router.match(location.path);
        return r;
    }

    function updateState() {
        const routeMatch = matchRoute();
        setState(
            produce((s) => {
                s.currentRoute = routeMatch?.metadata;
                s.params = routeMatch?.params;
            }),
        );
        setState('params', () => routeMatch?.params);
    }
}

export function RouterProvider(props: ParentProps<RouterProviderProps>) {
    const module = createRouterStore(props);
    return (
        <RouterContext.Provider value={module}>
            {props.children}
        </RouterContext.Provider>
    );
}

export const useRouter = () => useContext(RouterContext);
