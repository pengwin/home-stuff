import { createMemo } from 'solid-js';

import { useStore } from '@nanostores/solid';
import { i18n, getLang, setLang, Lang } from '~/stores/i18n';

export const messages = i18n('LangMenuItem', {
    en: 'English',
    ru: 'Russian',
});

export function LangMenuItem(props: { lang: Lang; class?: string }) {
    const t = useStore(messages);
    const isActive = createMemo(() => getLang() === props.lang);
    const classValue = createMemo(
        () => (props.class || '') + ' ' + (isActive() ? 'active' : ''),
    );

    const langText = createMemo(() => t()[props.lang || 'en']);

    return (
        <li>
            <button
                class={classValue()}
                onClick={() => setLang(props.lang)}
            >
                {langText()}
            </button>
        </li>
    );
}
