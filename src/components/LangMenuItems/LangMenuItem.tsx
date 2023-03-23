import { useI18n } from '@solid-primitives/i18n';
import { createMemo } from 'solid-js';
import type { LangInfo } from '~/locale';

export function LangMenuItem(props: { lang: LangInfo; class?: string }) {
    const [t, { locale }] = useI18n();
    const isActive = createMemo(() => locale() === props.lang.locale);
    const classValue = createMemo(
        () => (props.class || '') + ' ' + (isActive() ? 'active' : ''),
    );

    return (
        <li>
            <button
                class={classValue()}
                onClick={() => locale(props.lang.locale)}
            >
                {t(props.lang.textKey)}
            </button>
        </li>
    );
}
