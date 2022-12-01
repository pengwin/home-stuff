import type { Component } from 'solid-js';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';
import { StoreonProvider } from '@storeon/solidjs';

import { locale } from './locale';
import { store } from './store';

import Comp from './Comp/Comp';
import StatefulComponent from './StatefulComponent/StatefulComponent';

const localeContext = createI18nContext(locale, 'en');

const App: Component = () => {
    return (
        <StoreonProvider store={store}>
            <I18nContext.Provider value={localeContext}>
                <div class="container mx-auto">
                    <h1>Hello world!!!!</h1>
                    <Comp text="test" />
                    <StatefulComponent />
                </div>
            </I18nContext.Provider>
        </StoreonProvider>
    );
};

export default App;
