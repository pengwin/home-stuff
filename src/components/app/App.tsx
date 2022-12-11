import { Component, lazy } from 'solid-js';

import { LocaleProvider } from '~/locale';
import {
    CounterProvider,
    RouterProvider,
    UserProvider,
    useUser,
} from '~/store';
import { BrowserNavigationApi, Router } from '~/router';
import { SwUserApi, User } from '~/api/user';

import Navbar from '~/components/navbar';
import Sidebar from '~/components/sidebar';
import Drawer from '~/components/drawer';
import { CurrentRoute } from '~/components/routing';
import RoutingHtmlTitle from '~/components/title';

const Content: Component<{ drawerId: string }> = (props: {
    drawerId: string;
}) => {
    const [user, userStore] = useUser();

    if (!user) {
        userStore.login();
    }

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

interface AppProps {
    user?: User;
}

export const App: Component<AppProps> = (props: AppProps) => {
    const drawerId = 'sidebar-drawer';

    const api = new BrowserNavigationApi();
    const router = new Router();

    return (
        <LocaleProvider defaultLang="en">
            <CounterProvider initialCounter={0}>
                <RouterProvider api={api} router={router}>
                    <UserProvider api={new SwUserApi()} user={props.user}>
                        <RoutingHtmlTitle />
                        <Drawer
                            drawerId={drawerId}
                            children={<Content drawerId={drawerId} />}
                            sidebar={<Sidebar />}
                        />
                    </UserProvider>
                </RouterProvider>
            </CounterProvider>
        </LocaleProvider>
    );
};
