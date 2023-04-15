import { useI18n } from '~/locale';
import { createMemo } from 'solid-js';
import { useRouter } from '~/store';

import { HtmlTitle } from './HtmlTitle';

export function RoutingHtmlTitle() {
    const [state] = useRouter();
    const [t] = useI18n();

    const title = createMemo(() => {
        const routeTitle = state.currentRoute?.title;
        const appName = t.app();
        if (!routeTitle) {
            return appName;
        }
        return `${appName} - ${routeTitle}`;
    });

    return <HtmlTitle title={title()} />;
}
