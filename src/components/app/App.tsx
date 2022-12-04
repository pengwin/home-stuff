import type { Component } from 'solid-js';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';
import { StoreonProvider } from '@storeon/solidjs';
import { Router } from '@solidjs/router';

import { locale } from '~/locale';
import { store } from '~/store';

import { useRouter } from '~/components/router';

const localeContext = createI18nContext(locale, 'en');

export const App: Component = () => {
    const Routes = useRouter();
    return (
        <StoreonProvider store={store}>
            <Router>
                <I18nContext.Provider value={localeContext}>
                    <div class="container mx-auto">
                        <Routes />
                    </div>
                </I18nContext.Provider>
            </Router>
        </StoreonProvider>
    );
};
