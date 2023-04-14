/* eslint-disable tailwindcss/classnames-order */
import { Modal } from '../Modal';

import { Form } from '~/components/forms';
import TextField from '~/components/forms/controls/text-field';
import { useApp, useUser, useApiError } from '~/store';
import { createMemo, createSignal, Show } from 'solid-js';

import { useStore } from '@nanostores/solid';
import { i18n } from '~/stores/i18n';

export const messages = i18n('modals/Login', {
    signIn: 'Sign In',
});

function Alert(props: { text: string }) {
    return (
        <div class="alert alert-error shadow-lg">
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>{props.text}</span>
            </div>
        </div>
    );
}

function ErrorAlert(props: { errorText: string; hasError: boolean }) {
    const errorText = createMemo(() => props.errorText || '');
    return (
        <Show when={props.hasError}>
            <Alert text={errorText()} />
        </Show>
    );
}

export function Login() {
    const t = useStore(messages);
    const [_user, userStore] = useUser();
    const [_app, appStore] = useApp();
    const [apiError, apiErrorState] = useApiError();

    const [loading, setLoading] = createSignal(false);

    const onSubmit = async res => {
        setLoading(true);
        try {
            const error = await userStore.login(res.username, res.password);
            if (!error) {
                appStore.hideModal('Login');
            } else {
                console.error(error);
                apiErrorState.set(
                    `Login failed: ${error.type}, ${error.message} ${error.stack}}`,
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const hasApiError = () => !!apiError.errorText;
    const apiErrorText = () => apiError.errorText || '';

    return (
        <Modal
            modal="Login"
            title={t().signIn}
            dialogRole
        >
            <Form
                class="grid grid-flow-row-dense place-content-center"
                onSubmit={onSubmit}
            >
                {ctx => (
                    <>
                        <ErrorAlert hasError={ctx.formError()} errorText="" />
                        <ErrorAlert
                            hasError={hasApiError()}
                            errorText={apiErrorText()}
                        />
                        <TextField
                            name="username"
                            label="Username"
                            placeholder="Your username"
                            required
                            context={ctx}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            placeholder="Your password"
                            password
                            required
                            context={ctx}
                        />
                        <button
                            disabled={loading()}
                            class="btn btn-primary btn-md"
                        >
                            {t().signIn}
                        </button>
                    </>
                )}
            </Form>
        </Modal>
    );
}
