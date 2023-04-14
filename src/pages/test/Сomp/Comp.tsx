import { createSignal, createMemo, Setter } from 'solid-js';
import IconAccount from '~icons/mdi/account';
import { cssClasses } from './css-classes';

import { useStore } from '@nanostores/solid';
import { Lang, i18n, getLang, setLang } from '~/stores/i18n';

export const messages = i18n('Comp', {
    switchLang: 'Switch Lang',
    flip: 'Flip',
});

type CharCase = 'upper' | 'lower' | undefined;

function flipCase(text: string, setCharCase: Setter<CharCase>) {
    if (text[0] == text[0].toLowerCase()) {
        setCharCase('upper');
    } else if (text[0] == text[0].toUpperCase()) {
        setCharCase('lower');
    }
}

function applyCase(text: string, charCase: CharCase) {
    if (charCase === 'upper') {
        return text.toUpperCase();
    }

    if (charCase === 'lower') {
        return text.toLowerCase();
    }

    return text;
}

function flipLang(currentLang: Lang): string {
    let lang = 'en';
    if (currentLang === 'en') {
        lang = 'ru';
    }
    return lang;
}

export function Comp(props: { text: string }) {
    const [charCase, setCharCase] = createSignal<CharCase>();
    const t = useStore(messages);

    const text = createMemo(() => applyCase(props.text, charCase()));
    const changeLang = () => {
        const currentLang = getLang();
        const newLang = flipLang(currentLang);
        setLang(newLang);
    };

    return (
        <h1>
            <p>{text()}</p>
            <button
                class={`rounded border border-solid border-black ${cssClasses.btnSwitchLang}`}
                onClick={() => changeLang()}
            >
                <IconAccount class="inline-block text-base" />
                <span>{t().switchLang}</span>
            </button>
            <button
                class={`rounded border border-solid border-black ${cssClasses.btnFlip}`}
                onClick={() => flipCase(text(), setCharCase)}
            >
                <IconAccount class="inline-block text-base" />
                <span>{t().switchLang}</span>
            </button>
        </h1>
    );
}
