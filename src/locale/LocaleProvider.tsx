import { createChainedI18nContext } from '@solid-primitives/i18n';

import { locales as dictionaries } from './locales';

const [I18nProvider, useI18nContext] = createChainedI18nContext({
    dictionaries,
    locale: 'en',
});

export const useI18n = () => {
    const context = useI18nContext();
    if (!context)
        throw new Error('useI18n must be used within an I18nProvider');
    return context;
};

export { I18nProvider as LocaleProvider };
