import { createMemo } from 'solid-js';
import { useRouter } from '~/store';
import { Comp } from './Comp';

export default function () {
    const [state] = useRouter();
    const text = createMemo(() => state.params?.text || 'No param');
    return <Comp text={text()} />;
}
