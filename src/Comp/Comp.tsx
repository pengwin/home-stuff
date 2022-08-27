import { createSignal, Setter } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';

import { cssClasses } from './css-classes';

function flipCase(text: string, setText: Setter<string>) {
    if (text[0] == text[0].toLowerCase()) {
        setText(text.toUpperCase());
    } else if (text[0] == text[0].toUpperCase()) {
        setText(text.toLowerCase());
    } else {
        setText(text);
    }
}

function flipLang(currentLang: string): string {
    let lang = 'en';
    if (currentLang === 'en') {
        lang = 'ru';
    }
    console.log(`flip ${currentLang} to ${lang}`);
    return lang;
}

export default (props: { text: string }) => {
    const [text, setText] = createSignal<string>();
    const [t, { locale }] = useI18n();

    const textGetter = () => text() || props.text;
    const changeLang = () => {
        const currentLang = locale();
        const newLang = flipLang(currentLang);
        locale(newLang);
        console.log(
            `Switch ${currentLang} to ${newLang}. Current lang ${locale()} ${t(
                'Comp.SwitchLang',
            )}`,
        );
    };

    return (
        <h1>
            <p>{textGetter()}</p>
            <button
                class={`rounded border-solid border-black border ${cssClasses.btnSwitchLang}`}
                onClick={() => changeLang()}
            >
                <i class="i-mdi-account text-base"> </i>
                <span>{t('Comp.SwitchLang')}</span>
            </button>
            <button
                class={`rounded border-solid border-black border ${cssClasses.btnFlip}`}
                onClick={() => flipCase(textGetter(), setText)}
            >
                <i class="i-mdi-account text-base">T</i>
                <span>{t('Comp.Flip')}</span>
            </button>
        </h1>
    );
};
