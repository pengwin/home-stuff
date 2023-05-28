import { useI18n } from '~/locale';

import { MenuItem } from './MenuItem';

export function NavigationMenu() {
    const [t] = useI18n();

    return (
        <>
            <li class="menu-title">
                <span>{t.components.sidebar.navigation()}</span>
            </li>
            <MenuItem href="/test/comp/111" text="Test.Comp 111" />
            <MenuItem href="/test/comp/abc" text="Test.Comp abc" />
            <MenuItem href="/test/comp/test" text="Test.Comp Test" />
            <MenuItem href="/test/state" text="Test.State" />
            <MenuItem href="/test/table-perf" text="Test.TablePerf" />
        </>
    );
}
