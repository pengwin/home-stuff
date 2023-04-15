import { useI18n } from '~/locale';

function NotFound() {
    const [t] = useI18n();
    return <div>{t.pages.notFound.mainText()}</div>;
}

export default NotFound;
