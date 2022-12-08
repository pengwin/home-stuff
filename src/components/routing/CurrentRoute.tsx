import { Component, createMemo } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useRouter } from '~/store';

interface CurrentRouteProps {
    notFound: Component;
}

export const CurrentRoute: Component<CurrentRouteProps> = (
    props: CurrentRouteProps,
) => {
    const [route] = useRouter();
    const current = createMemo(() => {
        return route?.currentRoute?.component || props.notFound;
    });
    return <Dynamic component={current()} />;
};
