import { createSignal, Setter } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import IconAccount from '~icons/mdi/account';
import { cssClasses } from './css-classes';

function flipCase(text: string, setText: Setter<string>) {
    if (text[0] == text[0].toLowerCase()) {
        setText(text.toUpperCase());
    } else if (text[0] == text[0].toUpperCase()) {
        setText(text.toLowerCase());
    }
}

function flipLang(currentLang: string): string {
    let lang = 'en';
    if (currentLang === 'en') {
        lang = 'ru';
    }
    return lang;
}

export function Comp(props: { text: string }) {
    const [text, setText] = createSignal<string>();
    const [t, { locale }] = useI18n();

    const textGetter = () => text() || props.text;
    const changeLang = () => {
        const currentLang = locale();
        const newLang = flipLang(currentLang);
        locale(newLang);
    };

    return (
        <h1>
            <p>{textGetter()}</p>
            <button
                class={`rounded border border-solid border-black ${cssClasses.btnSwitchLang}`}
                onClick={() => changeLang()}
            >
                <IconAccount class="inline-block text-base" />
                <span>{t('Comp.SwitchLang')}</span>
            </button>
            <button
                class={`rounded border border-solid border-black ${cssClasses.btnFlip}`}
                onClick={() => flipCase(textGetter(), setText)}
            >
                <IconAccount class="inline-block text-base" />
                <span>{t('Comp.Flip')}</span>
            </button>
        </h1>
    );
}
