import { atom, action } from 'nanostores';
import { createI18n, localeFrom, browser, formatter } from '@nanostores/i18n';

export type Lang = 'en' | 'ru' | undefined;

const localeSettings = atom<Lang>('en');

const locale = localeFrom(
    localeSettings,
    browser({ available: ['en', 'ru'], fallback: 'en' }) // browser’s locale auto-detect
);

export const setLang = action(localeSettings, 'setLang', (store, lang) => {
    store.set(lang);
    return store.get();
});

export const getLang = action(localeSettings, 'getLang', store => {
    return store.get();
});

export const format = formatter(locale);

export const i18n = createI18n(locale, {
  get(code: string) {
    if (code === 'ru') {
      return import('~/locale/langs/en.json');
    }
    return import('~/locale/langs/ru.json');
    //return fetchJSON(`/translations/${code}.json`)
  }
});

if (import.meta.env.DEV) {
  const loadTranslations = async () => {
    const mod = await import('@nanostores/i18n');
  
    const modules = import.meta.glob('/**/*.tsx');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messages: any[] = [];
  
    for (const path in modules) {
      // eslint-disable-next-line no-console
      console.log(path);
      if (path.endsWith('.test.tsx')) {
        continue;
      }
      const mod: any = await modules[path]();
      if (!mod.messages) {
        continue;
      }
      messages.push(mod.messages);
    }
  
    const json = mod.messagesToJSON(...messages);
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(json));
  };
  
  (window as any).i18nLoadTranslations = loadTranslations;
}


