import { Component, createMemo } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useRouterMetadata } from '~/stores/router';

interface CurrentRouteProps {
    notFound: Component;
}

export const CurrentRoute: Component<CurrentRouteProps> = (
    props: CurrentRouteProps,
) => {
    const routerMetadata = useRouterMetadata();
    const current = createMemo(() => {
        return routerMetadata()?.component || props.notFound;
    });
    return <Dynamic component={current()} />;
};
