/* eslint-disable tailwindcss/classnames-order */
import { Show } from 'solid-js';
import { useApp, useUser } from '~/store';

import { useStore } from '@nanostores/solid';
import { i18n } from '~/stores/i18n';

export const messages = i18n('header/SignIn', {
    signIn: 'Sign In',
    signOut: 'Sign Out',
});

export function SignInButton() {
    const [_app, appStore] = useApp();
    const t = useStore(messages);
    return (
        <button
            class="btn btn-sm"
            data-testid="login-btn"
            onClick={() => appStore.showModal('Login')}
        >
            {t().signIn}
        </button>
    );
}

export function SignOutButton() {
    const [_userState, userStore] = useUser();
    const t = useStore(messages);
    return (
        <button
            class="btn btn-sm"
            data-testid="logout-btn"
            onClick={() => userStore.logout()}
        >
            {t().signOut}
        </button>
    );
}

export function LoginButton() {
    const [userState] = useUser();
    return (
        <Show when={userState.user} fallback={<SignInButton />}>
            <SignOutButton />
        </Show>
    );
}
