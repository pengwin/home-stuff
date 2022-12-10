import { I18nContext, createI18nContext } from '@solid-primitives/i18n';
import { ParentProps } from 'solid-js';

import { locales } from './locales';

interface LocaleProviderProps {
    defaultLang: 'en' | 'ru';
}

const localeContext = createI18nContext(locales, 'en');

export function LocaleProvider(props: ParentProps<LocaleProviderProps>) {
    return (
        <I18nContext.Provider value={localeContext}>
            {props.children}
        </I18nContext.Provider>
    );
}
