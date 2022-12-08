import { Component, createMemo } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';

import { locale } from '~/locale';
import { CounterProvider, RouterProvider, useRouter } from '~/store';

import Navbar from '~/components/navbar';
import Sidebar from '~/components/sidebar';
import Drawer from '~/components/drawer';
import { BrowserNavigationApi, Router } from '~/router';

const localeContext = createI18nContext(locale, 'en');

const NotFound: Component = () => <div>Not Found</div>;

const Page: Component = () => {
    const [route] = useRouter();
    const current = createMemo(
        () => route?.currentRoute?.component || NotFound,
    );
    return <Dynamic component={current()} />;
};

const Content: Component<{ drawerId: string }> = (props: {
    drawerId: string;
}) => {
    return (
        <div class="container mx-auto">
            <Navbar drawerId={props.drawerId} />
            <Page />
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
