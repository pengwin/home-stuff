import { useI18n } from '~/locale';
import PackageVariant from '~icons/mdi/package-variant';

import { A } from '~/components/routing';

export function Logo() {
    const [t] = useI18n();
    return (
        <A
            role="navigation"
            href="/"
            class="btn-ghost btn normal-case"
            ariaLabel="Navigate to base"
        >
            <PackageVariant class="mr-3 h-6 text-xl lg:h-9 lg:text-3xl" />
            <span class="hidden self-center whitespace-nowrap font-semibold dark:text-white md:inline-block lg:text-xl">
                {t.app()}
            </span>
        </A>
    );
}
