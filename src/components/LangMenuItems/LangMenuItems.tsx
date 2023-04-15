import { useI18n } from '~/locale';
import { createMemo, For } from 'solid-js';

import { langs } from '~/locale';
import { LangMenuItem } from './LangMenuItem';

interface Props {
    itemClass?: string;
}

export function LangMenuItems(props: Props) {
    const [t] = useI18n();

    const classValue = createMemo(
        () => 'menu-title ' + (props.itemClass || ''),
    );

    return (
        <>
            <li class={classValue()}>
                <span>{t.components.sidebar.lang.title()}</span>
            </li>
            <For each={langs}>
                {lang => <LangMenuItem class={props.itemClass} lang={lang} />}
            </For>
        </>
    );
}
