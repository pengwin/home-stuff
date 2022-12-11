import { createStore, produce } from 'solid-js/store';
import { createContext, ParentProps, useContext } from 'solid-js';

export type ModalType = 'Login';

type ModalsState = {
    [key in ModalType]: boolean;
};

interface AppState {
    modals: ModalsState;
}

interface AppStore {
    showModal(modal: ModalType);
    hideModal(modal: ModalType);
}

type AppModule = [AppState, AppStore];

const AppContext = createContext<AppModule>();

export function AppProvider(props: ParentProps) {
    const [state, setState] = createStore<AppState>({
        modals: {
            Login: false,
        },
    });
    const module: AppModule = [
        state,
        {
            showModal(modal: ModalType) {
                setState(
                    produce((s) => {
                        s.modals[modal] = true;
                    }),
                );
            },
            hideModal(modal: ModalType) {
                setState(
                    produce((s) => {
                        s.modals[modal] = false;
                    }),
                );
            },
        },
    ];

    return (
        <AppContext.Provider value={module}>
            {props.children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);
