import type { Component } from 'solid-js';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';

import { locale } from '~/locale';
import { CounterProvider } from '~/store';

import Navbar from '~/components/navbar';
import Sidebar from '~/components/sidebar';
import Drawer from '~/components/drawer';
import { Comp } from '~/pages/test/Comp/Comp';

const localeContext = createI18nContext(locale, 'en');

const Content: Component<{ drawerId: string }> = (props: {
    drawerId: string;
}) => {
    return (
        <div class="container mx-auto">
            <Navbar drawerId={props.drawerId} />
            <Comp text={'test'} />
        </div>
    );
};

export const App: Component = () => {
    const drawerId = 'sidebar-drawer';
    return (
        <CounterProvider initialCounter={0}>
            <I18nContext.Provider value={localeContext}>
                <Drawer
                    drawerId={drawerId}
                    children={<Content drawerId={drawerId} />}
                    sidebar={<Sidebar />}
                />
            </I18nContext.Provider>
        </CounterProvider>
    );
};
