import { createEffect, createSignal, lazy, Show } from 'solid-js';
import { useApp } from '~/store';

const Login = lazy(() => import('./login'));

export function LazyModals() {
    const [app] = useApp();

    const [loginTriggered, triggerLogin] = createSignal(false);

    createEffect(() => {
        if (app.modals.Login) {
            triggerLogin(true);
        }
    });

    return (
        <>
            <Show when={loginTriggered()}>
                <Login />
            </Show>
        </>
    );
}
