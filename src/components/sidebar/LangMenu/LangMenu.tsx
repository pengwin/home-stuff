import { useI18n } from '@solid-primitives/i18n';
import { createMemo } from 'solid-js';

export function LangMenu() {
    const [t, { locale }] = useI18n();
    const isRu = createMemo(() => locale() === 'ru');
    const isEn = createMemo(() => locale() === 'en');
    return (
        <ul class="menu  text-base-content">
            <li>
                <a class={isEn() ? 'active' : ''} onClick={() => locale('en')}>
                    {t('components.sidebar.lang.en')}
                </a>
            </li>
            <li>
                <a class={isRu() ? 'active' : ''} onClick={() => locale('ru')}>
                    {t('components.sidebar.lang.ru')}
                </a>
            </li>
        </ul>
    );
}
