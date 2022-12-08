import { createSignal, createMemo, Setter } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import IconAccount from '~icons/mdi/account';
import { cssClasses } from './css-classes';

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

function flipLang(currentLang: string): string {
    let lang = 'en';
    if (currentLang === 'en') {
        lang = 'ru';
    }
    return lang;
}

export function Comp(props: { text: string }) {
    const [charCase, setCharCase] = createSignal<CharCase>();
    const [t, { locale }] = useI18n();

    const text = createMemo(() => applyCase(props.text, charCase()));
    const changeLang = () => {
        const currentLang = locale();
        const newLang = flipLang(currentLang);
        locale(newLang);
    };

    return (
        <h1>
            <p>{text()}</p>
            <button
                class={`rounded border border-solid border-black ${cssClasses.btnSwitchLang}`}
                onClick={() => changeLang()}
            >
                <IconAccount class="inline-block text-base" />
                <span>{t('Comp.SwitchLang')}</span>
            </button>
            <button
                class={`rounded border border-solid border-black ${cssClasses.btnFlip}`}
                onClick={() => flipCase(text(), setCharCase)}
            >
                <IconAccount class="inline-block text-base" />
                <span>{t('Comp.Flip')}</span>
            </button>
        </h1>
    );
}
