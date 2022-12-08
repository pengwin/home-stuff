import { createMemo } from 'solid-js';
import { useRouter } from '~/store';

export function Current() {
    const [state] = useRouter();

    const title = createMemo(() => state.currentRoute?.title || '');

    return <span>{title()}</span>;
}
