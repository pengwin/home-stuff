import { useI18n } from '@solid-primitives/i18n';
import PackageVariant from '~icons/mdi/package-variant';

export function Logo() {
    const [t] = useI18n();
    return (
        <a href="/" class="btn-ghost btn normal-case">
            <PackageVariant class="mr-3 h-6 text-xl lg:h-9 lg:text-3xl" />
            <span class="hidden self-center whitespace-nowrap font-semibold dark:text-white md:inline-block lg:text-xl">
                {t('app')}
            </span>
        </a>
    );
}
