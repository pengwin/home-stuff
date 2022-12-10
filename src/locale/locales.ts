import en from './langs/en';
import ru from './langs/ru';

type Locale = typeof en;

interface Locales {
    [key: string]: Locale;
}

export const locales: Locales = {
    ru,
    en,
};
