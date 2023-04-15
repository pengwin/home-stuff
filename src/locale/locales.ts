import { I18nPath } from '@solid-primitives/i18n';
import { en, ru } from './langs';
import type { Locale } from './langs';

interface Locales {
    [key: string]: Locale;
}

export interface LangInfo {
    locale: string;
    textKey: (i18n: I18nPath<Locale>) => string;
}

export const langs: LangInfo[] = [
    {
        locale: 'en',
        textKey: i18n => i18n.langs.en(),
    },
    {
        locale: 'ru',
        textKey: i18n => i18n.langs.ru(),
    },
];

export const locales: Locales = {
    ru,
    en,
};
