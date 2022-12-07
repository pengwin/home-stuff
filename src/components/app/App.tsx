import type { Component } from 'solid-js';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';
import { StoreonProvider } from '@storeon/solidjs';

import { locale } from '~/locale';
import { store } from '~/store';

import Navbar from '~/components/navbar';
import Sidebar from '~/components/sidebar';
import Drawer from '~/components/drawer';

const localeContext = createI18nContext(locale, 'en');

const Content: Component<{ drawerId: string }> = (props: {
    drawerId: string;
}) => {
    return (
        <div class="container mx-auto">
            <Navbar drawerId={props.drawerId} />
            <div>Page Content</div>
        </div>
    );
};

export const App: Component = () => {
    const drawerId = 'sidebar-drawer';
    return (
        <StoreonProvider store={store}>
            <I18nContext.Provider value={localeContext}>
                <Drawer
                    drawerId={drawerId}
                    children={<Content drawerId={drawerId} />}
                    sidebar={<Sidebar />}
                />
            </I18nContext.Provider>
        </StoreonProvider>
    );
};
