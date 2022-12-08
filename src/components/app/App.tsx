import { Component, lazy } from 'solid-js';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';

import { locale } from '~/locale';
import { CounterProvider, RouterProvider } from '~/store';

import Navbar from '~/components/navbar';
import Sidebar from '~/components/sidebar';
import Drawer from '~/components/drawer';
import { CurrentRoute } from '~/components/routing';
import { BrowserNavigationApi, Router } from '~/router';

const localeContext = createI18nContext(locale, 'en');

const Content: Component<{ drawerId: string }> = (props: {
    drawerId: string;
}) => {
    return (
        <div class="container mx-auto">
            <Navbar drawerId={props.drawerId} />
            <CurrentRoute notFound={lazy(() => import('~/pages/not-found'))} />
        </div>
    );
};

export const App: Component = () => {
    const drawerId = 'sidebar-drawer';

    const api = new BrowserNavigationApi();
    const router = new Router();

    return (
        <CounterProvider initialCounter={0}>
            <RouterProvider api={api} router={router}>
                <I18nContext.Provider value={localeContext}>
                    <Drawer
                        drawerId={drawerId}
                        children={<Content drawerId={drawerId} />}
                        sidebar={<Sidebar />}
                    />
                </I18nContext.Provider>
            </RouterProvider>
        </CounterProvider>
    );
};
