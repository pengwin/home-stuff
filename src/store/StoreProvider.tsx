import { ParentProps } from 'solid-js';
import { AuthApi } from '~/api/auth';
import { UserApi } from '~/api/user';
import { NavigationApi, Router } from '~/router';
import { AppProvider, CounterProvider, RouterProvider, UserProvider } from '.';

export interface StoreDependencies {
    userAPI: UserApi;
    authAPI: AuthApi;
    navigationApi: NavigationApi;
}

interface StoreProviderProps {
    dependencies: StoreDependencies;
    router: Router;
}

export function StoreProvider(props: ParentProps<StoreProviderProps>) {
    return (
        <AppProvider>
            <CounterProvider initialCounter={0}>
                <RouterProvider
                    api={props.dependencies.navigationApi}
                    router={props.router}
                >
                    <UserProvider
                        userApi={props.dependencies.userAPI}
                        authApi={props.dependencies.authAPI}
                    >
                        {props.children}
                    </UserProvider>
                </RouterProvider>
            </CounterProvider>
        </AppProvider>
    );
}
