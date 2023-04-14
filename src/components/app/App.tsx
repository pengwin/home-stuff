import { Component, lazy } from 'solid-js';

import { StoreProvider, StoreDependencies } from '~/store';

import Navbar from '~/components/navbar';
import Sidebar from '~/components/sidebar';
import Drawer from '~/components/drawer';
import { CurrentRoute } from '~/components/routing';
import RoutingHtmlTitle from '~/components/title';
import { LazyModals } from '../modals';

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

interface AppProps {
    dependencies: StoreDependencies;
}

export const App: Component<AppProps> = (props: AppProps) => {
    const drawerId = 'sidebar-drawer';

    return (
        <StoreProvider dependencies={props.dependencies}>
                <RoutingHtmlTitle />
                <Drawer
                    drawerId={drawerId}
                    children={<Content drawerId={drawerId} />}
                    sidebar={<Sidebar />}
                />
                <LazyModals />
        </StoreProvider>
    );
};
