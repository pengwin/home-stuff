import { useI18n } from '@solid-primitives/i18n';
import { NavigationMenu } from './NavigationMenu';
import { LangMenu } from './LangMenu';

export function Sidebar() {
    const [t] = useI18n();
    return (
        <div class="flex w-48 flex-col bg-base-100">
            <div class="divider">{t('components.sidebar.navigation')}</div>
            <div class="card   grid place-items-center">
                <NavigationMenu />
            </div>
            <div class="divider">{t('components.sidebar.lang.title')}</div>
            <div class="card  grid place-items-center">
                <LangMenu />
            </div>
        </div>
    );
}
