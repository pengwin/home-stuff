import { createMemo } from 'solid-js';
import { useRouterMetadata } from '~/stores/router';

export function Current() {
    const routerMetadata = useRouterMetadata();

    const title = createMemo(() => routerMetadata()?.title || '');

    return <span>{title()}</span>;
}
