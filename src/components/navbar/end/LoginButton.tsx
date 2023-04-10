/* eslint-disable tailwindcss/classnames-order */
import { Show } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { useApp, useUser } from '~/store';

export function SignInButton() {
    const [_app, appStore] = useApp();
    const [t] = useI18n();
    return (
        <button
            class="btn btn-sm"
            data-testid="login-btn"
            onClick={() => appStore.showModal('Login')}
        >
            {t('components.modals.login.signIn')}
        </button>
    );
}

export function SignOutButton() {
    const [_userState, userStore] = useUser();
    const [t] = useI18n();
    return (
        <button
            class="btn btn-sm"
            data-testid="logout-btn"
            onClick={() => userStore.logout()}
        >
            {t('components.modals.login.signOut')}
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
