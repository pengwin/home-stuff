import { createMemo, For } from 'solid-js';

import { LangMenuItem } from './LangMenuItem';

import { useStore } from '@nanostores/solid';
import { i18n, Lang } from '~/stores/i18n';

export const messages = i18n('LangMenuItems', {
    title: 'Language'
});

interface Props {
    itemClass?: string;
}

const langs: Lang[] = ['en', 'ru'];

export function LangMenuItems(props: Props) {
    const t = useStore(messages);

    const classValue = createMemo(
        () => 'menu-title ' + (props.itemClass || ''),
    );

    return (
        <>
            <li class={classValue()}>
                <span>{t().title}</span>
            </li>
            <For each={langs}>
                {lang => <LangMenuItem class={props.itemClass} lang={lang} />}
            </For>
        </>
    );
}
