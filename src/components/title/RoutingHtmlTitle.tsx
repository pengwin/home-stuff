import { useI18n } from '@solid-primitives/i18n';
import { createMemo } from 'solid-js';
import { useRouterMetadata } from '~/stores/router';

import { HtmlTitle } from './HtmlTitle';

export function RoutingHtmlTitle() {
    const routerMetadata = useRouterMetadata();
    const [t] = useI18n();

    const title = createMemo(() => {
        const routeTitle = routerMetadata()?.title;
        const appName = t('app');
        if (!routeTitle) {
            return appName;
        }
        return `${appName} - ${routeTitle}`;
    });

    return <HtmlTitle title={title()} />;
}
