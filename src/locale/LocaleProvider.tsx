import { I18nContext, createI18nContext } from '@solid-primitives/i18n';
import { ParentProps } from 'solid-js';

import { locales } from './locales';

interface LocaleProviderProps {
    defaultLang: 'en' | 'ru';
}

export function LocaleProvider(props: ParentProps<LocaleProviderProps>) {
    const localeContext = createI18nContext(locales, props.defaultLang);
    return (
        <I18nContext.Provider value={localeContext}>
            {props.children}
        </I18nContext.Provider>
    );
}
