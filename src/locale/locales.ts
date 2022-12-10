import { en, ru } from './langs';
import type { Locale } from './Langs';

interface Locales {
    [key: string]: Locale;
}

export interface LangInfo {
    locale: string;
    textKey: string;
}

export const langs: LangInfo[] = [
    {
        locale: 'en',
        textKey: 'langs.en',
    },
    {
        locale: 'ru',
        textKey: 'langs.ru',
    },
];

export const locales: Locales = {
    ru,
    en,
};
