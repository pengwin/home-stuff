import { useI18n } from '~/locale';
import { createMemo } from 'solid-js';
import type { LangInfo } from '~/locale';

export function LangMenuItem(props: { lang: LangInfo; class?: string }) {
    const [t, { locale, setLocale }] = useI18n();
    const isActive = createMemo(() => locale() === props.lang.locale);
    const classValue = createMemo(
        () => (props.class || '') + ' ' + (isActive() ? 'active' : ''),
    );

    const lang = createMemo(() => props.lang.textKey(t));

    return (
        <li>
            <button
                class={classValue()}
                onClick={() => setLocale(props.lang.locale)}
            >
                {lang()}
            </button>
        </li>
    );
}
