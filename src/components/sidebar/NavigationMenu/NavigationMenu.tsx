import { useI18n } from '~/locale';

import { MenuItem } from './MenuItem';

import { routes } from '~/router/routes';
import { Route } from '~/router';
import { For, Show, createMemo } from 'solid-js';

function RenderRoute(props: { route: Route }) {
    const hasNoChildren = createMemo(
        () => (props.route.children?.length || 0) <= 0,
    );
    return (
        <Show
            when={hasNoChildren}
            fallback={<RoutesList routes={props.route.children!} />}
        >
            <Show when={!props.route.metadata.hideInMenu}>
                <MenuItem
                    href={props.route.path}
                    text={props.route.metadata.title}
                />
            </Show>
        </Show>
    );
}

function RoutesList(props: { routes: ReadonlyArray<Route> }) {
    return (
        <For each={props.routes}>{item => <RenderRoute route={item} />}</For>
    );
}

export function NavigationMenu() {
    const [t] = useI18n();

    return (
        <>
            <li class="menu-title">
                <span>{t.components.sidebar.navigation()}</span>
            </li>
            <RoutesList routes={routes} />
            <MenuItem href="/test/comp/111" text="Test.Comp 111" />
            <MenuItem href="/test/comp/abc" text="Test.Comp abc" />
            <MenuItem href="/test/comp/test" text="Test.Comp Test" />
        </>
    );
}
