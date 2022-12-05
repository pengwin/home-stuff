import { A } from '@solidjs/router';

import PackageVariant from '~icons/mdi/package-variant';

export function Logo() {
    return (
        <A href="/" class="flex items-center">
            <PackageVariant
                class="mr-3 h-6 sm:h-9"
                style={{ 'font-size': '2em' }}
            />
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Home Stuff
            </span>
        </A>
    );
}
