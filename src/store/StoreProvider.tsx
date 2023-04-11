import { ParentProps } from 'solid-js';
import { AuthApi } from '~/api/auth';
import {
    ApiErrorProvider,
    AppProvider,
    CounterProvider,
    UserProvider,
} from '.';
import { ApiMiddleware } from '~/api/api-middleware';

export interface StoreDependencies {
    authAPI: AuthApi;
    apiMiddleware: ApiMiddleware;
}

interface StoreProviderProps {
    dependencies: StoreDependencies;
}

export function StoreProvider(props: ParentProps<StoreProviderProps>) {
    return (
        <AppProvider>
            <ApiErrorProvider apiMiddleware={props.dependencies.apiMiddleware}>
                <CounterProvider initialCounter={0}>
                    <UserProvider authApi={props.dependencies.authAPI}>
                        {props.children}
                    </UserProvider>
                </CounterProvider>
            </ApiErrorProvider>
        </AppProvider>
    );
}
