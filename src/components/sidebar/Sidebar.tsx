import { NavigationMenu } from './NavigationMenu';
import { LangMenu } from './LangMenu';

export function Sidebar() {
    return (
        <ul class="menu menu-compact w-48 bg-base-100 p-3 text-base-content">
            <NavigationMenu />
            <LangMenu />
        </ul>
    );
}
