import { createStore, produce } from 'solid-js/store';
import { createContext, createEffect, ParentProps, useContext } from 'solid-js';

import type { UserApi, Profile } from '~/api/user';
import { User, AuthApi } from '~/api/auth';

interface UserState {
    user?: User;
    profile?: Profile;
}

interface UserStore {
    login(username: string, password: string): Promise<boolean>;
}

type UserModule = [UserState, UserStore];

const UserContext = createContext<UserModule>();

interface UserProviderProps {
    userApi: UserApi;
    authApi: AuthApi;
}

function createUserStore(props: UserProviderProps): UserModule {
    const [state, setState] = createStore<UserState>({});

    createEffect(() => {
        const user = props.authApi.getAuthenticated();
        if (!user) {
            return;
        }

        setState(
            produce((s) => {
                s.user = { ...user };
            }),
        );
    });

    const store: UserStore = {
        async login(username: string, password: string) {
            const user = await props.authApi.login(username, password);
            if (!user) {
                return false;
            }
            setState(
                produce((s) => {
                    s.user = { ...user };
                }),
            );
            return true;
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

export const useUser = () => useContext(UserContext);
