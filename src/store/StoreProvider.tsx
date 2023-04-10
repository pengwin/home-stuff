import { ParentProps } from 'solid-js';
import { AuthApi } from '~/api/auth';
import { NavigationApi, Router } from '~/router';
import {
    ApiErrorProvider,
    AppProvider,
    CounterProvider,
    RouterProvider,
    UserProvider,
} from '.';
import { ApiMiddleware } from '~/api/api-middleware';

export interface StoreDependencies {
    authAPI: AuthApi;
    navigationApi: NavigationApi;
    apiMiddleware: ApiMiddleware;
}

interface StoreProviderProps {
    dependencies: StoreDependencies;
    router: Router;
}

export function StoreProvider(props: ParentProps<StoreProviderProps>) {
    return (
        <AppProvider>
            <ApiErrorProvider apiMiddleware={props.dependencies.apiMiddleware}>
                <CounterProvider initialCounter={0}>
                    <RouterProvider
                        api={props.dependencies.navigationApi}
                        router={props.router}
                    >
                        <UserProvider authApi={props.dependencies.authAPI}>
                            {props.children}
                        </UserProvider>
                    </RouterProvider>
                </CounterProvider>
            </ApiErrorProvider>
        </AppProvider>
    );
}
