
import { createMemo } from 'solid-js';
import { useRouterMetadata } from '~/stores/router';

import { useStore } from '@nanostores/solid';
import { i18n } from '~/stores/i18n';

export const messages = i18n('RoutingHtmlTitle', {
    appName: 'Home Stuff',
});

import { HtmlTitle } from './HtmlTitle';

export function RoutingHtmlTitle() {
    const routerMetadata = useRouterMetadata();
    const t = useStore(messages);

    const title = createMemo(() => {
        const routeTitle = routerMetadata()?.title;
        const appName = t().appName;
        if (!routeTitle) {
            return appName;
        }
        return `${appName} - ${routeTitle}`;
    });

    return <HtmlTitle title={title()} />;
}
