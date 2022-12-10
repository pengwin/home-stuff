import { useI18n } from '@solid-primitives/i18n';

function NotFound() {
    const [t] = useI18n();
    return <div>{t('pages.notFound.mainText')}</div>;
}

export default NotFound;
