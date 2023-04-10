import { createStore, produce } from 'solid-js/store';
import {
    createContext,
    createResource,
    createEffect,
    ParentProps,
    useContext,
} from 'solid-js';

import { User, AuthApi } from '~/api/auth';
import { AuthApiError } from '~/api/auth/auth';

interface UserState {
    user?: User;
}

interface UserStore {
    login(
        username: string,
        password: string,
    ): Promise<AuthApiError | undefined>;
    logout();
}

type UserModule = [UserState, UserStore];

const UserContext = createContext<UserModule>();

interface UserProviderProps {
    authApi: AuthApi;
}

function createUserStore(props: UserProviderProps): UserModule {
    const [state, setState] = createStore<UserState>({});

    createEffect(() => {
        const [user] = createResource(() => props.authApi.getAuthenticated());

        createEffect(() => {
            const fetchedUser = user();
            if (fetchedUser instanceof AuthApiError) {
                return;
            }

            if (!fetchedUser) {
                return;
            }

            setState(
                produce(s => {
                    s.user = { ...fetchedUser };
                }),
            );
        });
    });

    const store: UserStore = {
        async login(username: string, password: string) {
            const user = await props.authApi.login(username, password);
            if (user instanceof AuthApiError) {
                return user;
            }
            setState(
                produce(s => {
                    s.user = { ...user };
                }),
            );
            return;
        },
        logout() {
            props.authApi.removeAuthenticated();
            setState(
                produce(s => {
                    s.user = undefined;
                }),
            );
        },
    };

    return [state, store];
}

export function UserProvider(props: ParentProps<UserProviderProps>) {
    const module = createUserStore(props);
    return (
        <UserContext.Provider value={module}>
            {props.children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const userModule = useContext(UserContext);
    if (!userModule) {
        throw new Error('UserModule is not defined');
    }
    return userModule;
}
