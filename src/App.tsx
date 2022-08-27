import type { Component } from 'solid-js';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';

import Comp from './Comp/Comp';
import { locale } from './locale';

const value = createI18nContext(locale, 'en');

const App: Component = () => {
    return (
        <I18nContext.Provider value={value}>
            <div class="container mx-auto">
                <h1>Hello world!!!!</h1>
                <Comp text="test" />
            </div>
        </I18nContext.Provider>
    );
};

export default App;
