import { createStore, produce } from 'solid-js/store';
import { createContext, ParentProps, useContext } from 'solid-js';

import type { UserApi, User } from '~/api/user';

interface UserState {
    user?: User;
}

interface UserStore {
    login(): Promise<void>;
}

type UserModule = [UserState, UserStore];

const UserContext = createContext<UserModule>();

interface UserProviderProps {
    api: UserApi;
    user?: User;
}

function createUserStore(props: UserProviderProps): UserModule {
    const [state, setState] = createStore<UserState>({
        // eslint-disable-next-line solid/reactivity
        user: props.user,
    });

    const store: UserStore = {
        async login() {
            const user = await props.api.getById(33);
            setState(
                produce((s) => {
                    s.user = { ...user };
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

export const useUser = () => useContext(UserContext);
