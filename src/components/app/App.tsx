import { Component, lazy } from 'solid-js';

import { LocaleProvider } from '~/locale';
import { CounterProvider, RouterProvider } from '~/store';

import Navbar from '~/components/navbar';
import Sidebar from '~/components/sidebar';
import Drawer from '~/components/drawer';
import { CurrentRoute } from '~/components/routing';
import { BrowserNavigationApi, Router } from '~/router';

const Content: Component<{ drawerId: string }> = (props: {
    drawerId: string;
}) => {
    return (
        <div class="container mx-auto">
            <Navbar drawerId={props.drawerId} />
            <div class="container mx-auto px-4">
                <CurrentRoute
                    notFound={lazy(() => import('~/pages/not-found'))}
                />
            </div>
        </div>
    );
};

export const App: Component = () => {
    const drawerId = 'sidebar-drawer';

    const api = new BrowserNavigationApi();
    const router = new Router();

    return (
        <LocaleProvider defaultLang="en">
            <CounterProvider initialCounter={0}>
                <RouterProvider api={api} router={router}>
                    <Drawer
                        drawerId={drawerId}
                        children={<Content drawerId={drawerId} />}
                        sidebar={<Sidebar />}
                    />
                </RouterProvider>
            </CounterProvider>
        </LocaleProvider>
    );
};
