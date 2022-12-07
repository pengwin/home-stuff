import PackageVariant from '~icons/mdi/package-variant';

export function Logo() {
    return (
        <a href="/" class="btn-ghost btn normal-case">
            <PackageVariant class="mr-3 h-6 text-3xl sm:h-9 sm:text-xl" />
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-sm">
                Home Stuff
            </span>
        </a>
    );
}
