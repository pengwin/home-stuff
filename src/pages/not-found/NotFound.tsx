import { useStore } from '@nanostores/solid';
import { i18n } from '~/stores/i18n';

export const messages = i18n('NotFound', {
    mainText: 'Not Found',
});

function NotFound() {
    const t = useStore(messages);
    return <div>{t().mainText}</div>;
}

export default NotFound;
