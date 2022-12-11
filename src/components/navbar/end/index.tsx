/* eslint-disable tailwindcss/classnames-order */
import { useI18n } from '@solid-primitives/i18n';
import { useApp } from '~/store';
import { LangMenu } from './LangMenu';

export default function NavbarEnd() {
    const [_, appStore] = useApp();
    const [t] = useI18n();
    return (
        <div class="navbar-end">
            <button
                class="btn btn-sm"
                onClick={() => appStore.showModal('Login')}
            >
                {t('components.modals.login.signIn')}
            </button>
            <LangMenu />
        </div>
    );
}
