import { createStore } from 'solid-js/store';
import { createContext, ParentProps, useContext } from 'solid-js';
import { ApiMiddleware } from '~/api/api-middleware';

interface ApiErrorState {
    errorText?: string;
}

interface ApiErrorStore {
    set(error: string): void;
    reset(): void;
}

type ApiErrorModule = [ApiErrorState, ApiErrorStore];

const ApiErrorContext = createContext<ApiErrorModule>();

interface ApiErrorProviderProps {
    apiMiddleware: ApiMiddleware;
}

export function ApiErrorProvider(props: ParentProps<ApiErrorProviderProps>) {
    const [state, setState] = createStore<ApiErrorState>({
        errorText: undefined,
    });

    // eslint-disable-next-line solid/reactivity
    props.apiMiddleware.subscribe(errorContext => {
        if (!errorContext) {
            return;
        }
        setState('errorText', () => '' + errorContext.error);
    });

    const counter: ApiErrorModule = [
        state,
        {
            set(error: string) {
                setState('errorText', () => error);
            },
            reset() {
                setState('errorText', () => undefined);
            },
        },
    ];

    return (
        <ApiErrorContext.Provider value={counter}>
            {props.children}
        </ApiErrorContext.Provider>
    );
}

export function useApiError() {
    const apiErrorModule = useContext(ApiErrorContext);
    if (!apiErrorModule) {
        throw new Error('ApiErrorModule is not defined');
    }
    return apiErrorModule;
}
