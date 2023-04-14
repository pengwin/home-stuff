import PackageVariant from '~icons/mdi/package-variant';

import { useStore } from '@nanostores/solid';
import { i18n } from '~/stores/i18n';

export const messages = i18n('RoutingHtmlTitle', {
    appName: 'Home Stuff',
});

export function Logo() {
    const t = useStore(messages);
    return (
        <a href="/" class="btn-ghost btn normal-case">
            <PackageVariant class="mr-3 h-6 text-xl lg:h-9 lg:text-3xl" />
            <span class="hidden self-center whitespace-nowrap font-semibold dark:text-white md:inline-block lg:text-xl">
                {t().appName}
            </span>
        </a>
    );
}
