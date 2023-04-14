import { MenuItem } from './MenuItem';

import { useStore } from '@nanostores/solid';
import { i18n } from '~/stores/i18n';

export const messages = i18n('sidebar/NavigationMenu', {
    navigation: 'Navigation',
});

export function NavigationMenu() {
    const t = useStore(messages);

    return (
        <>
            <li class="menu-title">
                <span>{t().navigation}</span>
            </li>
            <MenuItem href="/test/comp/111" text="Test.Comp 111" />
            <MenuItem href="/test/comp/abc" text="Test.Comp abc" />
            <MenuItem href="/test/comp/test" text="Test.Comp Test" />
            <MenuItem href="/test/state" text="Test.State" />
        </>
    );
}
